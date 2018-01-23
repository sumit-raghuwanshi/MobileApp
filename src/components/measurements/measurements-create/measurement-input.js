import React, {Component} from 'react';
import {
  StyleSheet,
  TextInput as NativeTextInput,
  View,
  Text
} from 'react-native';

class MeasurementInput extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <View style={styles.labelContainer}>
            <Text numberOfLines={1} style={styles.label}>{this.props.label}</Text>
          </View>
          <NativeTextInput
            {...this.props}
            style={styles.textInputField}
            />
        </View>
        <View style={styles.unitContainer}>
          <Text style={styles.label}>{this.props.unit}</Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    height: 44,
    flexDirection: 'row'
  },
  inputContainer: {
    flexDirection: 'row',
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingLeft: 15
  },
  labelContainer: {
    flex: 1,
    justifyContent: 'center'
  },
  label: {
    fontSize: 17,
    color: 'rgba(0, 0, 0, 0.73)',
  },
  textInputField: {
    flex: 1,
    paddingRight: 10,
    fontSize: 17,
    color: 'rgba(0, 0, 0, 0.73)',
    textAlign: 'right'
  },
  unitContainer: {
    width: 50,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default MeasurementInput
