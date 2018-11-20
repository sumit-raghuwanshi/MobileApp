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
import { Navigation } from 'react-native-navigation';
import { Provider } from 'react-redux';
import configureStore from './store/configure-store';
import { registerScreens } from './components';
import KeyboardManager from 'react-native-keyboard-manager'
import { persistStore } from 'redux-persist';
import _ from 'lodash'


if (Platform.OS == 'ios') {
  KeyboardManager.setToolbarPreviousNextButtonEnable(true);
  KeyboardManager.setShouldResignOnTouchOutside(true);
}

const store = configureStore()
global.AppStore = store
registerScreens(store, Provider)


let persistor = persistStore(store, null, () => {
  var initialState = store.getState()
  if (!(_.isEmpty(initialState.user))){
    if (initialState.user.role == "Customer"){
      Navigation.startSingleScreenApp({
        screen: {
          screen: 'roof_gravy.customer_dashboard',
          title: 'Welcome',
          navigatorStyle: {},
          navigatorButtons: {}
        },
        passProps: {},
        animationType: 'slide-down'
      });
    }else{
      Navigation.startSingleScreenApp({
        screen: {
          screen: 'roof_gravy.dashboard',
          title: 'Welcome',
          navigatorStyle: {},
          navigatorButtons: {}
        },
        passProps: {},
        animationType: 'slide-down'
      });
    }
  }else{
    Navigation.startSingleScreenApp({
      screen: {
        screen: 'roof_gravy.login_screen',
        title: 'Welcome',
        navigatorStyle: {},
        navigatorButtons: {}
      },
      passProps: {},
      animationType: 'slide-down'
    });
  }
})
