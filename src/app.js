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
import SignIn from './components/sign-in/sign-in';
import Dashboard from './components/dashboard/dashboard';

load((initialState) => {
  const store = configureStore(initialState);
  global.store = store
  Navigation.registerComponent('roof_gravy.login_screen', () => SignIn, store, Provider);
  Navigation.registerComponent('roof_gravy.dashboard', () => Dashboard, store, Provider);

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
