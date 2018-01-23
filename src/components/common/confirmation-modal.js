import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions
} from 'react-native';
import {
  Touchable
} from './';
const {height, width} = Dimensions.get('window');


class ConfirmationModal extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.modal}>
          <View style={styles.iconContainer}>
            {this.props.icon}
          </View>
          <Text style={styles.messageText}>{this.props.message}</Text>
          <View style={styles.buttonContainer}>
            <Touchable
              onPress={this.props.onCancelPress}>
              <View style={[styles.button, styles.whiteButton]}>
                <Text style={[styles.buttonText, styles.whiteButtonText]}>{this.props.cancelText ? this.props.cancelText : "CANCEL"}</Text>
              </View>
            </Touchable>
            <Touchable
              onPress={this.props.onConfirmPress}>
              <View style={[styles.button, styles.greyButton]}>
                <Text style={[styles.buttonText, styles.greyButtonText]}>{this.props.confirmText ? this.props.confirmText : "CONFIRM"}</Text>
              </View>
            </Touchable>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    height,
    width,
    backgroundColor: 'transparent',
    justifyContent: 'center'
  },
  modal: {
    marginHorizontal: 15,
    backgroundColor: 'white',
    shadowOffset: {width: 1, height: 4},
    shadowOpacity: 0.2,
    shadowColor: '#000000',
    shadowRadius: 3,
    paddingVertical: 20,
    paddingHorizontal: 30
  },
  messageText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#919599',
    textAlign: 'center'
  },
  iconContainer: {
    alignItems: 'center',
    marginBottom: 20
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 15
  },
  button: {
    borderColor: '#919599',
    borderWidth: 1,
    borderRadius: 4,
    paddingVertical: 4,
    paddingHorizontal: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5
  },
  buttonText: {
    fontSize: 14,
    fontWeight: 'bold'
  },
  whiteButton: {
    backgroundColor: '#FFFFFF'
  },
  whiteButtonText: {
    color: "#919599"
  },
  greyButton: {
    backgroundColor: '#919599',
  },
  greyButtonText: {
    color: "#FFFFFF"
  }
})

export default ConfirmationModal
