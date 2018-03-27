import React, { Component } from 'react';
import {
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

class ForgotPassword extends Component {
    static navigatorStyle = {
        navBarHidden: true
    }

    constructor(props) {
        super(props)

        this.state = {
            email: '',
            loading: false
        };

        this.goToLoginScreen = this.goToLoginScreen.bind(this);
        this.onForgotSubmitButtonClicked =  this.onForgotSubmitButtonClicked.bind(this)
        this.onEmailChange = this.onEmailChange.bind(this)
    }
    onEmailChange(email) {
        console.log("Hello"+email)
        this.setState({ 
            email: email
        });
    }


    goToLoginScreen = () => {
        this.props.navigator.resetTo({
            screen: 'roof_gravy.login_screen'
        })
    }
    onForgotSubmitButtonClicked(){
        this.setState({
            loading: true
        });
        

        var data= {
            user:{
                email:this.state.email
            }
        }
       
        var response = this.props.actions.forgotPasswordAction(data)
            .then((response) => {
                console.log("---Succees "+JSON.stringify(response))
                this.setState({
                    loading: false
                }, () => {
                    this.props.navigator.resetTo({
                        screen: 'roof_gravy.login_screen'
                    })
                });
            }).catch((error) => {
                console.log("Error "+ JSON.stringify(error))
                this.setState({
                    loading: false
                })
            })
    }

    render() {
        const {email} = this.state;

        return (
            <View style={styles.container}>
                <StatusBar barStyle="light-content" />

                <Image resizeMode={"stretch"} style={styles.background} source={require("../../../img/login/login-bg.png")} />
                <View style={styles.formContainer}>

                    <View style={styles.imageContainer}>
                        <Image source={require("../../../img/logo.png")} />
                    </View>

                    <TextInput
                        placeholder="Enter email"
                        placeholderTextColor="#4D4D4D"
                        autoCapitalize="none"
                        style={styles.inputField}
                        value={email}
                        underlineColorAndroid={"transparent"}
                        onChangeText={this.onEmailChange} />

                    <View style={{ height: 16 }} />

                    <View style={styles.buttonContainer}>
                       
                        <TouchableOpacity onPress={this.onForgotSubmitButtonClicked} style={styles.button}>
                            <Text style={styles.buttonText}>Submit</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={this.goToLoginScreen} style={styles.button}>
                            <Text style={styles.buttonText}>Go To Login</Text>
                        </TouchableOpacity>
                    </View>

                </View>
                <Loader loading={this.state.loading} />
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
        flexDirection: 'column'
    },
    button: {
        margin:5,
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

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);
