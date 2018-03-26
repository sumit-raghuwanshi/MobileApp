import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image
} from 'react-native';
import {
  Touchable
} from './';

class TouchableField extends Component {
  render() {
    var {selectedValue, placeholder} = this.props

    return (
      <Touchable onPress={this.props.onPress}>
        <View style={styles.container}>
          <View style={styles.contentContainer}>
            {
              selectedValue ?
                <Text style={styles.pickerText}>{selectedValue}</Text>
              :
                <Text style={styles.placeholderText}>{placeholder}</Text>
            }
            <Image source={require('../../../img/icons/chevron.png')}/>
          </View>
        </View>
      </Touchable>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    paddingLeft: 15,
    height: 44,
    backgroundColor: '#FFFFFF',
  },
  contentContainer: {
    flex: 1,
    paddingRight: 10,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.2)',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  pickerText: {
    fontSize: 17,
    color: 'rgba(0, 0, 0, 0.73)'
  },
  placeholderText: {
    fontSize: 17,
    color: '#BFBFBF'
  }
})

export {TouchableField}
