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
  Dimensions
} from 'react-native';
import Loader from '../common/loader';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../../actions';

const width= Dimensions.get('window').width
const height= Dimensions.get('window').height

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
    this.signUpButtonPress = this.signUpButtonPress.bind(this);
    this.onForgotButtonPress = this.onForgotButtonPress.bind(this)
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
    var response = this.props.actions.loginUser(user)
    .then((response) => {
      console.log("============1234=========>"+JSON.stringify(response))
      this.setState({
        loading: false
      }, () => {
        var companyLocations = response.data.company_locations
        var role = response.data.role 
        if (role != "master_admin"){
          if (companyLocations.length === 1) {
          
            this.props.navigator.resetTo({
              screen: 'roof_gravy.dashboard'
            })
  
          }else if(companyLocations.length>1){
            this.props.navigator.resetTo({
              screen: 'roof_gravy.choose_location'
            })
          }
        }else{
          alert("Master admin can't login!")
        }
        

        
      });

    }).catch((error) => {
      this.setState({
        loading: false
      })
    })
  }

  signUpButtonPress = () => {
    this.props.navigator.resetTo({
      screen: 'roof_gravy.signup'
    })
  }
  onForgotButtonPress(){
    this.props.navigator.resetTo({
      screen: 'roof_gravy.forgot_password'
    })
  }

  render() {
    const { user: { email, password } } = this.state;

    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content"/>

        <Image resizeMode={"stretch"} style={styles.background} source={require("../../../img/login/login-bg.png")} />
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
            <TouchableOpacity onPress={this.loginButtonPress} style={styles.buttonLogin}>
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>

            {/* <TouchableOpacity onPress={this.signUpButtonPress} style={styles.button}>
              <Text style={styles.buttonText}>SignUp</Text>
            </TouchableOpacity> */}

            <TouchableOpacity onPress={this.onForgotButtonPress} style={styles.buttonForgetPassword}>
              <Text style={styles.buttonText}>Forgot Password</Text>
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
    position: "absolute",
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    width: undefined,
    height: undefined
  },
  formContainer: {
    height: width,
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
    flexDirection: 'row',
    flex: 1
  
  },
  buttonLogin: {
    // height: 30,
    // backgroundColor: '#E88A18',
    // paddingHorizontal: 28,
    // justifyContent: 'center',
    // margin:5,

    flex: 1,
    height: 30,
    backgroundColor: '#E88A18',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 2
  }, 
  buttonForgetPassword: {
    // height: 30,
    // backgroundColor: '#E88A18',
    // paddingHorizontal: 28,
    // justifyContent: 'center',
    // margin:5,
    flex: 1,
    height: 30,
    backgroundColor: '#E88A18',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 2
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
    justifyContent: 'center',
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
