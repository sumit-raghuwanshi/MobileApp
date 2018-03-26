import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  TextInput,
  SafeAreaView,
  StatusBar,
  Image
} from 'react-native';
import { Touchable, Picker, DateTimePicker, Loader } from '../common';
import {getUserList, createTask} from '../../actions';
import {connect} from 'react-redux';
import {Notification} from '../../helpers';
import _ from 'lodash';
const TASK_STATUS = { COMPLETE: "completed", INCOMPLETE: "incomplete"}

class TaskCreate extends Component {
  static navigatorStyle = {
    navBarHidden: true
  }

  constructor(props) {
    super(props)

    this.state = {
      loading: true
    }
  }

  componentDidMount() {
    this.props.getUserList()
    .then((response) => {
      this.setState({loading: false})
    })
    .catch((error) => {
      this.setState({loading: false})
    })
  }

  _navigateToDashboard = () => {
    this.props.navigator.popToRoot()
  }

  _navigateToPreviousScreen = () => {
    this.props.navigator.pop()
  }

  _onSubmit = () => {
    var {name, due_date, assignee_id, notes} = this.state
    var errorMessages = []

    if (!name)
      errorMessages.push('Title is required')

    if (!due_date)
      errorMessages.push('Due Date Name is required')

    if (!assignee_id)
      errorMessages.push('Assignee is required')

    if (!notes)
      errorMessages.push('Notes are required')

    if (errorMessages.length > 0) {
      Notification.error(_.join(errorMessages, "\n"))

      return
    }

    this.setState({loading: true})

    var params = {
      "task": {
        "name": name,
        "assignee": assignee_id,
        "due_date": due_date,
        "notes": notes,
      }
    }

    this.props.createTask(params)
    .then((response) => {
      this.setState({loading: false}, this._navigateToPreviousScreen)
    })
    .catch((error) => {
      this.setState({loading: false})
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content"/>

        <SafeAreaView style={styles.header}>
          <Touchable style={{ width: 50, alignItems: 'center', justifyContent: 'center' }} onPress={this._navigateToDashboard}>
            <Image source={require('../../../img/icons/home.png')} />
          </Touchable>
          <View style={{ flex: 1, alignItems: 'center' }}>
            <Text style={{ fontSize: 16, color: '#FFFFFF', fontWeight: '600' }}>TASKS</Text>
            <Image style={{ marginTop: 10 }} source={require('../../../img/icons/tasks.png')}/>
          </View>
          <Touchable style={{ width: 50, alignItems: 'center', justifyContent: 'center' }}>
            <View></View>
          </Touchable>
        </SafeAreaView>

        <View style={styles.body}>
          <View style={styles.topButtonContainer}>
            <View style={{ flex: 1 }}>
              <Touchable onPress={this._navigateToPreviousScreen}>
                  <Image source={require('../../../img/icons/cross.png')}/>
              </Touchable>
            </View>
            <View style={{flex: 1, alignItems: 'flex-end'}}>
              <Touchable onPress={this._onSubmit}>
                <Image source={require('../../../img/icons/save.png')}/>
              </Touchable>
            </View>
          </View>

          <View style={styles.messageHeaders}>
            <View style={styles.messageHeaderItem}>
              <TextInput
                placeholder="Title"
                style={styles.messageHeaderItemText}
                value={this.state.name}
                onChangeText={(name) => this.setState({name})}/>
            </View>
            <View style={styles.messageHeaderSeperator}></View>
            <View style={styles.messageHeaderItem}>
              <DateTimePicker
                mode={"datetime"}
                is24Hour={false}
                style={styles.picker}
                placeholder="Due Date"
                placeholderTextColor="#BFBFBF"
                textStyle={styles.pickerText}
                format={'MMM DD, YYYY       h:mma'}
                value={this.state.due_date}
                onConfirm={(due_date) => this.setState({due_date})}
                />
            </View>
          </View>

          <View style={{ height: 44, backgroundColor: '#FFFFFF', paddingLeft: 15, marginTop: 26 }}>
            <Picker
              placeholder="Assign To"
              placeholderTextColor="#BFBFBF"
              style={styles.picker}
              textStyle={styles.pickerText}
              selectedValue={this.state.assignee_id}
              onValueChange={(assignee_id) => this.setState({assignee_id})}
              items={_.map(this.props.users, (user) => ({ label: user.first_name + " " + user.last_name, value: user.id }))}
              />
          </View>

          <View style={styles.messageBody}>
            <TextInput
              placeholder="Type your text here..."
              multiline={true}
              style={styles.messageBodyText}
              value={this.state.notes}
              onChangeText={(notes) =>  this.setState({notes})}/>
          </View>

          <View style={styles.footer}>

          </View>

        </View>
        <Loader loading={this.state.loading}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(194, 185, 165, 0.31)'
  },
  header: {
    flexDirection: 'row',
    height: 66,
    backgroundColor: '#354052',
    zIndex: 1
  },
  body: {
    flex: 1
  },
  topButtonContainer: {
    flexDirection: 'row',
    height: 80,
    paddingLeft: 25,
    paddingRight: 10,
    paddingTop: 20,
    paddingBottom: 10
  },
  messageHeaders: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20
  },
  messageHeaderItem: {
    height: 44,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center'
  },
  messageHeaderItemText: {
    fontSize: 17,
    color: 'rgba(0, 0, 0, 0.73)'
  },
  picker: {
    height: 44,
    backgroundColor: '#FFFFFF',
    paddingRight: 10
  },
  pickerText: {
    fontSize: 17,
    color: 'rgba(0, 0, 0, 0.73)'
  },
  messageHeaderSeperator: {
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    height: 1
  },
  messageBody: {
    marginTop: 26,
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 15,
    paddingVertical: 15
  },
  messageBodyText: {
    flex: 1,
    fontSize: 17,
    color: 'rgba(0, 0, 0, 0.73)',
    lineHeight: 25
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-around',
    height: 122,
    paddingHorizontal: 50,
    paddingBottom: 30
  }
});

function mapStateToProps(state) {
  return {
    users: state.users
  }
}

export default connect(mapStateToProps, {getUserList, createTask})(TaskCreate)
