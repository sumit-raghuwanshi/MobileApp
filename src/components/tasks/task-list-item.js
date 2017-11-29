import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image
} from 'react-native';
import { Touchable } from '../common';

class TaskListItem extends Component {
  render() {
    var message = this.props.message

    return (
      <View style={styles.container}>
        <View style={styles.contentContainer}>
          <View style={styles.textContainer}>
            <View style={{flexDirection: 'row', alignItems: 'flex-end'}}>
              <Touchable onPress={() => {}}>
                <Image source={require('../../../img/icons/checkbox_checked.png')}/>
              </Touchable>
              <Touchable onPress={() => {}}>
                <Image style={{marginLeft: 15}} source={require('../../../img/icons/bin.png')}/>
              </Touchable>
            </View>

            <Text style={styles.subject} numberOfLines={1}>{"Call the Customer"}</Text>
            <Text style={styles.text} numberOfLines={1}>Owner: {"me"}</Text>
            <Text style={styles.text} numberOfLines={1}>Due: {"Today"}</Text>
          </View>
          <Touchable style={{ alignItems: 'flex-end', width: 50 }} onPress={() => this.props.onPress && this.props.onPress(message)}>
            <View style={{flex: 1, justifyContent: 'center'}}>
              <Image source={require('../../../img/icons/chevron.png')}/>
            </View>
          </Touchable>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white'
  },
  contentContainer: {
    flex: 1,
    flexDirection: 'row',
    marginHorizontal: 30,
    paddingVertical: 15,
    borderBottomColor: 'rgba(0, 0, 0, 0.2)',
    borderBottomWidth: 1
  },
  title: {
    color: 'rgba(0, 0, 0, 0.6)',
    fontSize: 17
  },
  subject: {
    color: 'rgba(0, 0, 0, 0.7)',
    fontSize: 18,
    marginTop: 7,
    fontWeight: '600'
  },
  text: {
    color: 'rgba(0, 0, 0, 0.6)',
    fontSize: 14,
    fontWeight: '300'
  },
  textContainer: {
    flex: 1,
    paddingRight: 50
  }
});

export default TaskListItem
