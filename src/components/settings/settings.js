import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  TextInput,
  SafeAreaView,
  StatusBar,
  Image,
  AsyncStorage
} from 'react-native';
import { Touchable, Picker, TouchableField } from '../common';

class Settings extends Component {
  static navigatorStyle = {
    navBarHidden: true
  }

  constructor(props) {
    super(props)

    this.state = {

    }
  }

  _navigateToDashboard = () => {
    this.props.navigator.popToRoot()
  }

  _navigateToPreviousScreen = () => {
    this.props.navigator.pop()
  }

  _onItemPress = (item) => {

  }

  _navigateToMyInfoScreen = () => {
    this.props.navigator.push({
      screen: "roof_gravy.my_info"
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content"/>

        <SafeAreaView style={styles.header}>
          <Touchable style={{ width: 50, alignItems: 'center', justifyContent: 'center' }} onPress={this._navigateToDashboard}>
            <Image source={require('../../../img/icons/home.png')} />
          </Touchable>
          <View style={{ flex: 1, alignItems: 'center' }}>
            <Text style={{ fontSize: 16, color: '#FFFFFF', fontWeight: '600' }}>Settings</Text>
            <Image style={{ marginTop: 10 }} source={require('../../../img/icons/settings.png')}/>
          </View>
          <Touchable style={{ width: 50, alignItems: 'center', justifyContent: 'center' }}>
            <View></View>
          </Touchable>
        </SafeAreaView>

        <ScrollView style={styles.body}>
          <View style={styles.topButtonContainer}></View>

          <View>

            <View style={{backgroundColor: '#FFFFFF', paddingLeft: 15}}>
              <Picker
                placeholder="Image Upload Quality"
                placeholderTextColor="#BFBFBF"
                style={styles.picker}
                textStyle={styles.pickerText}
                selectedValue={this.state.imageUploadQuality}
                onValueChange={(imageUploadQuality) => this.setState({imageUploadQuality})}
                items={[{label: 'Image Upload Quality', value: 'Image Upload Quality'}]}
                />
            </View>
          </View>

          <View style={{marginTop: 12}}>

            <View style={{backgroundColor: '#FFFFFF', paddingLeft: 15}}>
              <Picker
                placeholder="Location Settings"
                placeholderTextColor="#BFBFBF"
                style={styles.picker}
                textStyle={styles.pickerText}
                selectedValue={this.state.locationSettings}
                onValueChange={(locationSettings) => this.setState({locationSettings})}
                items={[{label: 'Location Settings', value: 'Location Settings'}]}
                />
            </View>
          </View>

          <View style={{marginTop: 12}}>
            <TouchableField
              onPress={this._navigateToMyInfoScreen}
              selectedValue="Edit My Info"
              />
          </View>

          <View style={{marginTop: 12}}>
            <Touchable
              style={{ height: 44, backgroundColor: '#FFFFFF', paddingLeft: 15 }}
              onPress={() => {
                AsyncStorage.clear(() => {
                  this.props.navigator.resetTo({
                    screen: 'roof_gravy.login_screen'
                  })
                })
              }}>
              <View style={{ flex: 1, justifyContent: 'center', borderBottomWidth: 1, borderBottomColor: 'rgba(0, 0, 0, 0.2)'}}>
                <Text style={styles.textField}>{'Logout'}</Text>
              </View>
            </Touchable>

          </View>

        </ScrollView>
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

export default Settings
