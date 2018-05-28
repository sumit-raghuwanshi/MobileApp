import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  TextInput,
  SafeAreaView,
  AsyncStorage,
  StatusBar,
  ScrollView,
  TouchableHighlight,
  Modal
} from 'react-native';
// import COLOR from '../../constants/colors';
import SelectMultiple from 'react-native-select-multiple'
import { Touchable, Picker, Loader, DateTimePicker } from '../../common';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {createLead, getUserList , getParticularLead} from '../../../actions';
import {Notification} from '../../../helpers';
import _ from 'lodash';
import ImagePicker from 'react-native-image-picker';
import PopupDialog from 'react-native-popup-dialog';
import moment from 'moment'
//import CustomMultiPicker from "react-native-multiple-select-list";

class LeadDetails extends Component {
  
  static navigatorStyle = {
    navBarHidden: true
  }

  constructor(props) {
    super(props)

    this.state = {

      users: [],
      selectedLeadTypes: [],
      selectedIndexOfTrade : [],
      loading: true,
      isMailingSameAsLocation: false,
      isBillingSameAsLocation: false,
      isAssignedAppointments: true,
      numberOfPhoneNumber: 1,
      numberOfEmail: 1,
      isModalVisible : false,
      item : {}
    }

    this._onSubmit = this._onSubmit.bind(this)
  }

  componentWillMount(){
    console.log("wiil mount ")
    this.setState({
      item: this.props.item
    })
      
  }
  componentDidMount() {
    //debugger;
    
    console.log("1234567890");
    //console.log("itemssgsdhdsth", this.props)
    //console.log("lead data json ====>" , JSON.stringify(this.props.item))
    this.props.getParticularLead(this.props.item.id)
    .then((response) => {
      
       // console.log("getting particular item" , response.data)
      this.setState({
        loading: false,
        item : response.data
      })
    })
    .catch(error => {
      this.setState({
        loading: false
      })
    })
  }

  validateEmail(emailField){
    // var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

    // if (reg.test(emailField.value) == false) 
    // {
    //     //alert('Invalid Email Address');
    //     return false;
    // }

    // return true;
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return reg.test(emailField) == 0;
   

}


  onSelectionsChange = (selectedLeadTypes) => {
    // selectedFruits is array of { label, value }
    //console.log("selected trade types" , selectedLeadTypes)

    var i;
    var arrayIndex = [];
    for (i = 0; i < selectedLeadTypes.length; i++) { 
      arrayIndex.push(this.props.user.trade_types.indexOf(selectedLeadTypes[i].value))
    }
    this.setState({ selectedLeadTypes})
    this.setState({ selectedIndexOfTrade : arrayIndex })
    //console.log("selected indexes " , arrayIndex)

    
  }
  _navigateToDashboard = () => {
    this.props.navigator.popToRoot()
  }

  _navigateToPreviousScreen = () => {
    this.props.navigator.pop()
  }

  _navigateToAppointmentCreate = () => {
    this.props.navigator.push({
      screen: 'roof_gravy.appointment_create'
    })
  }

  // _cameraPressHandler = () => {
  //   var options = {
  //     title: 'Take Picture'
  //   }

  //   ImagePicker.launchCamera(options, (response)  => {
  //     if (response.error) {
  //       alert(response.error)
  //     }
  //     else if (!response.didCancel) {
  //       this.setState({
  //         image_attach: response
  //       })
  //     }
  //   })
  // }

  _onSubmit = () => {
    //console.log("move to edit lead screen")
    //lead_edit
    this.props.navigator.push({
      screen: 'roof_gravy.lead_edit',
      passProps: { item: this.state.item , callBack : this.callBack.bind(this)},
      
    })
  }

   async callBack(){
     console.log("callback")
    await  this.props.getParticularLead(this.props.item.id)
    .then((response) => {
      
       // console.log("getting particular item" , response.data)
      this.setState({
        loading: false,
        item : response.data
      })
    })
    .catch(error => {
      this.setState({
        loading: false
      })
    })
  }

