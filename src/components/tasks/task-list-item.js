import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image
} from 'react-native';
import { Touchable } from '../common';
import { Format } from '../../helpers';
import {connect} from 'react-redux';
const TASK_STATUS = { COMPLETE: "completed", INCOMPLETE: "incomplete"}
import moment from 'moment';

class TaskListItem extends Component {
  render() {
    var {task} = this.props
    var currentUser = this.props.user
    var m = moment

    return (
      <View style={styles.container}>
        <View style={styles.contentContainer}>
          <View style={styles.textContainer}>
            <View style={{flexDirection: 'row', alignItems: 'flex-end'}}>
              <Touchable onPress={() => {}}>
                {
                  task.status == TASK_STATUS.COMPLETE
                  ?
                    <Image source={require('../../../img/icons/checkbox_checked.png')}/>
                  :
                    <Image source={require('../../../img/icons/checkbox_unchecked.png')}/>
                }

              </Touchable>
              <Touchable onPress={() => {}}>
                <Image style={{marginLeft: 15}} source={require('../../../img/icons/bin.png')}/>
              </Touchable>
            </View>

            <Text style={styles.subject} numberOfLines={1}>{task.name}</Text>
            <Text style={styles.text} numberOfLines={1}>Owner: {task.owner["_id"]["$oid"] == currentUser.id ? "me" : task.owner.first_name + task.owner.last_name}</Text>
            <Text style={styles.text} numberOfLines={1}>Due: {Format.dueDate(task.due_date)}</Text>
          </View>
          <Touchable style={{ alignItems: 'flex-start', width: 50 }} onPress={() => this.props.onPress && this.props.onPress(task)}>
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
    marginLeft: 30,
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

function mapStateToProps(state) {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(TaskListItem)
