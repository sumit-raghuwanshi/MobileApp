import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  StatusBar
} from 'react-native';

export default class App extends Component<{}> {
  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content"/>

        <Image style={styles.background} source={require("./img/login/login-bg.png")} />
        <View style={styles.formContainer}>

          <View style={styles.imageContainer}>
            <Image source={require("./img/logo.png")}/>
          </View>

          <TextInput
            placeholder="User Name"
            placeholderTextColor="#4D4D4D"
            style={styles.inputField} />

          <View style={{ height: 16 }} />

          <TextInput
            placeholder="Password"
            placeholderTextColor="#4D4D4D"
            style={styles.inputField} />

          <View style={{ height: 15 }} />

          <View style={styles.buttonContainer}>
            <View style={{ flex: 1 }}/>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
          </View>

        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  background: {
    position: "absolute"
  },
  formContainer: {
    height: 345.6,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    paddingHorizontal: 22.05,
    justifyContent: 'center'
  },
  imageContainer: {
    alignItems: 'center'
  },
  inputField: {
    height: 30,
    backgroundColor: '#FFFFFF',
    color: '#4D4D4D',
    fontSize: 14,
    paddingHorizontal: 10
  },
  buttonContainer: {
    flexDirection: 'row'
  },
  button: {
    height: 30,
    backgroundColor: '#E88A18',
    paddingHorizontal: 28,
    justifyContent: 'center'
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
