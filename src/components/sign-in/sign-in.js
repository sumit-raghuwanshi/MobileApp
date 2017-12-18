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
import Loader from '../common/loader';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../../actions';

class SignIn extends Component {
  static navigatorStyle = {
    navBarHidden: true
  }

  constructor(props) {
    super(props)

    this.state = {
      user: {
        email:    'admin_1@roof-gravy.com',
        password: '12345678'
      },
      loading: false
    };

    this.loginButtonPress = this.loginButtonPress.bind(this);
    this.onEmailChange    = this.onEmailChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
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
    this.setState({
      loading: true
    });

    const { user } = this.state;
    var response = this.props.actions.loginUser(user).then((response) => {
      this.setState({
        loading: false
      }, () => {
        this.props.navigator.resetTo({
          screen: 'roof_gravy.dashboard'
        })
      });

    }).catch((error) => {
      this.setState({
        loading: false
      })
    })
  }

  render() {
    const { user: { email, password } } = this.state;

    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content"/>

        <Image style={styles.background} source={require("../../../img/login/login-bg.png")} />
        <View style={styles.formContainer}>

          <View style={styles.imageContainer}>
            <Image source={require("../../../img/logo.png")}/>
          </View>

          <TextInput
            placeholder="User Name"
            placeholderTextColor="#4D4D4D"
            autoCapitalize="none"
            style={styles.inputField}
            value={email}
            underlineColorAndroid={"transparent"}
            onChangeText={this.onEmailChange}/>

          <View style={{ height: 16 }} />

          <TextInput
            secureTextEntry={true}
            placeholder="Password"
            placeholderTextColor="#4D4D4D"
            style={styles.inputField}
            value={password}
            underlineColorAndroid={"transparent"}
            onChangeText={this.onPasswordChange}/>

          <View style={{ height: 15 }} />

          <View style={styles.buttonContainer}>
            <View style={{ flex: 1 }}/>
            <TouchableOpacity onPress={this.loginButtonPress} style={styles.button}>
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
          </View>

        </View>
        <Loader loading={this.state.loading}/>
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

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
