import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  SafeAreaView,
  AsyncStorage
} from 'react-native';
import COLOR from '../../constants/colors';
import Touchable from '../common/touchable';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as AuthenticationActions from '../../actions/authentication';

class Dashboard extends Component {
  static navigatorStyle = {
    navBarHidden: true
  }

  render() {
    var user = this.props.user

    return (
      <View style={styles.container}>
        <View style={styles.background}>
          <Image
            resizeMode="stretch"
            style={{
              flex: 1,
              width: undefined,
              // height: undefined,
              // backgroundColor: 'blue'
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
                <Image
                  style={{
                    position: 'absolute',
                    alignSelf: 'center',
                  }}
                  source={require('../../../img/dashboard/profile.png')}/>
                <Touchable
                  style={{
                    position: 'absolute',
                    bottom: 20,
                    left: -10
                  }}
                  onPress={() => {}}>
                  <Image source={require('../../../img/dashboard/message.png')}/>
                </Touchable>
                <Touchable
                  style={{
                    position: 'absolute',
                    alignSelf: 'center',
                    bottom: -22
                  }}
                  onPress={() => {}}>
                  <Image source={require('../../../img/dashboard/calendar.png')}/>
                </Touchable>
                <Touchable
                  style={{
                    position: 'absolute',
                    bottom: 20,
                    right: -10
                  }}
                  onPress={() => {}}>
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

            <Touchable onPress={() => {}}>
              <Image source={require('../../../img/dashboard/lead.png')}/>
            </Touchable>

            <Touchable onPress={() => {}}>
              <Image source={require('../../../img/dashboard/measurement.png')}/>
            </Touchable>

            <Touchable onPress={() => {}}>
              <Image source={require('../../../img/dashboard/estimate.png')}/>
            </Touchable>

          </View>

          <View style={{height: 10}}></View>

          <View style={styles.bottomButtonRow}>

            <Touchable onPress={() => {}}>
              <Image source={require('../../../img/dashboard/payment.png')}/>
            </Touchable>

            <Touchable onPress={() => {}}>
              <Image source={require('../../../img/dashboard/job.png')}/>
            </Touchable>

            <Touchable onPress={() => {
              AsyncStorage.clear(() => {
                this.props.navigator.resetTo({
                  screen: 'roof_gravy.login_screen'
                })
              })

            }}>
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
    justifyContent: 'center'
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
    justifyContent: 'center',
    // paddingTop: 20,
    // paddingBottom: 45
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

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(AuthenticationActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
