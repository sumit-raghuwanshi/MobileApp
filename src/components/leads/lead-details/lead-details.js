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
    console.log("itemssgsdhdsth", this.props.item.id)
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

  _cameraPressHandler = () => {
    var options = {
      title: 'Take Picture'
    }

    ImagePicker.launchCamera(options, (response)  => {
      if (response.error) {
        alert(response.error)
      }
      else if (!response.didCancel) {
        this.setState({
          image_attach: response
        })
      }
    })
  }


  _onSubmit = () => {
    var {image_attach,
      cross_reference,
      lastName,
      contact,
      company,
      phone,phone2,phone3,
      email,email2,email3,
      address,
      city,
      state,
      zip, 
      source, 
      job_category, 
      work_type, 
      trade_type, 
      assignee_id, 
      title, 
      start_date, 
      end_date, 
      appointment_address, 
      appointment_city ,
      address_mailing,
      city_mailing,
      state_mailing,
      zip_mailing,
      address_billing,
      city_billing,
      state_billing,
      zip_billing} = this.state

     var errorMessages = []

     if (!contact)
       errorMessages.push('First Name is required')
  
     if (!lastName)
       errorMessages.push('Last Name is required')

     if (!cross_reference)
       errorMessages.push('Cross reference is required')

     if (!company)
      errorMessages.push('Company is required')

      if (!phone)
      errorMessages.push('Phone number is required')

     if (!email)
      errorMessages.push('Email is required')

      //debugger;
      if (email){
        if (typeof email != "undefined"){
          if (!this.validateEmail(email)){
            console.log("Valid email");
          }else{
            errorMessages.push('Invalid Email');
          }
        }
      }

      if (email2){
        if (typeof email2 != "undefined"){
          if (!this.validateEmail(email2)){
            console.log("Valid email");
          }else{
            errorMessages.push('Invalid Email');
          }
        }
      }
      if (email3){
        if (typeof email3 != "undefined"){
          if (!this.validateEmail(email3)){
            console.log("Valid email");
          }else{
            errorMessages.push('Invalid Email');
          }
        }
      }

     
      
      

     if (!address)
       errorMessages.push('Address is required')

     if (!city)
       errorMessages.push('City is required')

     if (!state)
       errorMessages.push('State is required')

     if (!zip)
       errorMessages.push('Zipcode is required')

     if (typeof source == "undefined")
       errorMessages.push('Source is required')

     if (typeof job_category == "undefined")
       errorMessages.push('Job Category is required')

     if (typeof work_type == "undefined")
       errorMessages.push('Work Type is required')

      // if (typeof trade_type == "undefined")
      //   errorMessages.push('Trade Type is required')

     if (typeof assignee_id == "undefined")
       errorMessages.push('Assignee is required')

     if (errorMessages.length > 0) {
       Notification.error(_.join(errorMessages, "\n"))
       return
    }

    this.setState({loading: true})

   
    var job={}
    
    job.first_name = contact
    job.last_name= lastName

    job.company_name =  company
    job.cross_reference= cross_reference
   
    job.job_category= job_category
    job.work_type= work_type
    //job.trade_type= [trade_type]
    job.trade_type= this.state.selectedIndexOfTrade
    job.lead_source = source
 
    if (this.state.numberOfPhoneNumber == 1){
      job.phone =  [{number:phone , type : "1" , primary:true , ext : ""}]
    }else if (this.state.numberOfPhoneNumber == 2){
      job.phone =  [{number:phone , type : "1" , primary:true , ext : ""} , {number:phone2 , type : "1" , primary:false , ext : ""}]
    }else {
      job.phone =  [{number:phone , type : "1" , primary:true , ext : ""} , {number:phone2 , type : "1" , primary:false , ext : ""} , , {number:phone3 , type : "1" , primary:false , ext : ""}]
    }

    if (this.state.numberOfEmail == 1){
      job.email_address = [{email : email , primary : true}]
    }else if (this.state.numberOfEmail == 2){
      job.email_address = [{email : email , primary : true} , {email : email2 , primary : false}]
    }else{
      job.email_address = [{email : email , primary : true} , {email : email2 , primary : false} , , {email : email3 , primary : false}]
    }
    

    var loc_attrib = {
      address : address,
      city : city,
      state : state,
      zip : zip
    }
    job.location_info_attributes = loc_attrib

    var mail_attrib = {
        same_as_location :  this.state.isMailingSameAsLocation,
        address :  address_mailing,
        city_mailing : city_mailing,
        state_mailing :  state_mailing,
        zip_mailing : zip_mailing,
    }

    var bill_attrib = {
      same_as_location :  this.state.isMailingSameAsLocation,
      address :  address_billing,
      city_mailing : city_billing,
      state_mailing :  state_billing,
      zip_mailing : zip_billing,
  }
  if (this.state.isMailingSameAsLocation == true){
    job.mailing_info_attributes = mail_attrib
  }else{
    job.mailing_info_attributes = {
      same_as_location :  this.state.isMailingSameAsLocation,
      address : "",
      city_mailing : "",
      state_mailing :  "",
      zip_mailing : "",
  }
  }

  if (this.state.isBillingSameAsLocation == true){
    job.billing_info_attributes =  bill_attrib
  }else{
    job.billing_info_attributes = {
      same_as_location :  this.state.isBillingSameAsLocation,
      address :  "",
      city_mailing : "",
      state_mailing :  "",
      zip_mailing : "",
  }
  }
  
    

    if (this.state.isAssignedAppointments == true){
      job.assignee_id = assignee_id

      var appointment_att = [
        {
          event_title : title,
          start_date : start_date,
          end_date : end_date,
          address : "",
          city : ""
        }
      ]
      job.appointments_attributes  =  appointment_att

      
    }else{
      job.assignee_id = ""

      var appointment_att = [
        {
          event_title : "",
          start_date : "",
          end_date : "",
          address : "",
          city : ""
        }
      ]
      job.appointments_attributes   = appointment_att
    }
   
    
    job.priority = "1"
    job.notes = ""
  
    
    console.log("params", job);
    
    var data = {"job":job}
    console.log(JSON.stringify(data))
    this.props.createLead(data)
    
    .then(response => {
      this.setState({loading: false}, this._navigateToPreviousScreen)
    }).catch(error => {
      this.setState({loading: false})
    })
  }
  _addMorePhoneNumberComponent = () => {
    if (this.state.numberOfPhoneNumber < 3){
      this.setState(prevState => {
        return {numberOfPhoneNumber: prevState.numberOfPhoneNumber + 1}
     })
    }else{
      alert("You can add upto three phone numbers!")
    }
  }
  _removePhoneNumberComponent = () => {
    if (this.state.numberOfPhoneNumber > 1){
      this.setState(prevState => {
        return {numberOfPhoneNumber: prevState.numberOfPhoneNumber - 1}
     })
    }else{
      alert("Atleast one phone number is required!")
    }
  }

  _addMoreEmailComponent = () => {
    if (this.state.numberOfEmail < 3){
      this.setState(prevState => {
        return {numberOfEmail: prevState.numberOfEmail + 1}
     })
    }else{
      alert("You can add upto three emails!")
    }
  }
  _removeEmailComponent = () => {
    if (this.state.numberOfEmail > 1){
      this.setState(prevState => {
        return {numberOfEmail: prevState.numberOfEmail - 1}
     })
    }else{
      alert("Atleast one email is required!")
    }
  }


  phoneNumberViews(){
    console.log("current phone number state :" , this.state.numberOfPhoneNumber)
    if (this.state.numberOfPhoneNumber == 1){
      return (
        <View style={{ height: 44, backgroundColor: '#FFFFFF', paddingLeft: 15 , flexDirection : "row"}}>
        <TextInput
          placeholder="Phone (Primary)"
          value={this.state.phone}
          keyboardType="numeric"
          onChangeText={(phone) => this.setState({phone})}
          style={styles.textFieldPhone} TextInput/>
          
          <TouchableHighlight style = {{ backgroundColor : "#2F3848" , height : 40 , width : 60 , justifyContent: "center"}}  onPress={this._addMorePhoneNumberComponent}>  
              <Text style={styles.buttonText}>ADD</Text>
          </TouchableHighlight>
      </View>
      );
    }
     else if (this.state.numberOfPhoneNumber == 2){
      return (
        <View style = {{flexDirection : "column"}}>
          <View style={{ height: 44, backgroundColor: '#FFFFFF', paddingLeft: 15 , flexDirection : "row"}}>
            <TextInput
              placeholder="Phone (Primary)"
              value={this.state.phone}
              keyboardType="numeric"
              onChangeText={(phone) => this.setState({phone})}
              style={styles.textFieldPhone} TextInput/>
              
              <TouchableHighlight style = {{ backgroundColor : "#2F3848" , height : 40 , width : 60 , justifyContent: "center"}}  onPress={this._addMorePhoneNumberComponent}>  
                  <Text style={styles.buttonText}>ADD</Text>
              </TouchableHighlight>   
        </View>

        <View style={{ height: 44, backgroundColor: '#FFFFFF', paddingLeft: 15 , flexDirection : "row"}}>
          <TextInput
            placeholder="Phone"
            value={this.state.phone2}
            keyboardType="numeric"
            onChangeText={(phone2) => this.setState({phone2})}
            style={styles.textFieldPhone} TextInput/>
    
        <TouchableHighlight style = {{ height : 40 , width : 60 , justifyContent: "center", alignItems: 'center'}}  onPress={this._removePhoneNumberComponent}>  
        <Image style={{paddingTop : 10 , paddingLeft : 10}} source={require('../../../../img/icons/delete.png')} />
        </TouchableHighlight>
        </View>
      </View>
      );
     }else{
      return (
        <View style = {{flexDirection : "column"}}>
          <View style={{ height: 44, backgroundColor: '#FFFFFF', paddingLeft: 15 , flexDirection : "row"}}>
            <TextInput
              placeholder="Phone (Primary)"
              value={this.state.phone}
              keyboardType="numeric"
              onChangeText={(phone) => this.setState({phone})}
              style={styles.textFieldPhone} TextInput/>
              
              <TouchableHighlight style = {{ backgroundColor : "#2F3848" , height : 40 , width : 60 , justifyContent: "center"}}  onPress={this._addMorePhoneNumberComponent}>  
                  <Text style={styles.buttonText}>ADD</Text>
              </TouchableHighlight>   
        </View>

        <View style={{ height: 44, backgroundColor: '#FFFFFF', paddingLeft: 15 , flexDirection : "row"}}>
          <TextInput
            placeholder="Phone"
            value={this.state.phone2}
            keyboardType="numeric"
            onChangeText={(phone2) => this.setState({phone2})}
            style={styles.textFieldPhone} TextInput/>
    
        <TouchableHighlight style = {{ height : 40 , width : 60 , justifyContent: "center", alignItems: 'center'}}  onPress={this._removePhoneNumberComponent}>  
            <Image style={{paddingTop : 10 , paddingLeft : 10}} source={require('../../../../img/icons/delete.png')} />
        </TouchableHighlight>
        </View>
        <View style={{ height: 44, backgroundColor: '#FFFFFF', paddingLeft: 15 , flexDirection : "row"}}>
          <TextInput
            placeholder="Phone"
            value={this.state.phone3}
            keyboardType="numeric"
            onChangeText={(phone3) => this.setState({phone3})}
            style={styles.textFieldPhone} TextInput/>
    
        <TouchableHighlight style = {{ height : 40 , width : 60 , justifyContent: "center", alignItems: 'center'}}  onPress={this._removePhoneNumberComponent}>  
            <Image style={{paddingTop : 10 , paddingLeft : 10}} source={require('../../../../img/icons/delete.png')} />
        </TouchableHighlight>
        </View>
      </View>
      );
     }
  }

  emailViews(){
    console.log("email numbers state" , this.state.numberOfEmail)
    if (this.state.numberOfEmail == 1){
        return(
          <View style={{ height: 44, backgroundColor: '#FFFFFF', paddingLeft: 15 , flexDirection : "row" }}>
              <TextInput
                placeholder="Email (Primary)"
                value={this.state.email}
                autoCapitalize="none"
                keyboardType="email-address"
                onChangeText={(email) => this.setState({email})}
                style={styles.textFieldPhone} />
                <TouchableHighlight style = {{ backgroundColor : "#2F3848" , height : 40 , width : 60 , justifyContent: "center"}}  onPress={this._addMoreEmailComponent}>  
                    <Text style={styles.buttonText}>ADD</Text>
                </TouchableHighlight>
            </View>
        );
    }else if (this.state.numberOfEmail == 2){
      return(
        <View style = {{flexDirection : "column"}}>
          <View style={{ height: 44, backgroundColor: '#FFFFFF', paddingLeft: 15 , flexDirection : "row" }}>
              <TextInput
                placeholder="Email (Primary)"
                value={this.state.email}
                autoCapitalize="none"
                keyboardType="email-address"
                onChangeText={(email) => this.setState({email})}
                style={styles.textFieldPhone} />
                <TouchableHighlight style = {{ backgroundColor : "#2F3848" , height : 40 , width : 60 , justifyContent: "center"}}  onPress={this._addMoreEmailComponent}>  
                    <Text style={styles.buttonText}>ADD</Text>
                </TouchableHighlight>
            </View>
            <View style={{ height: 44, backgroundColor: '#FFFFFF', paddingLeft: 15 , flexDirection : "row" }}>
              <TextInput
                placeholder="Email"
                value={this.state.email2}
                autoCapitalize="none"
                keyboardType="email-address"
                onChangeText={(email2) => this.setState({email2})}
                style={styles.textFieldPhone} />
                <TouchableHighlight style = {{  height : 40 , width : 60 , justifyContent: "center", alignItems: 'center'}}  onPress={this._removeEmailComponent}>  
                    <Image style={{paddingTop : 10 , paddingLeft : 10}} source={require('../../../../img/icons/delete.png')} />
                </TouchableHighlight>
            </View>
        </View>
      );
    }else{
        return(
          <View style = {{flexDirection : "column"}}>
          <View style={{ height: 44, backgroundColor: '#FFFFFF', paddingLeft: 15 , flexDirection : "row" }}>
              <TextInput
                placeholder="Email (Primary)"
                value={this.state.email}
                autoCapitalize="none"
                keyboardType="email-address"
                onChangeText={(email) => this.setState({email})}
                style={styles.textFieldPhone} />
                <TouchableHighlight style = {{ backgroundColor : "#2F3848" , height : 40 , width : 60 , justifyContent: "center"}}  onPress={this._addMoreEmailComponent}>  
                    <Text style={styles.buttonText}>ADD</Text>
                </TouchableHighlight>
            </View>
            <View style={{ height: 44, backgroundColor: '#FFFFFF', paddingLeft: 15 , flexDirection : "row" }}>
              <TextInput
                placeholder="Email"
                value={this.state.email2}
                autoCapitalize="none"
                keyboardType="email-address"
                onChangeText={(email2) => this.setState({email2})}
                style={styles.textFieldPhone} />
                <TouchableHighlight style = {{ height : 40 , width : 60 , justifyContent: "center", alignItems: 'center'}}  onPress={this._removeEmailComponent}>  
                    <Image style={{paddingTop : 10 , paddingLeft : 10}} source={require('../../../../img/icons/delete.png')} />
                </TouchableHighlight>
            </View>
            <View style={{ height: 44, backgroundColor: '#FFFFFF', paddingLeft: 15 , flexDirection : "row" }}>
              <TextInput
                placeholder="Email"
                value={this.state.email3}
                autoCapitalize="none"
                keyboardType="email-address"
                onChangeText={(email3) => this.setState({email3})}
                style={styles.textFieldPhone} />
                <TouchableHighlight style = {{  height : 40 , width : 60 , justifyContent: "center", alignItems: 'center'}}  onPress={this._removeEmailComponent}>  
                    <Image style={{paddingTop : 10 , paddingLeft : 10}} source={require('../../../../img/icons/delete.png')} />
                </TouchableHighlight>
            </View>
        </View>
        );
    }
  }

  hideUnhideBillingAddress(){

    if (this.state.isBillingSameAsLocation  == false){
      //this.setState({isBillingSameAsLocation: false})
      return(
         <View style={{ marginVertical: 12 }}>
            <View style={{ height: 44, backgroundColor: '#FFFFFF', paddingLeft: 15 }}>
              <TextInput
                placeholder="Address"
                value={this.state.address_billing}
                onChangeText={(address_billing) => this.setState({address_billing})}
                style={styles.textField} />
            </View>

            <View style={{ height: 44, backgroundColor: '#FFFFFF', paddingLeft: 15 }}>
              <TextInput
                placeholder="City"
                value={this.state.city_billing}
                onChangeText={(city_billing) => this.setState({city_billing})}
                style={styles.textField} />
            </View>

            <View style={{ height: 44, backgroundColor: '#FFFFFF', paddingLeft: 15 }}>
              <TextInput
                placeholder="State"
                value={this.state.state_billing}
                onChangeText={(state_billing) => this.setState({state_billing})}
                style={styles.textField} />
            </View>

            <View style={{ height: 44, backgroundColor: '#FFFFFF', paddingLeft: 15 }}>
              <TextInput
                placeholder="Zip Code"
                value={this.state.zip_billing}
                onChangeText={(zip_billing) => this.setState({zip_billing})}
                style={styles.textField} />
            </View>
            <View style={{ height: 44, backgroundColor: '#FFFFFF', paddingLeft: 15 , flexDirection : "row" , alignItems  :"center"}}>
              <TouchableHighlight onPress={() => this.setState({isBillingSameAsLocation:true})}>
              <Image style={{paddingTop : 10}} source={require('../../../../img/leads/unchecked.png')} />
              </TouchableHighlight>
              <Text style={{paddingLeft : 10 ,textAlignVertical : "center" }}>Same as Location address</Text>
            </View>
          </View> 
      );
    }else{
      //this.setState({isBillingSameAsLocation: true})
      return(
        <View style={{ height: 44, backgroundColor: '#FFFFFF', paddingLeft: 15 , flexDirection : "row" , alignItems : "center"}}> 
            <TouchableHighlight onPress={() => this.setState({isBillingSameAsLocation:false})} >
              <Image style={{paddingTop : 10}} source={require('../../../../img/leads/checked.png')} />
            </TouchableHighlight>
            <Text style={{paddingLeft : 10 ,textAlignVertical : "center" }}>Same as Location address</Text>
        </View>
      );
        
      
    }
  }

  hideUnhideMailingAddress(){


    if (this.state.isMailingSameAsLocation  == false){
      //this.setState({isBillingSameAsLocation: false})
      return(
         <View style={{ marginVertical: 12 }}>
            <View style={{ height: 44, backgroundColor: '#FFFFFF', paddingLeft: 15 }}>
              <TextInput
                placeholder="Address"
                value={this.state.address_mailing}
                onChangeText={(address_mailing) => this.setState({address_mailing})}
                style={styles.textField} />
            </View>

            <View style={{ height: 44, backgroundColor: '#FFFFFF', paddingLeft: 15 }}>
              <TextInput
                placeholder="City"
                value={this.state.city_mailing}
                onChangeText={(city_mailing) => this.setState({city_mailing})}
                style={styles.textField} />
            </View>

            <View style={{ height: 44, backgroundColor: '#FFFFFF', paddingLeft: 15 }}>
              <TextInput
                placeholder="State"
                value={this.state.state_mailing}
                onChangeText={(state_mailing) => this.setState({state_mailing})}
                style={styles.textField} />
            </View>

            <View style={{ height: 44, backgroundColor: '#FFFFFF', paddingLeft: 15 }}>
              <TextInput
                placeholder="Zip Code"
                value={this.state.zip_mailing}
                onChangeText={(zip_mailing) => this.setState({zip_mailing})}
                style={styles.textField} />
            </View>
            <View style={{ height: 44, backgroundColor: '#FFFFFF', paddingLeft: 15 , flexDirection : "row" , paddingTop : 10}}>
              <TouchableHighlight onPress={() => this.setState({isMailingSameAsLocation:true})}>
                 
                  <Image style={{paddingTop : 10}} source={require('../../../../img/leads/unchecked.png')} />
              </TouchableHighlight>
              <Text style={{paddingLeft : 10 , textAlignVertical : "center"}}>Same as Location address</Text>
            </View>


          </View> 
      );
    }else{
      //this.setState({isBillingSameAsLocation: true})
      return(
        <View style={{ height: 44, backgroundColor: '#FFFFFF', paddingLeft: 15 , flexDirection : "row" , paddingTop : 10}}> 
           <TouchableHighlight onPress={() => this.setState({isMailingSameAsLocation:false})} >
              <Image style={{paddingTop : 10}} source={require('../../../../img/leads/checked.png')} />
            </TouchableHighlight>
            <Text style={{paddingLeft : 10 ,textAlignVertical : "center" }}>Same as Location address</Text>
        </View>
      );
        
      
    }
  }

  appointDetailsViews(){
    if (this.state.isAssignedAppointments == true){
      return(
        <View style={{ marginVertical: 12 }}>
            <View style={{flexDirection : "row"}} >
                <View style={{ height: 44, backgroundColor: '#FFFFFF', paddingLeft: 15 , flex:1 , justifyContent : "center"}}>
                    {/* <TextInput
                      placeholder="Title"
                      value={this.state.title}
                      onChangeText={(title) => this.setState({title})}
                      style={styles.textField} /> */}
                      <View style={{flexDirection : "row" , alignItems : "center"}}>
                          <TouchableHighlight onPress={() => this.setState({isAssignedAppointments:true})}>
                              <Image style={{paddingTop : 10}} source={require('../../../../img/leads/checked.png')} />
                          </TouchableHighlight>
                          <Text style={{paddingLeft : 10 , textAlignVertical : "center"}}>Assigned</Text>
                      </View>
                  </View>
                  <View style={{ height: 44, backgroundColor: '#FFFFFF', paddingLeft: 15 , flex:1 , justifyContent : "center"}}>
                    {/* <TextInput
                      placeholder="Title"
                      value={this.state.title}
                      onChangeText={(title) => this.setState({title})}
                      style={styles.textField} /> */}
                      <View style={{flexDirection : "row" , alignItems : "center"}}>
                          <TouchableHighlight onPress={() => this.setState({isAssignedAppointments:false})}>
                              <Image style={{paddingTop : 10}} source={require('../../../../img/leads/unchecked.png')} />
                          </TouchableHighlight>
                          <Text style={{paddingLeft : 10 , textAlignVertical : "center"}}>Unassigned</Text>
                      </View>
                  </View>
              </View>
              <View style={{ height: 44, backgroundColor: '#FFFFFF', paddingLeft: 3 }}>
              <Picker
                placeholder="Assign To"
                placeholderTextColor="#BFBFBF"
                style={styles.picker}
                textStyle={styles.pickerText}
                selectedValue={this.state.assignee_id}
                onValueChange={(assignee_id) => this.setState({assignee_id})}
                items={_.map(this.props.users, (user) => ({ label: user.first_name + " " + user.last_name, value: user.id }))}
                />
            </View>
            <View style={{ height: 44, backgroundColor: '#FFFFFF', paddingLeft: 15 }}>
              <TextInput
                placeholder="Title"
                value={this.state.title}
                onChangeText={(title) => this.setState({title})}
                style={styles.textField} />
            </View>

            <View style={{ height: 44, backgroundColor: '#FFFFFF', paddingLeft: 15 }}>
              <DateTimePicker
                mode={"datetime"}
                is24Hour={false}
                placeholder="Select Start date"
                style={styles.picker}
                textStyle={styles.pickerText}
                format={'MMM DD, YYYY h:mma'}
                value={this.state.start_date}
                onConfirm={(start_date) => this.setState({start_date})}
                />
            </View>

            <View style={{ height: 44, backgroundColor: '#FFFFFF', paddingLeft: 15 }}>
              <DateTimePicker
                mode={"datetime"}
                is24Hour={false}
                placeholder="Select End date"
                style={styles.picker}
                textStyle={styles.pickerText}
                format={'MMM DD, YYYY h:mma'}
                value={this.state.end_date}
                onConfirm={(end_date) => this.setState({end_date})}
                />
            </View>
          </View>
      );
    }else {
      return(
        <View style={{ marginVertical: 12 }}>
        <View style={{flexDirection : "row"}} >
            <View style={{ height: 44, backgroundColor: '#FFFFFF', paddingLeft: 15 , flex:1 , justifyContent : "center"}}>
             
                  <View style={{flexDirection : "row" , alignItems : "center"}}>
                      <TouchableHighlight onPress={() => this.setState({isAssignedAppointments:true})}>
                          <Image style={{paddingTop : 10}} source={require('../../../../img/leads/unchecked.png')} />
                      </TouchableHighlight>
                      <Text style={{paddingLeft : 10 , textAlignVertical : "center"}}>Assigned</Text>
                  </View>
              </View>
              <View style={{ height: 44, backgroundColor: '#FFFFFF', paddingLeft: 15 , flex:1 , justifyContent : "center"}}>
              
                  <View style={{flexDirection : "row" , alignItems : "center"}}>
                      <TouchableHighlight onPress={() => this.setState({isAssignedAppointments:false})}>
                          <Image style={{paddingTop : 10}} source={require('../../../../img/leads/checked.png')} />
                      </TouchableHighlight>
                      <Text style={{paddingLeft : 10 , textAlignVertical : "center"}}>Unassigned</Text>
                  </View>
              </View>
          </View>
          </View>
      );
    }
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
            <Touchable onPress={this._navigateToDashboard}>
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
                  <Text style={styles.labelGreyStyle}>dfhdfhdzfbd</Text>
              </View>
              <View style={{ height: 30, backgroundColor: '#FFFFFF', paddingLeft: 15 , alignItems : "center" , flexDirection : "row" }}>
                  <Text style={styles.labelStyle}>Company : </Text>
                  <Text style={styles.labelGreyStyle}>dfhdfhdzfbd</Text>
              </View>

              

              <View style={{ height: 44, backgroundColor: '#FFFFFF', paddingLeft: 15 }}>
                <TextInput
                  placeholder="Company"
                  value={this.state.company}
                  onChangeText={(company) => this.setState({company})}
                  style={styles.textField} />
              </View>

                <View style={{ height: 44, backgroundColor: '#FFFFFF', paddingLeft: 15 }}>
                <TextInput
                  placeholder="Cross Reference"
                  value={this.state.cross_reference}
                  onChangeText={(cross_reference) => this.setState({cross_reference})}
                  style={styles.textField} />
              </View>
            </View>
          </View>

          <View style={{ marginVertical: 12 }}>
          {this.phoneNumberViews()}

            {this.emailViews()}

          </View>

          <View style={{margin: 10}}>
            <Text style={{
              fontSize: 17,
              color: 'rgba(0, 0, 0, 0.73)'
            }}>Location Address</Text>
        </View>
          <View style={{ marginVertical: 12 }}>
            <View style={{ height: 44, backgroundColor: '#FFFFFF', paddingLeft: 15 }}>
              <TextInput
                placeholder="Address"
                value={this.state.address}
                onChangeText={(address) => this.setState({address})}
                style={styles.textField} />
            </View>

            <View style={{ height: 44, backgroundColor: '#FFFFFF', paddingLeft: 15 }}>
              <TextInput
                placeholder="City"
                value={this.state.city}
                onChangeText={(city) => this.setState({city})}
                style={styles.textField} />
            </View>

            <View style={{ height: 44, backgroundColor: '#FFFFFF', paddingLeft: 15 }}>
              <TextInput
                placeholder="State"
                value={this.state.state}
                onChangeText={(state) => this.setState({state})}
                style={styles.textField} />
            </View>

            <View style={{ height: 44, backgroundColor: '#FFFFFF', paddingLeft: 15 }}>
              <TextInput
                placeholder="Zip Code"
                value={this.state.zip}
                onChangeText={(zip) => this.setState({zip})}
                style={styles.textField} />
            </View>
          </View>

           <View style={{margin: 10}}>
            <Text style={{
              fontSize: 17,
              color: 'rgba(0, 0, 0, 0.73)'
            }}>Billing Address</Text>
        </View>
        {this.hideUnhideBillingAddress()} 
        <View style={{margin: 10}}>
            <Text style={{
              fontSize: 17,
              color: 'rgba(0, 0, 0, 0.73)'
            }}>Mailing Address</Text>
        </View>
        {this.hideUnhideMailingAddress()}

          <View style={{ marginVertical: 12 }}>
            <View style={{ height: 44, backgroundColor: '#FFFFFF', paddingLeft: 15 }}>
              <Picker
                placeholder="Lead Source"
                placeholderTextColor="#BFBFBF"
                style={styles.picker}
                textStyle={styles.pickerText}
                selectedValue={this.state.source}
                onValueChange={(source) => this.setState({source})}
                items={_.map(this.props.user.source_leads, (source, index) => ({label: source, value: index}))}
                />
            </View>

            <View style={{ height: 44, backgroundColor: '#FFFFFF', paddingLeft: 15 }}>
              <Picker
                placeholder="Job Category"
                placeholderTextColor="#BFBFBF"
                style={styles.picker}
                textStyle={styles.pickerText}
                selectedValue={this.state.job_category}
                onValueChange={(job_category) => this.setState({job_category})}
                items={_.map(this.props.user.job_categories, (jc, index) => ({label: jc, value: index}))}
                />
            </View>

            <View style={{ height: 44, backgroundColor: '#FFFFFF', paddingLeft: 15 }}>
              <Picker
                placeholder="Work Type"
                placeholderTextColor="#BFBFBF"
                style={styles.picker}
                textStyle={styles.pickerText}
                selectedValue={this.state.work_type}
                onValueChange={(work_type) => this.setState({work_type})}
                items={_.map(this.props.user.work_types, (wt, index) => ({label: wt, value: index}))}
                />
            </View>

            <View style={{ height: 44, backgroundColor: '#FFFFFF', paddingLeft: 15 }}>

                <Modal visible = {this.state.isModalVisible} onRequestClose = { () => console.log("test modal")}> 
                  <View style = {{paddingTop : 20}}>
                    <View style= {{justifyContent : "center" , alignItems : "center"}}>
                    <Text>Select Trade types</Text>
                    </View>
                    
                    <SelectMultiple
                  items={this.props.user.trade_types}
                  selectedItems={this.state.selectedLeadTypes}
                  onSelectionsChange={this.onSelectionsChange} />
                    <TouchableHighlight onPress = {
                      () => {
                        this.setState(
                          {isModalVisible : false}
                        )
                      }
                    }
                    style = {{justifyContent : "center" , alignItems : "center" , height : 44}}
                    >
                    <Text>Done</Text>
                    </TouchableHighlight>
                  </View>
                </Modal>
                <TouchableHighlight onPress = {
                      () => {
                        this.setState(
                          {isModalVisible : true}
                        )
                      }
                    }
                    style = {{justifyContent : "center" , alignItems : "center" , height : 44}}
                    >
                     <Text style={{textAlign : "center" , color: 'rgba(0, 0, 0, 0.73)'}}>Trade type</Text>
                </TouchableHighlight>

                
                  <PopupDialog
                    ref={(popupDialog) => { this.popupDialog = popupDialog; }}
                    >
                    <View>
                    <SelectMultiple
                        items={this.props.user.trade_types.map( (tt, index) => ({label: tt, value: index}))}
                        selectedItems={this.state.selectedLeadTypes}
                        onSelectionsChange={this.onSelectionsChange} />
                    </View>
                  </PopupDialog>
            </View>
          </View>

          <View style={{margin: 10}}>
            <Text style={{
              fontSize: 17,
              color: 'rgba(0, 0, 0, 0.73)'
            }}>Appointment Details</Text>
          </View>
          {this.appointDetailsViews()}
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