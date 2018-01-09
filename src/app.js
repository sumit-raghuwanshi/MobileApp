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
import { load } from './reducers/initial-state';
import { registerScreens } from './components';
import KeyboardManager from 'react-native-keyboard-manager'

// KeyboardManager.setToolbarPreviousNextButtonEnable(true);
// KeyboardManager.setShouldResignOnTouchOutside(true);

load((initialState) => {
  const store = configureStore(initialState)
  registerScreens(store, Provider)
  global.store = store

  if (initialState.user)
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
  else
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
})
