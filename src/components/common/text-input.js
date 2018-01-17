import React, {Component} from 'react';
import {
  StyleSheet,
  TextInput as NativeTextInput,
  View
} from 'react-native';

class TextInput extends Component {
  render() {
    return (
      <View style={styles.container}>
        <NativeTextInput
          {...this.props}
          style={styles.textInputField}
          />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    paddingLeft: 15,
    height: 44,
    backgroundColor: '#FFFFFF',
  },
  textInputField: {
    flex: 1,
    paddingRight: 10,
    fontSize: 17,
    color: 'rgba(0, 0, 0, 0.73)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.2)',
  }
})

export {TextInput}