  _billingAddressView(){
    if (this.state.item.billing_info.same_as_location == true){
      return(
        <View style={{ height: 30, backgroundColor: '#FFFFFF', paddingLeft: 15 , justifyContent : "center" , flexDirection : "column" }}>
            <Text style={styles.labelGreyStyle}>Same as Location</Text>
        </View>
      )
      
    }else if (this.state.item.billing_info.same_as_mailing == true){
      return(
        <View style={{ height: 30, backgroundColor: '#FFFFFF', paddingLeft: 15 , justifyContent : "center" , flexDirection : "column" }}>
            <Text style={styles.labelGreyStyle}>Same as Mailing Address</Text>
        </View>
      )
    }else{
      
      return(
        this.state.item.billing_info != undefined ? 
        <View style = {{flexDirection : "row" , backgroundColor : "#FFFFFF" , flex :1}}>
          <View style={{ flex: 1 ,width:'50%' , marginTop : 12}}>
              <View style={styles.labelContainer}>
                      <Text style={styles.labelStyle}>Address : </Text>
                </View>
                <View style={styles.labelContainer}>
                      <Text style={styles.labelGreyStyle}  numberOfLines={1}>{this.state.item.billing_info.address ? this.state.item.billing_info.address : 'N/A'}</Text>
                </View>
                <View style={styles.labelContainer}>
                      <Text style={styles.labelStyle}>City : </Text>
                </View>
                <View style={styles.labelContainer}>
                      <Text style={styles.labelGreyStyle} numberOfLines={1}>{this.state.item.billing_info.city ? this.state.item.billing_info.city : 'N/A'}</Text>
                </View>
               
            </View>
            <View style={{ flex: 1 ,width:'50%' , marginTop : 12}}>
            <View style={styles.labelContainer}>
                      <Text style={styles.labelStyle}>State : </Text>
                </View>
                <View style={styles.labelContainer}>
                      <Text style={styles.labelGreyStyle} numberOfLines={1}>{this.state.item.billing_info.state ? this.state.item.billing_info.state : 'N/A'}</Text>
                </View>
                <View style={styles.labelContainer}>
                      <Text style={styles.labelStyle}>Zip : </Text>
                </View>
                <View style={styles.labelContainer}>
                    <Text style={styles.labelGreyStyle} numberOfLines={1}>{this.state.item.billing_info.zip ? this.state.item.billing_info.zip : 'N/A'}</Text>
                </View>
            </View>
          </View> : null
      )
    }
  }

  _mailingAddressView(){
    if (this.state.item.mailing_info.same_as_location == true){
      return(
        <View style={{ height: 30, backgroundColor: '#FFFFFF', paddingLeft: 15 , justifyContent : "center" , flexDirection : "column" }}>
            <Text style={styles.labelGreyStyle}>Same as Location</Text>
        </View>
      )
      
    }else if (this.state.item.mailing_info.same_as_billing == true){
      return(
        <View style={{ height: 30, backgroundColor: '#FFFFFF', paddingLeft: 15 , justifyContent : "center" , flexDirection : "column" }}>
            <Text style={styles.labelGreyStyle}>Same as Billing Address</Text>
        </View>
      )
    }else{
      
      return(
        this.state.item.mailing_info != undefined ? 
        <View style = {{flexDirection : "row" , backgroundColor : "#FFFFFF" , flex :1}}>
          <View style={{ flex: 1 ,width:'50%' , marginTop : 12}}>
              <View style={styles.labelContainer}>
                      <Text style={styles.labelStyle}>Address : </Text>
                </View>
                <View style={styles.labelContainer}>
                      <Text style={styles.labelGreyStyle}  numberOfLines={1}>{this.state.item.mailing_info.address ? this.state.item.mailing_info.address : 'N/A'}</Text>
                </View>
                <View style={styles.labelContainer}>
                      <Text style={styles.labelStyle}>City : </Text>
                </View>
                <View style={styles.labelContainer}>
                      <Text style={styles.labelGreyStyle} numberOfLines={1}>{this.state.item.mailing_info.city ? this.state.item.mailing_info.city : 'N/A'}</Text>
                </View>
               
            </View>
            <View style={{ flex: 1 ,width:'50%' , marginTop : 12}}>
            <View style={styles.labelContainer}>
                      <Text style={styles.labelStyle}>State : </Text>
                </View>
                <View style={styles.labelContainer}>
                      <Text style={styles.labelGreyStyle} numberOfLines={1}>{this.state.item.mailing_info.state ? this.state.item.mailing_info.state : 'N/A'}</Text>
                </View>
                <View style={styles.labelContainer}>
                      <Text style={styles.labelStyle}>Zip : </Text>
                </View>
                <View style={styles.labelContainer}>
                    <Text style={styles.labelGreyStyle} numberOfLines={1}>{this.state.item.mailing_info.zip ? this.state.item.mailing_info.zip : 'N/A'}</Text>
                </View>
            </View>
          </View> : null
      )
    }
  }

