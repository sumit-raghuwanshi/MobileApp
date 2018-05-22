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
      isModalVisible : false
    }

    this._onSubmit = this._onSubmit.bind(this)
  }

  componentDidMount() {
    //debugger;
    console.log("itemssgsdhdsth", this.props)
    console.log("lead data json ====>" , JSON.stringify(this.props.item))
    this.props.getParticularLead(this.props.item.id)
    .then((response) => {
        console.log("getting particular item" , response)
      this.setState({
        loading: false
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
    console.log("selected trade types" , selectedLeadTypes)

    var i;
    var arrayIndex = [];
    for (i = 0; i < selectedLeadTypes.length; i++) { 
      arrayIndex.push(this.props.user.trade_types.indexOf(selectedLeadTypes[i].value))
    }
    this.setState({ selectedLeadTypes})
    this.setState({ selectedIndexOfTrade : arrayIndex })
    console.log("selected indexes " , arrayIndex)

    
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
    console.log("move to edit lead screen")
    //lead_edit
    this.props.navigator.push({
      screen: 'roof_gravy.lead_edit',
      passProps: { item: this.props.item }
    })
  }
 
  render() {
    console.log("Rendering components");
    var user = this.props.user

    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content"/>

        <SafeAreaView style={styles.header}>
          <Touchable style={{ width: 50, alignItems: 'center', justifyContent: 'center' }} onPress={this._navigateToDashboard}>
            <Image source={require('../../../../img/icons/home.png')} />
          </Touchable>
          <View style={{ flex: 1, alignItems: 'center' }}>
            <Text style={{ fontSize: 16, color: '#FFFFFF', fontWeight: '600' }}>LEAD DETAILS</Text>
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
              <Image source={require('../../../../img/icons/save.png')} />
            </Touchable>
          </View>

          <View style={{ flexDirection: 'row', marginBottom: 12 }}>

            <View style={{ flex: 1}}>
              <View style={{ height: 30, backgroundColor: '#FFFFFF', paddingLeft: 15 , alignItems : "center" , flexDirection : "row" }}>
              
                  <Text style={styles.labelStyle}>Name : </Text>
                  <Text style={styles.labelGreyStyle}>{`${this.props.item.first_name} ${this.props.item.last_name}`}</Text>
              </View>
              <View style={{ height: 30, backgroundColor: '#FFFFFF', paddingLeft: 15 , alignItems : "center" , flexDirection : "row" }}>
                  <Text style={styles.labelStyle}>Company : </Text>
                  <Text style={styles.labelGreyStyle}>{this.props.item.company_name}</Text>
              </View>
              <View style={{ height: 30, backgroundColor: '#FFFFFF', paddingLeft: 15 , alignItems : "center" , flexDirection : "row" }}>
                  <Text style={styles.labelStyle}>Cross Reference : </Text>
                  <Text style={styles.labelGreyStyle}>{this.props.item.cross_reference}</Text>
              </View>

              
               <View  style={{ height: 30, backgroundColor: '#FFFFFF', paddingLeft: 15 , alignItems : "center" , flexDirection : "row" }}>
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
                  </View>

               {/* { this.props.item.phone.map((element,key) => {
                  return(
                    <View key={key} style={{ height: 30, backgroundColor: '#FFFFFF', paddingLeft: 15 , alignItems : "center" , flexDirection : "row" }}>
                    <Text style={styles.labelStyle}>Phone : </Text>
                    <Text style={styles.labelGreyStyle}>{element.number}</Text>
                  </View>)
                })
                } */}

                {/* { this.props.item.email_address.map((element,key) => {
                  return(
                    <View key={key} style={{ height: 30, backgroundColor: '#FFFFFF', paddingLeft: 15 , alignItems : "center" , flexDirection : "row" }}>
                    <Text style={styles.labelStyle}>Email : </Text>
                    <Text style={styles.labelGreyStyle}>{element.email}</Text>
                  </View>)
                })
                } */}
              
            </View>
          </View>

          <View style={{margin: 10}}>
            <Text style={{
              fontSize: 17,
              color: 'rgba(0, 0, 0, 0.73)'
            }}>Location Address</Text>
        </View>
          <View style={{ marginVertical: 12 }}>
            <View style={{ height: 30, backgroundColor: '#FFFFFF', paddingLeft: 15 , alignItems : "center" , flexDirection : "row" }}>
                  <Text style={styles.labelStyle}>Address : </Text>
                  <Text style={styles.labelGreyStyle}  numberOfLines={1}>{this.props.item.location_info.address}</Text>
            </View>
            <View style={{ height: 30, backgroundColor: '#FFFFFF', paddingLeft: 15 , alignItems : "center" , flexDirection : "row" }}>
                  <Text style={styles.labelStyle}>City : </Text>
                  <Text style={styles.labelGreyStyle} numberOfLines={1}>{this.props.item.location_info.city}</Text>
            </View>
            <View style={{ height: 30, backgroundColor: '#FFFFFF', paddingLeft: 15 , alignItems : "center" , flexDirection : "row" }}>
                  <Text style={styles.labelStyle}>State : </Text>
                  <Text style={styles.labelGreyStyle} numberOfLines={1}>{this.props.item.location_info.state}</Text>
            </View>
            <View style={{ height: 30, backgroundColor: '#FFFFFF', paddingLeft: 15 , alignItems : "center" , flexDirection : "row" }}>
                  <Text style={styles.labelStyle}>Zip : </Text>
                  <Text style={styles.labelGreyStyle} numberOfLines={1}>{this.props.item.location_info.zip}</Text>
            </View>
          </View>

          

           <View style={{margin: 10}}>
            <Text style={{
              fontSize: 17,
              color: 'rgba(0, 0, 0, 0.73)'
            }}>Billing Address</Text>
        </View>
        
        {
            this.props.item.billing_info != undefined ? 
            <View style={{ marginVertical: 12 }}>
            <View style={{ height: 30, backgroundColor: '#FFFFFF', paddingLeft: 15 , alignItems : "center" , flexDirection : "row" }}>
                  <Text style={styles.labelStyle}>Address : </Text>
                  <Text style={styles.labelGreyStyle} numberOfLines={1} >{this.props.item.billing_info.address ? this.props.item.billing_info.address : 'N/A'}</Text>
            </View>
            <View style={{ height: 30, backgroundColor: '#FFFFFF', paddingLeft: 15 , alignItems : "center" , flexDirection : "row" }}>
                  <Text style={styles.labelStyle}>City : </Text>
                  <Text style={styles.labelGreyStyle} numberOfLines={1}>{this.props.item.billing_info.city ? this.props.item.billing_info.city : 'N/A'}</Text>
            </View>
            <View style={{ height: 30, backgroundColor: '#FFFFFF', paddingLeft: 15 , alignItems : "center" , flexDirection : "row" }}>
                  <Text style={styles.labelStyle}>State : </Text>
                  <Text style={styles.labelGreyStyle} numberOfLines={1}>{this.props.item.billing_info.state ? this.props.item.billing_info.state : 'N/A'}</Text>
            </View>
            <View style={{ height: 30, backgroundColor: '#FFFFFF', paddingLeft: 15 , alignItems : "center" , flexDirection : "row" }}>
                  <Text style={styles.labelStyle}>Zip : </Text>
                  <Text style={styles.labelGreyStyle} numberOfLines={1}>{this.props.item.billing_info.zip ? this.props.item.billing_info.zip : 'N/A'}</Text>
            </View>
          </View>
             : null 
          }
          

        <View style={{margin: 10}}>
            <Text style={{
              fontSize: 17,
              color: 'rgba(0, 0, 0, 0.73)'
            }}>Mailing Address</Text>
        </View>
        {
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
          }

          <View style={{ marginVertical: 12 }}>

            <View style={{ height: 30, backgroundColor: '#FFFFFF', paddingLeft: 15 , alignItems : "center" , flexDirection : "row" }}>
                  <Text style={styles.labelStyle}>Lead Source : </Text>
                  <Text style={styles.labelGreyStyle} numberOfLines={1}>{this.props.user.source_leads[this.props.item.lead_source]}</Text>
            </View>
            <View style={{ height: 30, backgroundColor: '#FFFFFF', paddingLeft: 15 , alignItems : "center" , flexDirection : "row" }}>
                  <Text style={styles.labelStyle}>Job Category : </Text>
                  <Text style={styles.labelGreyStyle} numberOfLines={1}>{this.props.user.job_categories[this.props.item.job_category]}</Text>
            </View>
            <View style={{ height: 30, backgroundColor: '#FFFFFF', paddingLeft: 15 , alignItems : "center" , flexDirection : "row" }}>
                  <Text style={styles.labelStyle}>Work Type : </Text>
                  <Text style={styles.labelGreyStyle} numberOfLines={1}>{this.props.user.work_types[this.props.item.work_type]}</Text>
            </View>

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
          </View>

          <View style={{margin: 10}}>
            <Text style={{
              fontSize: 17,
              color: 'rgba(0, 0, 0, 0.73)'
            }}>Appointment Details</Text>
          </View>
          <View style={{ marginVertical: 12 }}>
            <View style={{ height: 30, backgroundColor: '#FFFFFF', paddingLeft: 15 , alignItems : "center" , flexDirection : "row" }}>
                    <Text style={styles.labelStyle}>Assign To : </Text>
                    <Text style={styles.labelGreyStyle} numberOfLines={1}>{this.props.item.appointments.assignee ? `${this.props.item.first_name} ${this.props.item.last_name}` : 'N/A'}</Text>
              </View>
              <View style={{ height: 30, backgroundColor: '#FFFFFF', paddingLeft: 15 , alignItems : "center" , flexDirection : "row" }}>
                    <Text style={styles.labelStyle}>Title : </Text>
                    <Text style={styles.labelGreyStyle} numberOfLines={1}>{this.props.item.appointments.event_title ? this.props.item.appointments.event_title : 'N/A'}</Text>
              </View>
              <View style={{ height: 30, backgroundColor: '#FFFFFF', paddingLeft: 15 , alignItems : "center" , flexDirection : "row" }}>
                    <Text style={styles.labelStyle}>Start Date : </Text>
                    <Text style={styles.labelGreyStyle} numberOfLines={1}>{this.props.item.appointments.start_date ? this.props.item.appointments.start_date : 'N/A'}</Text>
              </View>
              <View style={{ height: 30, backgroundColor: '#FFFFFF', paddingLeft: 15 , alignItems : "center" , flexDirection : "row" }}>
                    <Text style={styles.labelStyle}>End Date : </Text>
                    <Text style={styles.labelGreyStyle} numberOfLines={1}>{this.props.item.appointments.end_date ? this.props.item.appointments.end_date : 'N/A'}</Text>
              </View>
          </View>
          {/* {this.appointDetailsViews()} */}
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
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.2)'
  },
  labelStyle: {
    backgroundColor: '#FFFFFF',
    fontSize: 17,
    color: 'rgba(0, 0, 0, 0.73)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.2)'
  },
  labelGreyStyle: {
    backgroundColor: '#FFFFFF',
    fontSize: 15,
    color: 'rgba(192,192,192,1)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.2)',
    paddingLeft : 10
 
  },
  textFieldPhone: {
    height: 44,
    backgroundColor: '#FFFFFF',
    fontSize: 17,
    color: 'rgba(0, 0, 0, 0.73)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.2)',
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

  }
});

function mapStateToProps(state, ownProps) {
  return {
    user: state.user,
    users: state.users
  };
};

export default connect(mapStateToProps, {createLead, getUserList , getParticularLead})(LeadDetails);