import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image
} from 'react-native';
import { Touchable } from '../common';

class MeasurementNameListItem extends Component {
  render() {
    var message = this.props.message

    return (
      <Touchable style={styles.container}
        onPress={() => this.props.onPress && this.props.onPress(message)}>
        <View style={styles.contentContainer}>
          <View style={styles.textContainer}>
            <Text style={styles.title}>{"Measurement"} {message.id}</Text>
          </View>
          <View style={{ alignItems: 'flex-end' }}>
            <View style={{flex: 1, justifyContent: 'center'}}>
              <Image source={require('../../../img/icons/chevron.png')}/>
            </View>
          </View>
        </View>
      </Touchable>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    height: 50,
    backgroundColor: 'white'
  },
  contentContainer: {
    flex: 1,
    flexDirection: 'row',
    marginHorizontal: 15,
    paddingVertical: 15,
    borderBottomColor: 'rgba(0, 0, 0, 0.2)',
    borderBottomWidth: 1
  },
  title: {
    color: 'rgba(0, 0, 0, 0.6)',
    fontSize: 15
  },
  subject: {
    color: 'rgba(0, 0, 0, 0.6)',
    fontSize: 11
  },
  preview: {
    color: 'rgba(0, 0, 0, 0.6)',
    fontSize: 11,
    marginLeft: 10
  },
  textContainer: {
    flex: 1,
    justifyContent:'center'
  }
});

export default MeasurementNameListItem