  _appointmentsView(){
    if (this.state.item.assignee_id){
      return(
        <View style={{ marginVertical: 12 }}>
        <View style={{ height: 30, backgroundColor: '#FFFFFF', paddingLeft: 15 , alignItems : "center" , flexDirection : "row" }}>
                <Text style={styles.labelStyle}>Assigned : </Text>
                <Text style={styles.labelGreyStyle} numberOfLines={1}> Yes</Text>
          </View>
          <View style={{ height: 30, backgroundColor: '#FFFFFF', paddingLeft: 15 , alignItems : "center" , flexDirection : "row" }}>
                <Text style={styles.labelStyle}>Assign To : </Text>
                <Text style={styles.labelGreyStyle} numberOfLines={1}>{this.state.item.appointments.assignee ? `${this.state.item.appointments.assignee.first_name} ${this.props.item.appointments.assignee.last_name}` : 'N/A'}</Text>
          </View>
          <View style={{ height: 30, backgroundColor: '#FFFFFF', paddingLeft: 15 , alignItems : "center" , flexDirection : "row" }}>
                <Text style={styles.labelStyle}>Start Date : </Text>
                <Text style={styles.labelGreyStyle} numberOfLines={1}>{this.state.item.appointments.start_date ? moment.utc(this.state.item.appointments.start_date).local().format('YYYY-MM-DD HH:mm a') : 'N/A'}</Text>
          </View>
          <View style={{ height: 30, backgroundColor: '#FFFFFF', paddingLeft: 15 , alignItems : "center" , flexDirection : "row" }}>
                <Text style={styles.labelStyle}>End Date : </Text>
                <Text style={styles.labelGreyStyle} numberOfLines={1}>{this.state.item.appointments.end_date ? moment.utc(this.state.item.appointments.end_date).local().format('YYYY-MM-DD HH:mm a') : 'N/A'}</Text>
          </View>
      </View>
      )
    }else{
      return(
        <View style={{ height: 30, backgroundColor: '#FFFFFF', paddingLeft: 15 , alignItems : "center" , flexDirection : "row" }}>
        <Text style={styles.labelStyle}>Assigned : </Text>
        <Text style={styles.labelGreyStyle} numberOfLines={1}> No</Text>
  </View>
      )
    }
  }
 
