import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  SafeAreaView,
  StatusBar,
  Image,
  AsyncStorage
} from 'react-native';
import { TextInput, Touchable, Picker, TouchableField, Loader } from '../common';
import ImagePicker from 'react-native-image-picker';

import {connect} from 'react-redux';
import {updateProfile} from '../../actions';
import {Notification} from '../../helpers';
import _ from 'lodash';

class MyInfoScreen extends Component {
  static navigatorStyle = {
    navBarHidden: true
  }

  constructor(props) {
    super(props)

    var {currentUser} = this.props
   

    this.state = {
      firstName: currentUser["first_name"],
      lastName: currentUser["last_name"],
      email: currentUser["email"],
      phone: currentUser["phone"],
      location: currentUser["location"],
      avatar: currentUser["avatar"],
      token : currentUser["token"],
      id : currentUser["id"],
      flag: true
    }
  }
  

  _navigateToDashboard = () => {
    this.props.navigator.popToRoot()
  }

  _navigateToPreviousScreen = () => {
    this.props.navigator.pop()
  }

  _submit = () => {
    var {firstName, lastName, email, phone, location, image_attach} = this.state
    var errorMessages = []

    if (firstName.trim().length > 10 || firstName.trim().length < 1)
      errorMessages.push('First Name is required or should be less than 10 character')

    if (lastName.trim().length > 10 || lastName.trim().length < 1)
      errorMessages.push('Last Name is required or should be less than 10 character')
    if(isNaN(phone.trim()) && phone.trim().length > 10)
      errorMessages.push('Phone number should be valid')
    if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email.trim())))
      errorMessages.push('Email should be valid')

    // if (!location)
    //   errorMessages.push('Location is required')

    if (errorMessages.length > 0) {
      Notification.error(_.join(errorMessages, "\n"))

      return
    }

    this.setState({loading: true})
    var params = new FormData()
    params.append("user[first_name]", firstName.trim())
    params.append("user[last_name]", lastName.trim())
    params.append("user[phone]", phone.trim())
    params.append("user[email]", email)
    params.append("user[token]" , this.state.token)

    // var params = new FormData()
    // params.append("first_name", firstName)
    // params.append("last_name", lastName)
    // params.append("phone", phone)
    // params.append("email", email)
    // params.append("token" , this.state.token)
    
    // params.append("id" , this.state.id)
    // params.append("initials",null)
    // params.append("employee_id",null)
    // params.append("status",null)
    // //params.append("avatar",null)
    // params.append("display_name",null)
    // params.append("openGoogleSync",false)

    

    // var params = {
    //   first_name : firstName,
    //   last_name : lastName,
    //   phone : phone,
    //   email : email,
    //   token : this.state.token,
    //   id : this.state.id,
    //   initials:null,
    //   employee_id:null,
    //   status:null,
    //   avatar:null,
    //   display_name:null,
    // }
    //params.append("user[location]", location)

    if (image_attach && image_attach.uri) {
          params.append("avatar", {
          uri: image_attach.uri,
          name: "profile_picture.jpg",
          type: "image/jpg"
      })

      params.append("user[avatar_attributes][data][uri]", this.state.image_attach.uri)
      params.append("user[avatar_attributes][data][name]", "profile_picture")
      params.append("user[avatar_attributes][data][type]", this.state.image_attach.type ? this.state.image_attach.type : "image/jpg")
    }

    // var params = {
    //   "user": {
    //     "first_name": firstName,
    //     "last_name": lastName,
    //     "email": email,
    //     "location": location,
    //     "phone": phone
    //   }
    // }
    console.log("edit info paramsssssssss===>",params)

    this.props.updateProfile(params)
    .then((response) => {
      console.log("Success===>",response)
      this.setState({loading: false}, this._navigateToPreviousScreen)
    })
    .catch((error) => {
      console.log("Failure ==> ",JSON.stringify(error))
      this.setState({loading: false})
    })
  }

  _cameraPressHandler = () => {
    var options = {
      title: 'Take Picture'
    }
    if(this.state.flag){
      this.setState({loading: true,flag: false})
      ImagePicker.showImagePicker(options, (response) => {
        if (response.didCancel) {
           this.setState({loading: false, flag: true})
        } else if (response.error) {
          alert('ImagePicker Error: ', response.error);
          this.setState({loading: false, flag: true})
        } else if (response.customButton) {
          alert('User tapped custom button: ', response.customButton);
          this.setState({loading: false})
        }else if (!response.didCancel) {
          this.setState({
            image_attach: response,
            loading: false,
            flag: true
          })
        }
      });
    }

    // ImagePicker.launchCamera(options, (response)  => {
    //  alert(JSON.stringify(response))
    //   if (response.error) {
    //   }
    //   else if (!response.didCancel) {
    //     this.setState({
    //       image_attach: response
    //     })
    //   }
    // })
  }

  render() {
    // console.log("Hello -- > " + JSON.stringify(this.props.currentUser))
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content"/>

        <SafeAreaView style={styles.header}>
          <Touchable style={{ width: 50, alignItems: 'center', justifyContent: 'center' }} onPress={this._navigateToDashboard}>
            <Image source={require('../../../img/icons/home.png')} />
          </Touchable>
          <View style={styles.safeAreaView}>
            <Image style={styles.safeAreaImage} source={require('../../../img/icons/settings.png')}/>
            <Text style={styles.safeAreaText}>My Info</Text>
          </View>
          <Touchable style={{ width: 50, alignItems: 'center', justifyContent: 'center' }}>
            <View></View>
          </Touchable>
        </SafeAreaView>

        <ScrollView style={styles.body} contentContainerStyle={{paddingBottom: 20}}>
          <View style={styles.topButtonContainer}>
            <View>
              <Touchable onPress={this._navigateToPreviousScreen}>
                <Image source={require('../../../img/icons/cross.png')}/>
              </Touchable>
            </View>
            <View style={{flex: 1, alignItems: 'flex-end'}}>
              <Touchable onPress={this._submit}>
                <Image source={require('../../../img/icons/save.png')}/>
              </Touchable>
            </View>
          </View>

          <View style={{alignItems: 'center', marginBottom: 30}}>
            <Touchable onPress={this._cameraPressHandler}>
              <View style={{height: 125, width: 125, backgroundColor: '#354052', justifyContent: 'center', alignItems: 'center', borderRadius: 2}}>
                {
                  this.state.image_attach
                  ?
                    <Image style={{height: 125, width: 125}} resizeMode="cover" source={{uri: this.state.image_attach.uri}}/>
                  :
                  this.state.avatar !==null?
                    <Image style={{ height: 125, width: 125 }} resizeMode="cover" source={{ uri: this.state.avatar }} />:
                    <Image source={require('../../../img/icons/camera-upload.png')} />
                }
              </View>
            </Touchable>
          </View>


          <TextInput
            placeholder="First Name"
            value={this.state.firstName}
            onChangeText={(firstName) =>  this.setState({firstName})}/>
          <TextInput
            placeholder="Last Name"
            value={this.state.lastName}
            onChangeText={(lastName) =>  this.setState({lastName})}/>

          <View style={{height: 30}}/>

          <TextInput
            placeholder="Phone Number"
            value={this.state.phone}
            onChangeText={(phone) =>  this.setState({phone})}/>
          <TextInput
            placeholder="Email"
            value={this.state.email}
            onChangeText={(email) =>  this.setState({email})}/>
          {/* <TextInput
            placeholder="Location"
            value={this.state.location}
            onChangeText={(location) =>  this.setState({location})}/> */}

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
  topButtonContainer: {
    flexDirection: 'row',
    height: 80,
    paddingLeft: 25,
    paddingRight: 10,
    paddingTop: 20,
    paddingBottom: 10
  },
  textField: {
    backgroundColor: '#FFFFFF',
    fontSize: 17,
    color: 'rgba(0, 0, 0, 0.73)',
  },
  picker: {
    height: 44,
    backgroundColor: '#FFFFFF',
    paddingRight: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.2)'
  },
  pickerText: {
    fontSize: 17,
    color: 'rgba(0, 0, 0, 0.73)'
  },
  safeAreaView:{
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center' 
  },
  safeAreaImage: {
    marginTop: 3,
    marginLeft: 110,
    width: 35,
    height: 35
  },
  safeAreaText: {
    marginLeft: 5,
    marginTop: 3,
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '600'
  } 
});

function mapStateToProps(state) {
  return {
    currentUser: state.user
  }
}

export default connect(mapStateToProps, {updateProfile})(MyInfoScreen)
