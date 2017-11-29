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
import { Touchable, Picker, DateTimePicker } from '../common';

class TaskEdit extends Component {
  static navigatorStyle = {
    navBarHidden: true
  }

  constructor(props) {
    super(props)

    this.state = {
      to: "",
      subject: "",
      messageBody: ""
    }
  }

  _navigateToDashboard = () => {
    this.props.navigator.popToRoot()
  }

  _navigateToPreviousScreen = () => {
    this.props.navigator.pop()
  }

  _onItemPress = (item) => {

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

            </View>
          </View>

          <View style={styles.messageHeaders}>
            <View style={styles.messageHeaderItem}>
              <TextInput
                placeholder="Title"
                style={styles.messageHeaderItemText}
                value={this.state.title}
                onChangeText={(title) =>  this.setState({title})}/>
            </View>
            <View style={styles.messageHeaderSeperator}></View>
            <View style={styles.messageHeaderItem}>
              <DateTimePicker
                mode={"time"}
                is24Hour={false}
                style={styles.picker}
                placeholder="Select Date/Time"
                textStyle={styles.pickerText}
                format={'MMM DD, YYYY       h:mma'}
                value={this.state.checkinTime}
                onConfirm={(checkinTime) => this.setState({checkinTime})}
                />
            </View>
          </View>

          <View style={{ height: 44, backgroundColor: '#FFFFFF', paddingLeft: 15, marginTop: 26, }}>
            <Picker
              placeholder="Assign to"
              placeholderTextColor="#BFBFBF"
              style={styles.picker}
              textStyle={styles.pickerText}
              selectedValue={this.state.customer}
              onValueChange={(customer) => this.setState({customer})}
              items={[{label: 'customer', value: 'customer'}]}
              />
          </View>

          <View style={styles.messageBody}>
            <TextInput
              placeholder="Type your text here..."
              multiline={true}
              style={styles.messageBodyText}
              value={this.state.messageBody}
              onChangeText={(messageBody) =>  this.setState({messageBody})}/>
          </View>

          <View style={styles.footer}>
            <Touchable onPress={() => {}}>
              <View style={{ alignItems: 'center' }}>
                <Image source={require('../../../img/icons/checkbox_checked.png')}/>
                <Text style={{ fontSize: 14, fontWeight: '500', color: '#999999', marginTop: 5 }}>Task Completed</Text>
              </View>
            </Touchable>
            <Touchable onPress={() => {}}>
              <View style={{ alignItems: 'center' }}>
                <Image source={require('../../../img/icons/bin.png')}/>
                <Text style={{ fontSize: 14, fontWeight: '500', color: '#999999', marginTop: 5 }}>Delete Task</Text>
              </View>
            </Touchable>
          </View>

        </View>

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

export default TaskEdit
