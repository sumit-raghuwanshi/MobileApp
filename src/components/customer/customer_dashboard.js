import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  SafeAreaView,
  AsyncStorage,
  StatusBar
} from 'react-native';
import COLOR from '../../constants/colors';
import Touchable from '../common/touchable';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {getProfile} from '../../actions';
import { Loader } from '../common';
import { Dimensions } from 'react-native'

let hasNavigated = false
class CustomerDashboard extends Component {

  static navigatorStyle = {
    navBarHidden: true
  }


  constructor(props){
    super(props)
    this.state = {
      loading: false,
      isLandscap: (Dimensions.get('window').width > Dimensions.get('window').height),
    }
    hasNavigated = false
    console.disableYellowBox = true;
  }

  componentWillMount() {
    this.props.getProfile()
  }



 
  // _navigateToCalendarScreen = () => {
  //   this.props.navigator.push({
  //     screen: "roof_gravy.calendar"
  //   })
  // }

 
  _navigateToJobsScreen = () => {
    this.props.navigator.push({
      screen: "roof_gravy.jobs"
    })
  }

  _navigateToSettingsScreen = () => {
    this.props.navigator.push({
      screen: "roof_gravy.settings"
    })
  }

  _navigateToCalendar = (e) => {
    if(!hasNavigated){
      this.props.navigator.push({
        screen: "roof_gravy.big-calendar-screen",
        passProps: {user : this.props.user}
      })
      hasNavigated = true
    }
  }

  onLayout(){
    this.setState({
      isLandscap: (Dimensions.get('window').width > Dimensions.get('window').height),
    })
  }

  render() {
    var user = this.props.user
    // console.log("Dashboard screen --> "+JSON.stringify(user))
    

    return (
      <View style={styles.container} onLayout = {this.onLayout.bind(this)}>
        <StatusBar barStyle="light-content"/>
        <View style={styles.background}>
          <Image
            resizeMode="stretch"
            style={{
              flex: 1,
              width: "100%"
            }}
            source={require('../../../img/dashboard/bg.png')} />

          <SafeAreaView style={styles.backgroundContentContainer}>
            <View style={styles.logoContainer}>
              <Image source={require('../../../img/dashboard/logo.png')}/>
            </View>

            <View style={{height: 15}}></View>

            <View style={styles.imageContainer}>
              <View style={styles.circleContainer}>
                <Image
                  style={this.state.isLandscap ? styles.imageCircle : {}}
                  source={require('../../../img/dashboard/circle.png')}/>
                  {user.avatar !== "" && user.avatar !== null ?
                  <Image
                    style={{
                      position: 'absolute',
                      alignSelf: 'center',
                      height: 100, width: 100,
                      borderRadius:100,
                    }}
                    source={{uri: user.avatar}} />:
                  <Image
                    style={{
                      position: 'absolute',
                      alignSelf: 'center',
                      width: (this.state.isLandscap? 50 : 100) , height: (this.state.isLandscap ? 50 : 100)
                    }}
                    source={require('../../../img/dashboard/profile.png')} />
                  }
              </View>
            </View>
            <View style={styles.userNameContainer}>
              <Text style={styles.userNameText}>{user.first_name + " " + user.last_name}</Text>
            </View>
          </SafeAreaView>
        </View>

        <View style={styles.bottomButtonContainer}>
          <View style={styles.bottomButtonRow}>
            <Touchable onPress={this._navigateToCalendar}>
              <Image source={require('../../../img/dashboard/calender-bak.png')}/>
            </Touchable>

            <Touchable onPress={this._navigateToJobsScreen}>
              <Image source={require('../../../img/dashboard/jobs-bak.png')}/>
            </Touchable>

            <Touchable onPress={this._navigateToSettingsScreen}>
              <Image source={require('../../../img/dashboard/settings-customer.png')}/>
            </Touchable>
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
    backgroundColor: 'rgba(194, 185, 165, 0.31)'
  },
  background: {
    flex: 2,
    // backgroundColor: 'pink',
    // padding: 5
  },
  backgroundContentContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  },
  logoContainer: {
    alignItems: 'center'
  },
  imageContainer: {
    alignItems: 'center'
  },
  circleContainer: {
    justifyContent: 'center',
    marginBottom: 22
  },
  userNameContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: 15
  },
  userNameText: {
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center'
  },
  bottomButtonContainer: {
    flex: 1,
    justifyContent: 'center'
  },
  bottomButtonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 50,
  },
  imageCircle: {
    width: 110, 
    height: 110,
  }
});

function mapStateToProps(state, ownProps) {
  return {
    user: state.user
  };
};

export default connect(mapStateToProps, {getProfile})(CustomerDashboard);
