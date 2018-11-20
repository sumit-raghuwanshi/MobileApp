import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  TextInput,
  SafeAreaView,
  Image,
  StatusBar
} from 'react-native';
import { connect } from 'react-redux';
import {getUserList, createAppointment} from '../../../actions';
import {Notification} from '../../../helpers';
import { Touchable, Picker, DateTimePicker, Loader } from '../../common';
import _ from 'lodash';

class AppointmentCreate extends Component {
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
    var {title, user_id, start_date, end_date, notes} = this.state;

    var errorMessages = []

    if (!title)
      errorMessages.push('Title is required')

    if (!user_id)
      errorMessages.push('Customer is required')

    if (!start_date)
      errorMessages.push('Start Date is required')

    if (!end_date)
      errorMessages.push('End Date is required')

    if (!notes)
      errorMessages.push('Notes are required')

    if (errorMessages.length > 0) {
      Notification.error(_.join(errorMessages, "\n"))

      return
    }

    this.setState({ loading: true })
    var params = {
      "calendar": {
        "title": title,
        "user_id": user_id,
        "start_date": start_date,
        "end_date": end_date,
        "note": notes
      }
    }

    this.props.createAppointment(params)
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
            <Image source={require('../../../../img/icons/home.png')} />
          </Touchable>
          <View style={styles.safeAreaView}>
            <Image style={styles.safeAreaImage} source={require('../../../../img/icons/calendar.png')}/>
            <Text style={styles.safeAreaText}>APPOINTMENT</Text>
          </View>
          <Touchable style={{ width: 50, alignItems: 'center', justifyContent: 'center' }}>
            <View></View>
          </Touchable>
        </SafeAreaView>

        <ScrollView style={styles.body}>

          <View style={styles.buttonContainer}>
            <Touchable onPress={this._navigateToPreviousScreen}>
              <Image source={require('../../../../img/icons/cross.png')} />
            </Touchable>

            <Touchable onPress={this._onSubmit}>
              <Image source={require('../../../../img/icons/save.png')} />
            </Touchable>
          </View>

          <View style={{ marginVertical: 12, backgroundColor: 'pink' }}>
            <View style={{ height: 44, backgroundColor: '#FFFFFF', paddingLeft: 15 }}>
              <TextInput
                placeholder="Title"
                value={this.state.title}
                onChangeText={(title) => this.setState({title})}
                style={styles.textField} />
            </View>
            <View style={{ height: 44, backgroundColor: '#FFFFFF', paddingLeft: 15 }}>
              <Picker
                placeholder="Customer"
                placeholderTextColor="#BFBFBF"
                style={styles.picker}
                textStyle={styles.pickerText}
                selectedValue={this.state.user_id}
                onValueChange={(user_id) => this.setState({user_id})}
                items={_.map(this.props.users, (user) => ({ label: user.first_name + " " + user.last_name, value: user.id }))}
                />
            </View>
          </View>

          <View style={{ marginTop: 50, marginBottom: 12 }}>
            <View style={{ height: 44, backgroundColor: '#FFFFFF', paddingLeft: 15 }}>
              <DateTimePicker
                mode={"datetime"}
                placeholderTextColor="#BFBFBF"
                is24Hour={false}
                style={styles.picker}
                placeholder="Starts"
                textStyle={styles.pickerText}
                format={'MMM DD, YYYY       h:mma'}
                value={this.state.start_date}
                onConfirm={(start_date) => this.setState({start_date})}
                />
            </View>
            <View style={{ height: 44, backgroundColor: '#FFFFFF', paddingLeft: 15 }}>
              <DateTimePicker
                mode={"datetime"}
                placeholderTextColor="#BFBFBF"
                is24Hour={false}
                style={styles.picker}
                placeholder="Ends"
                textStyle={styles.pickerText}
                format={'MMM DD, YYYY       h:mma'}
                value={this.state.end_date}
                onConfirm={(end_date) => this.setState({end_date})}
                />
            </View>
          </View>

          <View style={{ marginTop: 50, marginBottom: 12 }}>
            <View style={{ height: 180, backgroundColor: '#FFFFFF', paddingLeft: 15 }}>
              <TextInput
                placeholder="Notes"
                multiline={true}
                value={this.state.notes}
                onChangeText={(notes) => this.setState({notes})}
                style={[styles.textField, {height: 180, borderBottomWidth: 0}]} />
            </View>
          </View>

        </ScrollView>
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
  buttonContainer: {
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 15,
    justifyContent: 'space-between'
  },
  picker: {
    height: 44,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.2)',
    paddingRight: 10
  },
  pickerText: {
    fontSize: 17,
    color: 'rgba(0, 0, 0, 0.73)'
  },
  textField: {
    height: 44,
    backgroundColor: '#FFFFFF',
    fontSize: 17,
    color: 'rgba(0, 0, 0, 0.73)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.2)'
  },
  safeAreaView:{
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center' 
  },
  safeAreaImage: {
    marginTop: 3,
    marginLeft: 110,
    width: 35,
    height: 35
  },
  safeAreaText: {
    marginLeft: 5,
    marginTop: 3,
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '600'
  } 
});

function mapStateToProps(state) {
  return {
    users: state.users
  }
}

export default connect(mapStateToProps, {getUserList, createAppointment})(AppointmentCreate);
