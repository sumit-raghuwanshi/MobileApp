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
import {createLead, getUserList , getParticularJob, updateJobStatus} from '../../../actions';
import {Notification} from '../../../helpers';
import _ from 'lodash';
import ImagePicker from 'react-native-image-picker';
import PopupDialog , {DialogTitle}from 'react-native-popup-dialog';
import moment from 'moment';


const prospect = require("../../../../img/jobStatus/prospect.png");
const approved = require("../../../../img/jobStatus/approved.png");
const completed = require("../../../../img/jobStatus/completed.png");
const invoiced = require("../../../../img/jobStatus/invoiced.png");
const closed = require("../../../../img/jobStatus/closed.png");
const lead = require("../../../../img/jobStatus/leads.png");

//import CustomMultiPicker from "react-native-multiple-select-list";
//import {prospect,lead, approved,completed,invoiced,closed,lead} from '../../../constants/jobStatusImages';

class JobDetails extends Component {
  arrayJobStatus = ["Lead", "Prospect" , "Approved" , "Completed" , "Invoiced" , "Closed" , "Cancelled"]
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
      item : {},
      job_id:'',
      statusJob: 0,
      active_estimate: {}
    }

    this._onSubmit = this._onSubmit.bind(this)
    this._Estimate =  this._Estimate.bind(this)
  }

  getImageFromStatus(){
    var status = this.state.item.status_cd
    // var imagePath="../../../img/jobStatus/prospect.png"
    // switch (status) {
    //   case 1 : 
    //     imagePath="../../../img/jobStatus/prospect.png"
    //     break;
    //   case 2 :
    //     imagePath="../../../img/jobStatus/prospect.png"
    //     break;
    //   case 3 : 
    //     imagePath="../../../img/jobStatus/prospect.png"
    //     break;
    //   case 4 : 
    //     imagePath="../../../img/jobStatus/prospect.png"
    //     break;
    //   case 5 : 
    //     imagePath="../../../img/jobStatus/prospect.png"
    //     break;
    //   case 6 :
    //     imagePath="../../../img/jobStatus/prospect.png"
    //     break;
    // }
    // return imagePath;

    switch (status) {
        case 1 : return(
          lead
        )
        case 2 : return(
          prospect
        )
        case 3 : return(
          approved
        )
        case 4 : return(
          completed
        )
        case 5 : return(
          invoiced
        )
        case 6 : return(
          closed
        )
        default : return(
          lead
        )
      } 

  }

  getTextFromStatus(){
    var status = this.state.item.status_cd

    switch (status) {
        case 1 : return(
          "Lead"
        )
        case 2 : return(
          "Prospect"
        )
        case 3 : return(
          "Approved"
        )
        case 4 : return(
          "Completed"
        )
        case 5 : return(
          "Invoiced"
        )
        case 6 : return(
          "Closed"
        )
        default : return(
          "N/A"
        )
      } 
  }

  componentWillMount(){
    console.log("wiil mount ")
    this.setState({
      item: this.props.item,
      statusJob : this.props.item.status_cd - 1
    })
  }
  componentDidMount(){
    //debugger;
    //console.log("itemssgsdhdsth", this.props)
    //console.log("lead data json ====>" , JSON.stringify(this.props.item))
    this._getParticularLeads()
  }

  _getParticularLeads(){
    this.props.getParticularJob(this.props.item.id)
    .then((response) => {
      
       // console.log("getting particular item" , response.data)
      this.setState({
        loading: false,
        item : response.data,
        job_id: this.props.item.id,
        active_estimate : response.data.active_estimate,
        statusJob: response.data.status_cd - 1
        
      })
    })
    .catch(error => {
      this.setState({
        loading: false,
        job_id:this.props.item.id
      })
    })
  }

  async callBack(){
     console.log("callback")
    await  this.props.getParticularLead(this.props.item.id)
    .then((response) => {
      
       // console.log("getting particular item" , response.data)
      this.setState({
        loading: false,
        item : response.data,
        active_estimate: response.data.active_estimate
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
_updateJobStatus(){
  this.setState({
    loading: true
  })
  

  var data = {
    "status" : this.state.statusJob + 1,
    "date": moment().format('DD/MM/YYYY')
  }
  this.props.updateJobStatus(this.state.item.id , data)
  .then((response) => {
      
    // console.log("getting particular item" , response.data)
   this.setState({
     loading: false,
   })
   this.popupDialog.dismiss()
   this._getParticularLeads()
 })
 .catch(error => {
   this.setState({
     loading: false
   })
 })
  
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
    this.props.callBack()
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



  _Estimate = () => {
    const job_id = this.state.item.id
    this.props.navigator.push({
      screen: "roof_gravy.estimate_view",
      passProps: { item: this.state.active_estimate ,job_id: job_id, callBack : this.callBack.bind(this)}
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
                      <Text style={styles.labelGreyStyle}  >{this.state.item.billing_info.address ? this.state.item.billing_info.address : 'N/A'}</Text>
                </View>
                <View style={styles.labelContainer}>
                      <Text style={styles.labelStyle}>City : </Text>
                </View>
                <View style={styles.labelContainer}>
                      <Text style={styles.labelGreyStyle}>{this.state.item.billing_info.city ? this.state.item.billing_info.city : 'N/A'}</Text>
                </View>
               
            </View>
            <View style={{ flex: 1 ,width:'50%' , marginTop : 12}}>
            <View style={styles.labelContainer}>
                      <Text style={styles.labelStyle}>State : </Text>
                </View>
                <View style={styles.labelContainer}>
                      <Text style={styles.labelGreyStyle}>{this.state.item.billing_info.state ? this.state.item.billing_info.state : 'N/A'}</Text>
                </View>
                <View style={styles.labelContainer}>
                      <Text style={styles.labelStyle}>Zip : </Text>
                </View>
                <View style={styles.labelContainer}>
                    <Text style={styles.labelGreyStyle} >{this.state.item.billing_info.zip ? this.state.item.billing_info.zip : 'N/A'}</Text>
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
        <View style = {{flexDirection : "row" , backgroundColor : "#FFFFFF" , flex :1 , marginBottom : 12}}>
          <View style={{ flex: 1 ,width:'50%' , marginTop : 12}}>
              <View style={styles.labelContainer}>
                      <Text style={styles.labelStyle}>Address : </Text>
                </View>
                <View style={styles.labelContainer}>
                      <Text style={styles.labelGreyStyle}  >{this.state.item.mailing_info.address ? this.state.item.mailing_info.address : 'N/A'}</Text>
                </View>
                <View style={styles.labelContainer}>
                      <Text style={styles.labelStyle}>City : </Text>
                </View>
                <View style={styles.labelContainer}>
                      <Text style={styles.labelGreyStyle} >{this.state.item.mailing_info.city ? this.state.item.mailing_info.city : 'N/A'}</Text>
                </View>
               
            </View>
            <View style={{ flex: 1 ,width:'50%' , marginTop : 12}}>
            <View style={styles.labelContainer}>
                      <Text style={styles.labelStyle}>State : </Text>
                </View>
                <View style={styles.labelContainer}>
                      <Text style={styles.labelGreyStyle}>{this.state.item.mailing_info.state ? this.state.item.mailing_info.state : 'N/A'}</Text>
                </View>
                <View style={styles.labelContainer}>
                      <Text style={styles.labelStyle}>Zip : </Text>
                </View>
                <View style={styles.labelContainer}>
                    <Text style={styles.labelGreyStyle} >{this.state.item.mailing_info.zip ? this.state.item.mailing_info.zip : 'N/A'}</Text>
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
                <Text style={styles.labelGreyStyle}> Yes</Text>
          </View>
          <View style={{ height: 30, backgroundColor: '#FFFFFF', paddingLeft: 15 , alignItems : "center" , flexDirection : "row" }}>
                <Text style={styles.labelStyle}>Assign To : </Text>
                <Text style={styles.labelGreyStyle} >{this.state.item.appointments.assignee ? `${this.state.item.appointments.assignee.first_name} ${this.props.item.appointments.assignee.last_name}` : 'N/A'}</Text>
          </View>
          <View style={{ height: 30, backgroundColor: '#FFFFFF', paddingLeft: 15 , alignItems : "center" , flexDirection : "row" }}>
                <Text style={styles.labelStyle}>Start Date : </Text>
                <Text style={styles.labelGreyStyle} >{this.state.item.appointments.start_date ? moment.utc(this.state.item.appointments.start_date).local().format('YYYY-MM-DD hh:mm a') : 'N/A'}</Text>
          </View>
          <View style={{ height: 30, backgroundColor: '#FFFFFF', paddingLeft: 15 , alignItems : "center" , flexDirection : "row" }}>
                <Text style={styles.labelStyle}>End Date : </Text>
                <Text style={styles.labelGreyStyle}>{this.state.item.appointments.end_date ? moment.utc(this.state.item.appointments.end_date).local().format('YYYY-MM-DD hh:mm a') : 'N/A'}</Text>
          </View>
      </View>
      )
    }else{
      return(
        <View style={{ height: 30, backgroundColor: '#FFFFFF', paddingLeft: 15 , alignItems : "center" , flexDirection : "row" }}>
        <Text style={styles.labelStyle}>Assigned : </Text>
        <Text style={styles.labelGreyStyle} > No</Text>
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
            <Text style={{ fontSize: 16, color: '#FFFFFF', fontWeight: '600' }}>JOB INFORMATION</Text>
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
          <View style={{ flexDirection: 'row' , backgroundColor : "#FFFFFF", height : 60}}>
                <View style={{ justifyContent : "center"}}>
                    <Text style={{ backgroundColor: '#FFFFFF',fontSize: 15,color: 'rgba(0, 0, 0, 0.73)',fontWeight : 'bold', paddingLeft:10} }>Pipeline :</Text>
                </View>
                <View style={{ justifyContent : "center" , paddingLeft : 20}}>
                    <View style = {{alignItems : "flex-start" , justifyContent : "center"}}> 
                        <Text style = {{textAlign : "center"}}>{this.getTextFromStatus()}</Text>
                        <Image source={this.getImageFromStatus()} style={{width: 35, height: 35}}/>
                    </View>
                </View>
                <View style={{ justifyContent : "center" ,alignItems : "center", paddingLeft : 20}}>
                    <View style={{height: 25, backgroundColor: '#FFFFFF', paddingLeft: 10 , paddingRight : 10,alignItems : "center" , justifyContent : "center",borderWidth : 1,borderColor : 'rgba(0, 0, 0, 0.2)'}}>
                        <Touchable onPress = {
                      () => {
                        
                          {this.popupDialog.show()}
                        
                      }
                    }>
                            <Text style = {{fontWeight : 'bold'}}>Update</Text>
                        </Touchable>
                    </View>
                </View>
          </View>


          {/* <Modal style = {{backgroundColor : "transparent"}} visible = {this.state.isModalVisible} onRequestClose = { () => console.log("test modal")}>
                <Text>Modal is visible</Text>
                <Touchable onPress = {
                    () => {
                        this.setState(
                            {isModalVisible : false}
                        )
                    }
                }>
                    <Text>Done</Text>
                </Touchable>
           </Modal> */}

          <View style={{ flexDirection: 'row', backgroundColor : "#FFFFFF", height : 40 , justifyContent : "center" , alignItems : "center" , paddingLeft : 10 , paddingRight : 10}}>
                <View style={styles.buttonContainers}>
                    <Touchable >
                        <Text style = {{fontWeight : 'bold'}}>Messages</Text>
                    </Touchable>
                </View>
          </View>
          <View style={{ flexDirection: 'row', backgroundColor : "#FFFFFF", height : 40 , justifyContent : "center" , alignItems : "center" , paddingLeft : 10 , paddingRight : 10}}>
                <View style={styles.buttonContainers}>
                <Touchable onPress={() => 
                this.props.navigator.push({ screen: 'roof_gravy.measurements_list', passProps:{job_id: this.state.job_id}})}>
                        <Text style = {{fontWeight : 'bold'}}>Measurements</Text>
                    </Touchable>
                </View>
          </View>
          <View style={{ flexDirection: 'row', backgroundColor : "#FFFFFF", height : 40 , justifyContent : "center" , alignItems : "center" , paddingLeft : 10 , paddingRight : 10}}>
                <View style={styles.buttonContainers}>
                    <Touchable >
                        <Text style = {{fontWeight : 'bold'}}>Estimates</Text>
                    </Touchable>
                </View>
          </View>
          <View style={{ flexDirection: 'row', backgroundColor : "#FFFFFF", height : 40 , justifyContent : "center" , alignItems : "center" , paddingLeft : 10 , paddingRight : 10}}>
                <View style={styles.buttonContainers}>
                    <Touchable >
                        <Text style = {{fontWeight : 'bold'}}>Worksheets</Text>
                    </Touchable>
                </View>
          </View>
          <View style={{ flexDirection: 'row', backgroundColor : "#FFFFFF", height : 40 , justifyContent : "center" , alignItems : "center" , paddingLeft : 10 , paddingRight : 10}}>
                <View style={styles.buttonContainers}>
                    <Touchable >
                        <Text style = {{fontWeight : 'bold'}}>Orders</Text>
                    </Touchable>
                </View>
          </View>
          <View style={{ flexDirection: 'row', backgroundColor : "#FFFFFF", height : 40 , justifyContent : "center" , alignItems : "center" , paddingLeft : 10 , paddingRight : 10}}>
                <View style={styles.buttonContainers}>
                    <Touchable >
                        <Text style = {{fontWeight : 'bold'}}>Tasks</Text>
                    </Touchable>
                </View>
          </View>
          <View style={{ flexDirection: 'row', backgroundColor : "#FFFFFF", height : 40 , justifyContent : "center" , alignItems : "center" , paddingLeft : 10 , paddingRight : 10}}>
                <View style={styles.buttonContainers}>
                    <Touchable >
                        <Text style = {{fontWeight : 'bold'}}>Photo/Videos</Text>
                    </Touchable>
                </View>
          </View>

         <View style={{margin: 10}}>
            <Text style={{
              fontSize: 17,
              color: 'rgba(0, 0, 0, 0.73)',
              fontWeight : 'bold'
            }}>Contact and Billing Info</Text>
        </View>
          <View style={{ flexDirection: 'row', marginBottom: 12 }}>
              <View style = {{flexDirection : "row" , backgroundColor : "#FFFFFF" , flex :1}}>
                  <View style={{ flex: 1 ,width:'50%' , marginTop : 12}}>
                      <View style={styles.labelContainer}>
                          <Text style={styles.labelStyle}>Name : </Text>
                      </View>
                      <View style={styles.labelContainer}>
                          <Text style={styles.labelGreyStyle}>{this.state.item.first_name ? this.state.item.last_name ? `${this.state.item.first_name} ${this.state.item.last_name}` : this.state.item.first_name : "N/A"}</Text>
                      </View>

                      {/* <View style={styles.labelContainer}>
                          <Text style={styles.labelStyle}>Last Name : </Text>
                      </View>
                      <View style={styles.labelContainer}>
                          <Text style={styles.labelGreyStyle} >{this.state.item.last_name ? this.state.item.last_name : "N/A"}</Text>
                      </View> */}
                    
                      <View style={styles.labelContainer}>
                          <Text style={styles.labelStyle}>Cross Reference : </Text>
                      </View>
                      <View style={styles.labelContainer}>
                          <Text style={styles.labelGreyStyle} >{this.state.item.cross_reference ? this.state.item.cross_reference : "N/A"}</Text>
                      </View>
                      <View style={styles.labelContainer}>
                          <Text style={styles.labelStyle}>Job Category : </Text>
                      </View>
                      <View style={styles.labelContainer}>
                          <Text style={styles.labelGreyStyle} >{this.state.item.job_category ? this.props.user.job_categories[this.state.item.job_category] : "N/A"}</Text>
                      </View>
                      <View style={styles.labelContainer}>
                          <Text style={styles.labelStyle}>Work Type : </Text>
                      </View>
                      <View style={styles.labelContainer}>
                          <Text style={styles.labelGreyStyle} >{this.state.item.work_type ? this.props.user.work_types[this.state.item.work_type] : "N/A"}</Text>
                      </View>
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
                                  <Text style={styles.labelGreyStyle} >{element.number ? element.number : "N/A"}</Text>
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
                                  <Text style={styles.labelGreyStyle}>{element.number ? element.number : "N/A"}</Text>
                               </View>
                              </View>
                            )
                          }else{
                            return(
                              <View>
                               <View style={styles.labelContainer}>
                                  <Text style={styles.labelGreyStyle} >{element.number ? element.number : ""}</Text>
                               </View>
                              </View>
                            )
                          }
                     
                    })
                    }
                    
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
                          <Text style={styles.labelStyle}>Company : </Text>
                      </View>
                      <View style={styles.labelContainer}>
                          <Text style={styles.labelGreyStyle} >{this.state.item.company_name ? this.state.item.company_name : "N/A"}</Text>
                      </View>

                        <View style={styles.labelContainer}>
                          <Text style={styles.labelStyle}>Lead Source : </Text>
                      </View>
                      <View style={styles.labelContainer}>
                          <Text style={styles.labelGreyStyle}>{this.state.item.lead_source ? this.props.user.source_leads[this.state.item.lead_source] : "N/A"}</Text>
                      </View>
                      <View style={styles.labelContainer}>
                            <Text style={styles.labelStyle}>Trade Types : </Text>
                        </View>

                        {this.state.item.trade_type.map((element,key) =>{
                          return(
                              
                              <View style={styles.labelContainer}>
                                <Text style={styles.labelGreyStyle} >{this.props.user.trade_types[element] ? `-  ${this.props.user.trade_types[element]}` : "N/A"}</Text>
                            </View>
                          )
                        })}
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
                              <Text style={styles.labelGreyStyle} >{element.email ? element.email : "N/A"}</Text>
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
                              <Text style={styles.labelGreyStyle}>{element.email ? element.email : "N/A"}</Text>
                           </View>
                          </View>
                          )
                      }else{
                        return(
                          <View>
                           <View style={styles.labelContainer}>
                              <Text style={styles.labelGreyStyle} >{element.email ? element.email : ""}</Text>
                           </View>
                          </View>
                          )
                      }
                    })
                    }

                
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
                      <Text style={styles.labelGreyStyle} >{this.state.item.location_info.address}</Text>
                </View>
                <View style={styles.labelContainer}>
                      <Text style={styles.labelStyle}>City : </Text>
                </View>
                <View style={styles.labelContainer}>
                      <Text style={styles.labelGreyStyle}>{this.state.item.location_info.city}</Text>
                </View>
               
            </View>
            <View style={{ flex: 1 ,width:'50%' , marginTop : 12}}>
            <View style={styles.labelContainer}>
                      <Text style={styles.labelStyle}>State : </Text>
                </View>
                <View style={styles.labelContainer}>
                      <Text style={styles.labelGreyStyle} >{this.state.item.location_info.state}</Text>
                </View>
                <View style={styles.labelContainer}>
                      <Text style={styles.labelStyle}>Zip : </Text>
                </View>
                <View style={styles.labelContainer}>
                    <Text style={styles.labelGreyStyle} >{this.state.item.location_info.zip}</Text>
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

          {/* <View style={{margin: 10}}>
            <Text style={{
              fontSize: 17,
              color: 'rgba(0, 0, 0, 0.73)',
              fontWeight : 'bold'
            }}>Appointment Details</Text>
          </View>
          {this._appointmentsView()} */}
          
         

        </ScrollView>
        
        <PopupDialog
            dialogTitle={<DialogTitle title='Update Pipeline Status'/>}
            ref={(popupDialog) => {this.popupDialog = popupDialog}}
            height = {150}
            width = {0.8}
            //haveOverlay = {false}
            >
            
             <View style={styles.pickerContainer}>
              <Picker
                placeholder="Status"
                placeholderTextColor="#BFBFBF"
                style={styles.picker}
                textStyle={styles.pickerText}
                selectedValue={this.state.statusJob}
                onValueChange={(statusJob) => this.setState({statusJob : statusJob})}
                items={_.map(this.arrayJobStatus, (jc, index) => ({label: jc, value: index}))}
                />
            </View>
            <View style = {{paddingTop : 10 , paddingRight : 10 , alignItems : "flex-end"}}>
                <Touchable onPress = {
                        () => {
                          this._updateJobStatus()
                        }
                    }
                    style = {{width: 80, height: 25 , borderWidth : 1 , borderColor :'rgba(0, 0, 0, 0.2)' , justifyContent : "center" , alignItems : "center"}}
                    >
                        <Text>Update</Text>
                    </Touchable>
            </View>

          </PopupDialog>
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
    color: 'rgba(192,192,192,1)',
    flexWrap: 'wrap'
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
    // height: 25, 
    backgroundColor: '#FFFFFF', 
    paddingLeft: 15 , 
    alignItems : "center" , 
    flexDirection : "row"
  },
  buttonContainers:{
    height: 35, 
    backgroundColor: '#FFFFFF', 
    paddingLeft: 10 , 
    paddingRight : 10,
    alignItems : "center" , 
    justifyContent : "center",
    borderWidth : 1,
    borderColor : 'rgba(0, 0, 0, 0.2)',
    flex : 1
  },
  pickerContainer:{
    height: 44,
    backgroundColor: '#FFFFFF',
    paddingLeft: 8,
    paddingRight: 15,
    // paddingTop : 2,
    // paddingBottom : 2,
    // borderWidth : 1,
    // borderColor : 'rgba(0, 0, 0, 0.2)'
    }
});

function mapStateToProps(state, ownProps) {
  return {
    user: state.user,
    users: state.users
  };
};

export default connect(mapStateToProps, {createLead, getUserList , getParticularJob , updateJobStatus})(JobDetails);