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
      avatar: currentUser["avatar"]
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

    if (!firstName)
      errorMessages.push('First Name is required')

    if (!lastName)
      errorMessages.push('Last Name is required')

    if (!phone)
      errorMessages.push('Phone is required')

    if (!email)
      errorMessages.push('Email is required')

    if (!location)
      errorMessages.push('Location is required')

    if (errorMessages.length > 0) {
      Notification.error(_.join(errorMessages, "\n"))

      return
    }

    this.setState({loading: true})
    var params = new FormData()
    params.append("user[first_name]", firstName)
    params.append("user[last_name]", lastName)
    params.append("user[phone]", phone)
    params.append("user[email]", email)
    params.append("user[location]", location)

    if (image_attach && image_attach.uri) {
      params.append("user[avatar_attributes][data]", {
        uri: image_attach.uri,
        name: "profile_picture.jpg",
        type: "image/jpg"
      })

      // params.append("user[avatar_attributes][data][uri]", this.state.image_attach.uri)
      // params.append("user[avatar_attributes][data][name]", "profile_picture")
      // params.append("user[avatar_attributes][data][type]", this.state.image_attach.type ? this.state.image_attach.type : "image/jpg")
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

    this.props.updateProfile(params)
    .then((response) => {
      console.log("Success===>",params)
      this.setState({loading: false}, this._navigateToPreviousScreen)
    })
    .catch((error) => {
      console.log("Failure ==> ",error)
      this.setState({loading: false})
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

  render() {
    console.log("Hello -- > " + JSON.stringify(this.props.currentUser))
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content"/>

        <SafeAreaView style={styles.header}>
          <Touchable style={{ width: 50, alignItems: 'center', justifyContent: 'center' }} onPress={this._navigateToDashboard}>
            <Image source={require('../../../img/icons/home.png')} />
          </Touchable>
          <View style={{ flex: 1, alignItems: 'center' }}>
            <Text style={{ fontSize: 16, color: '#FFFFFF', fontWeight: '600' }}>My Info</Text>
            <Image style={{ marginTop: 10 }} source={require('../../../img/icons/settings.png')}/>
          </View>
          <Touchable style={{ width: 50, alignItems: 'center', justifyContent: 'center' }}>
            <View></View>
          </Touchable>
        </SafeAreaView>

        <ScrollView style={styles.body} contentContainerStyle={{paddingBottom: 20}}>
          <View style={styles.topButtonContainer}>
            <View style={{ flex: 1 }}>
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
          <TextInput
            placeholder="Location"
            value={this.state.location}
            onChangeText={(location) =>  this.setState({location})}/>

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
  }
});

function mapStateToProps(state) {
  return {
    currentUser: state.user
  }
}

export default connect(mapStateToProps, {updateProfile})(MyInfoScreen)
