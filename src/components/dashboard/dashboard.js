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

class Dashboard extends Component {
  static navigatorStyle = {
    navBarHidden: true
  }

  constructor(props){
    super(props)
    console.disableYellowBox = true;
  }

  componentWillMount() {
    this.props.getProfile()
  }

  _navigateToLeadsCreateScreen = () => {
    this.props.navigator.push({
      screen: 'roof_gravy.lead_create'
    })
  }

  _navigateToCalendarScreen = () => {
    this.props.navigator.push({
      screen: "roof_gravy.calendar"
    })
  }

  _navigateToMessagesScreen = () => {
    this.props.navigator.push({
      screen: "roof_gravy.messages"
    })
  }

  _navigateToTasksScreen = () => {
    this.props.navigator.push({
      screen: "roof_gravy.tasks"
    })
  }

  _navigateToPaymentsScreen = () => {
    this.props.navigator.push({
      screen: "roof_gravy.payments"
    })
  }

  _navigateToMeasurementsCreateScreen = () => {
    this.props.navigator.push({
      screen: "roof_gravy.measurements_create"
    })
  }

  _navigateToEstimatesScreen = () => {
    this.props.navigator.push({
      screen: "roof_gravy.estimate_create"
    })
  }

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

  _navigateToEstimate = () => {
    this.props.navigator.push({
      screen: 'roof_gravy.estimate'
    })
  }

  render() {
    var user = this.props.user
    // console.log("Dashboard screen --> "+JSON.stringify(user))
    

    return (
      <View style={styles.container}>
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
                    }}
                    source={require('../../../img/dashboard/profile.png')} />
                  }
                
                <Touchable
                  style={{
                    position: 'absolute',
                    bottom: 20,
                    left: -10
                  }}
                  onPress={this._navigateToMessagesScreen}>
                  <Image source={require('../../../img/dashboard/message.png')}/>
                </Touchable>
                <Touchable
                  style={{
                    position: 'absolute',
                    alignSelf: 'center',
                    bottom: -22
                  }}
                  onPress={this._navigateToCalendarScreen}>
                  <Image source={require('../../../img/dashboard/calendar.png')}/>
                </Touchable>
                <Touchable
                  style={{
                    position: 'absolute',
                    bottom: 20,
                    right: -10
                  }}
                  onPress={this._navigateToTasksScreen}>
                  <Image source={require('../../../img/dashboard/checkbox.png')}/>
                </Touchable>
              </View>
            </View>
            <View style={styles.userNameContainer}>
              <Text style={styles.userNameText}>{user.first_name + " " + user.last_name}</Text>
            </View>
          </SafeAreaView>
        </View>

        <View style={styles.bottomButtonContainer}>
          <View style={styles.bottomButtonRow}>

            <Touchable onPress={this._navigateToLeadsCreateScreen}>
              <Image source={require('../../../img/dashboard/lead.png')}/>
            </Touchable>

            <Touchable onPress={this._navigateToMeasurementsCreateScreen}>
              <Image source={require('../../../img/dashboard/measurement.png')}/>
            </Touchable>

            <Touchable onPress={this._navigateToEstimatesScreen}>
              <Image source={require('../../../img/dashboard/estimate.png')}/>
            </Touchable>

          </View>

          <View style={{height: 10}}></View>

          <View style={styles.bottomButtonRow}>

            <Touchable onPress={this._navigateToPaymentsScreen}>
              <Image source={require('../../../img/dashboard/payment.png')}/>
            </Touchable>

            <Touchable onPress={this._navigateToJobsScreen}>
              <Image source={require('../../../img/dashboard/job.png')}/>
            </Touchable>

            <Touchable onPress={this._navigateToSettingsScreen}>
              <Image source={require('../../../img/dashboard/settings.png')}/>
            </Touchable>

          </View>
        </View>
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
  }
});

function mapStateToProps(state, ownProps) {
  return {
    user: state.user
  };
};

export default connect(mapStateToProps, {getProfile})(Dashboard);
