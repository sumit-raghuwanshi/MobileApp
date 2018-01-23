import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image
} from 'react-native';
import { Touchable } from '../common';
import moment from 'moment';

class MessageListItem extends Component {
  render() {
    var message = this.props.message

    return (
      <Touchable style={styles.container}
        onPress={() => this.props.onPress && this.props.onPress(message)}>
        <View style={styles.contentContainer}>
          <View style={styles.textContainer}>
            <Text style={styles.title}>{message["sender_name"]}</Text>
            <Text style={styles.subject}>{message["subject"] ? message["subject"] : "No Subject"}</Text>
            <Text style={styles.preview} numberOfLines={2}>{message["content"]}</Text>
          </View>
          <View style={{ alignItems: 'flex-end' }}>
            <Text style={{ color: 'rgba(0, 0, 0, 0.3)', fontSize: 12 }}>{moment(message["created_at"]).fromNow()}</Text>
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
    height: 85,
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
    fontSize: 17
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
    paddingRight: 50
  }
});

export default MessageListItem
