import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  ActivityIndicator
} from 'react-native';

class Loader extends Component {
  render() {
    return (
      this.props.loading ?
        <ActivityIndicator
          size={'large'}
          animating={true}
          style={styles.container}/>
      : null
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  }
});
export { Loader }
export default Loader
