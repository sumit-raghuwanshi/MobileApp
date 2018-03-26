import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight
} from 'react-native';

class Touchable extends Component {
  render() {
    return (
      <TouchableHighlight style={this.props.style} underlayColor="transparent" activeOpacity={0.8} onPress={this.props.onPress}>
        {this.props.children}
      </TouchableHighlight>
    );
  }
}

export { Touchable }
export default Touchable
