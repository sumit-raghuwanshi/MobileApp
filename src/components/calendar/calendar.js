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
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import { connect } from 'react-redux';
import {getAppointments} from '../../actions';
import { Touchable, Picker, DateTimePicker, Loader } from '../common';

class CalendarScreen extends Component {
  static navigatorStyle = {
    navBarHidden: true
  }

  constructor(props) {
    super(props);
    this.state = {};
    this._onDayPress = this._onDayPress.bind(this);

    this.state = {
      loading: true
    }
  }

  componentDidMount() {
    this.props.getAppointments()
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

  _navigateToAppointmentCreate = () => {
    this.props.navigator.push({
      screen: 'roof_gravy.appointment_create'
    })
  }

  _onDayPress(day) {
    this.setState({
      selected: day.dateString
    });
  }

  render() {
    var markedDates = {}

    markedDates['2017-11-26'] = { selected: true, marked: true,dotColor: 'red' }

    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content"/>

        <SafeAreaView style={styles.header}>
          <Touchable style={{ width: 50, alignItems: 'center', justifyContent: 'center' }} onPress={this._navigateToDashboard}>
            <Image source={require('../../../img/icons/home.png')} />
          </Touchable>
          <View style={{ flex: 1, alignItems: 'center' }}>
            <Text style={{ fontSize: 16, color: '#FFFFFF', fontWeight: '600' }}>CALENDAR</Text>
            <Image style={{ marginTop: 10 }} source={require('../../../img/icons/calendar.png')}/>
          </View>
          <Touchable style={{ width: 50, alignItems: 'center', justifyContent: 'center' }}>
            <View></View>
          </Touchable>
        </SafeAreaView>

        <ScrollView style={styles.body} contentContainerStyle={{paddingTop: 62}}>
          <Calendar
            onDayPress={this._onDayPress}
            style={styles.calendar}
            hideExtraDays
            markedDates={{[this.state.selected]: {selected: true, marked: true}}}
            theme={{
              backgroundColor: '#ffffff',
              calendarBackground: '#f4f5f5',
              textSectionTitleColor: '#b6c1cd',
              selectedDayBackgroundColor: '#909498',
              selectedDayTextColor: '#ffffff',
              todayTextColor: '#00adf5',
              dayTextColor: '#2d4150',
              textDisabledColor: '#d9e1e8',
              dotColor: '#00adf5',
              selectedDotColor: '#ffffff',
              arrowColor: 'orange',
              monthTextColor: '#909498',
              textDayFontSize: 18,
              textMonthFontSize: 16,
              textDayHeaderFontSize: 16
            }}
          />
        </ScrollView>
        <View style={{paddingVertical: 15, alignItems: 'center'}}>
          <Touchable onPress={this._navigateToAppointmentCreate}>
            <View style={{ alignItems: 'center' }}>
              <Image source={require('../../../img/icons/add.png')}/>
              <Text style={{ fontSize: 12, fontWeight: '500', color: '#999999', marginTop: 5 }}>NEW APPOINTMENT</Text>
            </View>
          </Touchable>
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
  }
});

function mapStateToProps(state) {
  return {
    appointments: state.appointments
  }
}

export default connect(mapStateToProps, {getAppointments})(CalendarScreen);
