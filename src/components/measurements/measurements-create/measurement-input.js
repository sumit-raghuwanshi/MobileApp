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
      // <View style={styles.container}>
      //   <View style={styles.inputContainer}>
      //     <View style={styles.labelContainer}>
      //       <Text numberOfLines={1} style={styles.label}>{this.props.label}</Text>
      //     </View>
      //     <NativeTextInput
      //       {...this.props}
      //       style={styles.textInputField}
      //       />
      //   </View>
      //   <View style={styles.unitContainer}>
      //     <Text style={styles.label}>{this.props.unit}</Text>
      //   </View>
      // </View>

      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <View style={styles.labelContainer}>
            <Text numberOfLines={1} style={styles.label}>{`${this.props.label} ${this.props.unit}`}</Text>
          </View>
          <NativeTextInput
            {...this.props}
            style={styles.textInputField}
            underlineColorAndroid = "transparent"
            />
        </View>
        {/* <View style={styles.unitContainer}>
          <Text style={styles.label}>{this.props.unit}</Text>
        </View> */}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    height: 70,
    flexDirection: 'row'
  },
  inputContainer: {
    flexDirection: 'column',
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingLeft: 15,
    paddingRight : 15,
    paddingBottom:5,
    paddingTop: 3
  },
  labelContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems : 'flex-start',
    paddingLeft: 5
  },
  label: {
    fontSize: 17,
    color: 'rgba(0, 0, 0, 0.73)',
    fontWeight : 'bold'
    
  },
  textInputField: {
   
    paddingRight: 10,
    fontSize: 17,
    color: 'rgba(0, 0, 0, 0.73)',
    textAlign: 'right',
    borderWidth : 1,
    borderColor : 'rgba(0, 0, 0, 0.73)',
    paddingTop : 3,
    paddingBottom : 3
    
  },
  unitContainer: {
    width: 50,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default MeasurementInput
