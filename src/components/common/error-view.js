'use strict'

import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions
} from 'react-native';
var {height, width} = Dimensions.get('window');
import _ from 'lodash';

class ErrorView extends Component {
  render() {
    var messageText = this.props.message

    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{messageText}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: width,
    backgroundColor: 'red',
    flex: 1,
    paddingTop: 20,
    paddingBottom: 5,
    paddingHorizontal: 20,
    justifyContent: 'center',
    minHeight: 80
  },
  errorText: {
    fontSize: 14,
    // fontFamily: 'Open Sans',
    fontWeight: '600',
    color: '#FFFFFF'
  }
});

export { ErrorView }