  render() {
    //("Rendering components");
    var user = this.props.user

    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content"/>

        <SafeAreaView style={styles.header}>
          <Touchable style={{ width: 50, alignItems: 'center', justifyContent: 'center' }} onPress={this._navigateToDashboard}>
            <Image source={require('../../../../img/icons/home.png')} />
          </Touchable>
          <View style={{ flex: 1, alignItems: 'center' }}>
            <Text style={{ fontSize: 16, color: '#FFFFFF', fontWeight: '600' }}>LEAD INFORMATION</Text>
            <Image style={{ marginTop: 10 }} source={require('../../../../img/leads/leads.png')}/>
          </View>
          <Touchable style={{ width: 50, alignItems: 'center', justifyContent: 'center' }}>
            <View></View>
          </Touchable>
        </SafeAreaView>

        <ScrollView style={styles.body}>
          <View style={styles.buttonContainer}>
            <Touchable onPress={this._navigateToPreviousScreen}>
              <Image source={require('../../../../img/icons/cross.png')} />
            </Touchable>

            <Touchable onPress={this._onSubmit}>
              <Image source={require('../../../../img/icons/edit.png')} />
            </Touchable>
          </View>

          <View style={{ flexDirection: 'row', marginBottom: 12 }}>
              <View style = {{flexDirection : "row" , backgroundColor : "#FFFFFF" , flex :1}}>
                  <View style={{ flex: 1 ,width:'50%' , marginTop : 12}}>
                      <View style={styles.labelContainer}>
                          <Text style={styles.labelStyle}>First Name : </Text>
                      </View>
                      <View style={styles.labelContainer}>
                          <Text style={styles.labelGreyStyle} numberOfLines={1}>{this.state.item.first_name ? this.state.item.first_name : "N/A"}</Text>
                      </View>

                      <View style={styles.labelContainer}>
                          <Text style={styles.labelStyle}>Last Name : </Text>
                      </View>
                      <View style={styles.labelContainer}>
                          <Text style={styles.labelGreyStyle} numberOfLines={1}>{this.state.item.last_name ? this.state.item.last_name : "N/A"}</Text>
                      </View>
                      <View style={styles.labelContainer}>
                          <Text style={styles.labelStyle}>Company : </Text>
                      </View>
                      <View style={styles.labelContainer}>
                          <Text style={styles.labelGreyStyle} numberOfLines={1}>{this.state.item.company_name ? this.state.item.company_name : "N/A"}</Text>
                      </View>
                      <View style={styles.labelContainer}>
                          <Text style={styles.labelStyle}>Cross Reference : </Text>
                      </View>
                      <View style={styles.labelContainer}>
                          <Text style={styles.labelGreyStyle} numberOfLines={1}>{this.state.item.cross_reference ? this.state.item.cross_reference : "N/A"}</Text>
                      </View>

                      <View style={styles.labelContainer}>
                          <Text style={styles.labelStyle}>Lead Source : </Text>
                      </View>
                      <View style={styles.labelContainer}>
                          <Text style={styles.labelGreyStyle} numberOfLines={1}>{this.state.item.lead_source ? this.props.user.source_leads[this.state.item.lead_source] : "N/A"}</Text>
                      </View>

                      <View style={styles.labelContainer}>
                          <Text style={styles.labelStyle}>Job Category : </Text>
                      </View>
                      <View style={styles.labelContainer}>
                          <Text style={styles.labelGreyStyle} numberOfLines={1}>{this.state.item.job_category ? this.props.user.job_categories[this.state.item.job_category] : "N/A"}</Text>
                      </View>
                      <View style={styles.labelContainer}>
                          <Text style={styles.labelStyle}>Work Type : </Text>
                      </View>
                      <View style={styles.labelContainer}>
                          <Text style={styles.labelGreyStyle} numberOfLines={1}>{this.state.item.work_type ? this.props.user.work_types[this.state.item.work_type] : "N/A"}</Text>
                      </View>
                    
                    </View>
 

                      {/* <View  style={{ height: 30, backgroundColor: '#FFFFFF', paddingLeft: 15 , alignItems : "center" , flexDirection : "row" }}>
                            <Text style={styles.labelStyle}>Phone : </Text>
                            <Text style={styles.labelGreyStyle} numberOfLines={1}>{
                        this.props.item.phone.map((element,key) =>{
                          return(
                            element.number
                          )
                        }).join(",")
                      }</Text>
                      </View>

                          <View  style={{ height: 30, backgroundColor: '#FFFFFF', paddingLeft: 15 , alignItems : "center" , flexDirection : "row" }}>
                            <Text style={styles.labelStyle}>Email : </Text>
                            <Text style={styles.labelGreyStyle} numberOfLines={1}>{
                        this.props.item.email_address.map((element,key) =>{
                          return(
                            element.email
                          )
                        }).join(",")
                      }</Text>
                        </View> */}

                  
                  <View style={{ flex: 1,width:'50%',marginTop : 12}}>
                        <View style={styles.labelContainer}>
                            <Text style={styles.labelStyle}>Phone : </Text>
                        </View>
                        { this.state.item.phone.map((element,key) => {
                          console.log("keyyyyyyyyy",key)
                          if (key === 0){
                            return(
                              <View>
                                <View style={styles.labelContainer}>
                                    <Text style={styles.labelChildStyle}>Primary : </Text>
                                </View>
                               <View style={styles.labelContainer}>
                                  <Text style={styles.labelGreyStyle} numberOfLines={1}>{element.number ? element.number : "N/A"}</Text>
                               </View>
                              </View>
                            )
                          }else if (key === 1){
                            return(
                              <View>
                                <View style={styles.labelContainer}>
                                    <Text style={styles.labelChildStyle}>Secondary : </Text>
                                </View>
                               <View style={styles.labelContainer}>
                                  <Text style={styles.labelGreyStyle} numberOfLines={1}>{element.number ? element.number : "N/A"}</Text>
                               </View>
                              </View>
                            )
                          }else{
                            return(
                              <View>
                               <View style={styles.labelContainer}>
                                  <Text style={styles.labelGreyStyle} numberOfLines={1}>{element.number ? element.number : ""}</Text>
                               </View>
                              </View>
                            )
                          }
                     
                    })
                    }
                    <View style={styles.labelContainer}>
                            <Text style={styles.labelStyle}>Email : </Text>
                        </View>
                    { this.state.item.email_address.map((element,key) => {
                      if (key === 0){
                        return(
                          <View>
                            <View style={styles.labelContainer}>
                                <Text style={styles.labelChildStyle}>Primary :</Text>
                            </View>
                           <View style={styles.labelContainer}>
                              <Text style={styles.labelGreyStyle} numberOfLines={1}>{element.email ? element.email : "N/A"}</Text>
                           </View>
                          </View>
                          )
                      }else if (key === 1){
                        return(
                          <View>
                            <View style={styles.labelContainer}>
                                <Text style={styles.labelChildStyle}>Secondary :</Text>
                            </View>
                           <View style={styles.labelContainer}>
                              <Text style={styles.labelGreyStyle} numberOfLines={1}>{element.email ? element.email : "N/A"}</Text>
                           </View>
                          </View>
                          )
                      }else{
                        return(
                          <View>
                           <View style={styles.labelContainer}>
                              <Text style={styles.labelGreyStyle} numberOfLines={1}>{element.email ? element.email : ""}</Text>
                           </View>
                          </View>
                          )
                      }
                    })
                    }

                     <View style={styles.labelContainer}>
                            <Text style={styles.labelStyle}>Trade Types : </Text>
                        </View>

                        {this.state.item.trade_type.map((element,key) =>{
                          return(
                              
                              <View style={styles.labelContainer}>
                                <Text style={styles.labelGreyStyle} numberOfLines={1}>{this.props.user.trade_types[element] ? this.props.user.trade_types[element] : "N/A"}</Text>
                            </View>
                          )
                        })}
                      </View>
                
                   </View>
              </View>

          <View style={{margin: 10}}>
            <Text style={{
              fontSize: 17,
              color: 'rgba(0, 0, 0, 0.73)',
              fontWeight : 'bold'
            }}>Location Address</Text>
        </View>
         
          <View style = {{flexDirection : "row" , backgroundColor : "#FFFFFF" , flex :1}}>
          <View style={{ flex: 1 ,width:'50%' , marginTop : 12}}>
              <View style={styles.labelContainer}>
                      <Text style={styles.labelStyle}>Address : </Text>
                </View>
                <View style={styles.labelContainer}>
                      <Text style={styles.labelGreyStyle}  numberOfLines={1}>{this.state.item.location_info.address}</Text>
                </View>
                <View style={styles.labelContainer}>
                      <Text style={styles.labelStyle}>City : </Text>
                </View>
                <View style={styles.labelContainer}>
                      <Text style={styles.labelGreyStyle} numberOfLines={1}>{this.state.item.location_info.city}</Text>
                </View>
               
            </View>
            <View style={{ flex: 1 ,width:'50%' , marginTop : 12}}>
            <View style={styles.labelContainer}>
                      <Text style={styles.labelStyle}>State : </Text>
                </View>
                <View style={styles.labelContainer}>
                      <Text style={styles.labelGreyStyle} numberOfLines={1}>{this.state.item.location_info.state}</Text>
                </View>
                <View style={styles.labelContainer}>
                      <Text style={styles.labelStyle}>Zip : </Text>
                </View>
                <View style={styles.labelContainer}>
                    <Text style={styles.labelGreyStyle} numberOfLines={1}>{this.state.item.location_info.zip}</Text>
                </View>
            </View>
          </View>
          

           <View style={{margin: 10}}>
            <Text style={{
              fontSize: 17,
              color: 'rgba(0, 0, 0, 0.73)',
              fontWeight : 'bold'
            }}>Billing Address</Text>
        </View>
        {this._billingAddressView()}
        
          

        <View style={{margin: 10}}>
            <Text style={{
              fontSize: 17,
              color: 'rgba(0, 0, 0, 0.73)',
              fontWeight : 'bold'
            }}>Mailing Address</Text>
        </View>
        {this._mailingAddressView()}
        {/* {
            this.props.item.mailing_info != undefined ? 
            <View style={{ marginVertical: 12 }}>
            <View style={{ height: 30, backgroundColor: '#FFFFFF', paddingLeft: 15 , alignItems : "center" , flexDirection : "row" }}>
                  <Text style={styles.labelStyle}>Address : </Text>
                  <Text style={styles.labelGreyStyle} numberOfLines={1}>{this.props.item.mailing_info.address ? this.props.item.mailing_info.address : 'N/A'}</Text>
            </View>
            <View style={{ height: 30, backgroundColor: '#FFFFFF', paddingLeft: 15 , alignItems : "center" , flexDirection : "row" }}>
                  <Text style={styles.labelStyle}>City : </Text>
                  <Text style={styles.labelGreyStyle} numberOfLines={1}>{this.props.item.mailing_info.city ? this.props.item.mailing_info.city : 'N/A'}</Text>
            </View>
            <View style={{ height: 30, backgroundColor: '#FFFFFF', paddingLeft: 15 , alignItems : "center" , flexDirection : "row" }}>
                  <Text style={styles.labelStyle}>State : </Text>
                  <Text style={styles.labelGreyStyle} numberOfLines={1}>{this.props.item.mailing_info.state ? this.props.item.mailing_info.state : 'N/A'}</Text>
            </View>
            <View style={{ height: 30, backgroundColor: '#FFFFFF', paddingLeft: 15 , alignItems : "center" , flexDirection : "row" }}>
                  <Text style={styles.labelStyle}>Zip : </Text>
                  <Text style={styles.labelGreyStyle} numberOfLines={1}>{this.props.item.mailing_info.zip ? this.props.item.mailing_info.zip : 'N/A'}</Text>
            </View>
          </View>
             : null 
          } */}

          {/* <View style={{ marginVertical: 12 }}>

            

             <View  style={{ height: 30, backgroundColor: '#FFFFFF', paddingLeft: 15 , alignItems : "center" , flexDirection : "row" }}>
                    <Text style={styles.labelStyle}>Trade Types : </Text>
                    <Text style={styles.labelGreyStyle} numberOfLines={1}>{
                 this.props.item.trade_type.map((element,key) =>{
                  return(
                    this.props.user.trade_types[element]
                  )
                }).join(",")
              }</Text>
                  </View>
          </View> */}

          <View style={{margin: 10}}>
            <Text style={{
              fontSize: 17,
              color: 'rgba(0, 0, 0, 0.73)',
              fontWeight : 'bold'
            }}>Appointment Details</Text>
          </View>
          {this._appointmentsView()}
          
         

        </ScrollView>
        <Loader loading={this.state.loading}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(194, 185, 165, 0.31)'
  },
  header: {
    flexDirection: 'row',
    height: 66,
    backgroundColor: '#354052',
    zIndex: 1
  },
  body: {
    flex: 1
  },
  buttonContainer: {
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 15,
    justifyContent: 'space-between'
  },
  textField: {
    height: 44,
    backgroundColor: '#FFFFFF',
    fontSize: 17,
    color: 'rgba(0, 0, 0, 0.73)',
    // borderBottomWidth: 1,
    // borderBottomColor: 'rgba(0, 0, 0, 0.2)'
  },
  labelStyle: {
    backgroundColor: '#FFFFFF',
    fontSize: 15,
    color: 'rgba(0, 0, 0, 0.73)',
    fontWeight : 'bold'
    // borderBottomWidth: 1,
    // borderBottomColor: 'rgba(0, 0, 0, 0.2)'
  },
  labelChildStyle: {
    backgroundColor: '#FFFFFF',
    fontSize: 15,
    color: 'rgba(0, 0, 0, 0.73)',
    
    // borderBottomWidth: 1,
    // borderBottomColor: 'rgba(0, 0, 0, 0.2)'
  },
  labelGreyStyle: {
    backgroundColor: '#FFFFFF',
    fontSize: 15,
    color: 'rgba(192,192,192,1)'
    // borderBottomWidth: 1,
    // borderBottomColor: 'rgba(0, 0, 0, 0.2)',
 
  },
  textFieldPhone: {
    height: 44,
    backgroundColor: '#FFFFFF',
    fontSize: 17,
    color: 'rgba(0, 0, 0, 0.73)',
    // borderBottomWidth: 1,
    // borderBottomColor: 'rgba(0, 0, 0, 0.2)',
    flex:1
  },
  picker: {
    height: 44,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.2)',
    paddingRight: 10
  },
  pickerText: {
    fontSize: 17,
    color: 'rgba(0, 0, 0, 0.73)'
  },
  buttonText:{
    fontSize: 15,
    color: 'white',
    textAlign : "center",
    textAlignVertical : "center"

  },
  labelContainer:{
    height: 25, 
    backgroundColor: '#FFFFFF', 
    paddingLeft: 15 , 
    alignItems : "center" , 
    flexDirection : "row"
  }
});

function mapStateToProps(state, ownProps) {
  return {
    user: state.user,
    users: state.users
  };
};

export default connect(mapStateToProps, {createLead, getUserList , getParticularLead})(LeadDetails);