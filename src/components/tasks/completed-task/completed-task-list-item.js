import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image
} from 'react-native';
import { Touchable } from '../../common';

class CompletedTaskListItem extends Component {
  render() {
    var message = this.props.message

    return (
      <Touchable style={styles.container}
        onPress={() => this.props.onPress && this.props.onPress(message)}>
        <View style={styles.contentContainer}>
          <View style={styles.textContainer}>
            <View style={{height:20, flexDirection:'row', marginBottom:5}}>
                <Touchable>
                    <Image source={require('../../../../img/tasks/check-box-black.png')} style={{height:20, width:20, marginRight:10}}/>
                </Touchable>
                <Touchable>
                    <Image source={require('../../../../img/tasks/trash.png')} style={{height:20, width:20}}/>
                </Touchable>
            </View>
            <Text style={styles.title}>{"Call the customer"}</Text>
            <Text style={styles.subject}>{"Owner: me"}</Text>
            <Text style={styles.preview}>{"Due: Today"}</Text>
          </View>
          <View style={{ alignItems: 'flex-end' }}>
            <View style={{flex: 1, justifyContent: 'center'}}>
              <Image source={require('../../../../img/icons/chevron.png')}/>
            </View>
          </View>
        </View>
      </Touchable>
    )
  }
}

const styles = StyleSheet.create({
    container: {
        height: 105,
        backgroundColor: 'white'
      },
      contentContainer: {
        flex: 1,
        flexDirection: 'row',
        marginHorizontal: 25,
        paddingVertical: 15,
        borderBottomColor: 'rgba(0, 0, 0, 0.2)',
        borderBottomWidth: 1
      },
      title: {
        color: 'rgba(0, 0, 0, 0.6)',
        fontSize: 17,
        fontWeight: '500',
        marginBottom:2
      },
      subject: {
        color: 'rgba(0, 0, 0, 0.6)',
        fontSize: 11,
        marginBottom:2

      },
      preview: {
        color: 'rgba(0, 0, 0, 0.6)',
        fontSize: 11,
        marginBottom:2
      },
      textContainer: {
        flex: 1,
        paddingRight: 50
      }
});

export default CompletedTaskListItem
