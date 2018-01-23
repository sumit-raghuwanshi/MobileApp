import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  Dimensions
} from 'react-native';
import Loader from '../common/loader';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../../actions';

class SignUp extends Component {
  static navigatorStyle = {
    navBarHidden: true
  }

  constructor(props) {
    super(props)

    this.state = {
      user: {
        email:    '',
        password: '',
        first_name: '',
        last_name: '',
        company_name: ''
      },
      loading: false
    };

    this.onEmailChange    = this.onEmailChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
    this.loginButtonPress = this.loginButtonPress.bind(this);
  }

  onEmailChange(email) {
    const { user } = this.state;
    user.email = email;
    this.setState({ user });
  }

  onPasswordChange(password) {
    const { user } = this.state;
    user.password = password;
    this.setState({ user });
  }

  loginButtonPress = () => {
    this.props.navigator.resetTo({
      screen: 'roof_gravy.login_screen'
    })
  }

  render() {
    const { user: { first_name, last_name, email, password, company_name } } = this.state;

    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content"/>

        <Image resizeMode={"stretch"} style={styles.background} source={require("../../../img/login/login-bg.png")} />
        <ScrollView style={{height:screenHeight, width:screenWidth}}>
        <View style={{height:screenHeight, width:screenWidth, justifyContent:'center'}}>
        <View style={styles.formContainer}>

          <View style={styles.imageContainer}>
            <Image source={require("../../../img/logo.png")}/>
          </View>

          <TextInput
            placeholder="First Name"
            placeholderTextColor="#4D4D4D"
            autoCapitalize="none"
            style={styles.inputField}
            value={first_name}
            underlineColorAndroid={"transparent"}
            onChangeText={this.onChange}/>

          <View style={{ height: 16 }} />

          <TextInput
            placeholder="Last Name"
            placeholderTextColor="#4D4D4D"
            style={styles.inputField}
            value={last_name}
            underlineColorAndroid={"transparent"}
            onChangeText={this.onChange}/>

          <View style={{ height: 16 }} />

          <TextInput
            placeholder="Email"
            placeholderTextColor="#4D4D4D"
            autoCapitalize="none"
            style={styles.inputField}
            value={email}
            underlineColorAndroid={"transparent"}
            onChangeText={this.onChange}/>

          <View style={{ height: 16 }} />

          <TextInput
            placeholder="Password"
            secureTextEntry={true}
            placeholderTextColor="#4D4D4D"
            style={styles.inputField}
            value={password}
            underlineColorAndroid={"transparent"}
            onChangeText={this.onChange}/>

          <View style={{ height: 16 }} />

          <TextInput
            placeholder="Company Name"
            placeholderTextColor="#4D4D4D"
            style={styles.inputField}
            value={company_name}
            underlineColorAndroid={"transparent"}
            onChangeText={this.onChange}/>

          <View style={{ height: 15 }} />

          <View style={styles.buttonContainer}>
            <View style={{ flex: 1 }}/>
            <TouchableOpacity onPress={this.signupButtonPress} style={styles.button}>
              <Text style={styles.buttonText}>SignUp</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.loginButtonPress} style={styles.button}>
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
          </View>

        </View>
        </View>
        </ScrollView>
        <Loader loading={this.state.loading}/>
      </View>
    );
  }
}

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  background: {
    position: "absolute",
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    width: undefined,
    height: undefined
  },
  formContainer: {
    height: 470,
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
    paddingHorizontal: 10,
    paddingTop: 0,
    paddingBottom: 0
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

function mapStateToProps(state, ownProps) {
  return {};
};

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
