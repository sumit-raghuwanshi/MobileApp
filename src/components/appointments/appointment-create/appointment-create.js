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
import { bindActionCreators } from 'react';
import { Touchable, Picker, DateTimePicker } from '../../common';

class AppointmentCreate extends Component {
  static navigatorStyle = {
    navBarHidden: true
  }

  constructor(props) {
    super(props)

    this.state = {

    }
  }

  _navigateToDashboard = () => {
    this.props.navigator.popToRoot()
  }

  _navigateToPreviousScreen = () => {
    this.props.navigator.pop()
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content"/>

        <SafeAreaView style={styles.header}>
          <Touchable style={{ width: 50, alignItems: 'center', justifyContent: 'center' }} onPress={this._navigateToDashboard}>
            <Image source={require('../../../../img/icons/home.png')} />
          </Touchable>
          <View style={{ flex: 1, alignItems: 'center' }}>
            <Text style={{ fontSize: 16, color: '#FFFFFF', fontWeight: '600' }}>APPOINTMENT</Text>
            <Image style={{ marginTop: 10 }} source={require('../../../../img/icons/calendar.png')}/>
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

            <Touchable onPress={() => {}}>
              <Image source={require('../../../../img/icons/save.png')} />
            </Touchable>
          </View>

          <View style={{ marginVertical: 12, backgroundColor: 'pink' }}>
            <View style={{ height: 44, backgroundColor: '#FFFFFF', paddingLeft: 15 }}>
              <Picker
                placeholder="Customer"
                placeholderTextColor="#BFBFBF"
                style={styles.picker}
                textStyle={styles.pickerText}
                selectedValue={this.state.customer}
                onValueChange={(customer) => this.setState({customer})}
                items={[{label: 'customer', value: 'customer'}]}
                />
            </View>
            <View style={{ height: 44, backgroundColor: '#FFFFFF', paddingLeft: 15 }}>
              <TextInput
                placeholder="Location"
                value={this.state.location}
                onChangeText={(location) => this.setState({location})}
                style={styles.textField} />
            </View>
          </View>

          <View style={{ marginTop: 50, marginBottom: 12 }}>
            <View style={{ height: 44, backgroundColor: '#FFFFFF', paddingLeft: 15 }}>
              <DateTimePicker
                mode={"time"}
                is24Hour={false}
                style={styles.picker}
                placeholder="Starts"
                textStyle={styles.pickerText}
                format={'MMM DD, YYYY       h:mma'}
                value={this.state.checkinTime}
                onConfirm={(checkinTime) => this.setState({checkinTime})}
                />
            </View>
            <View style={{ height: 44, backgroundColor: '#FFFFFF', paddingLeft: 15 }}>
              <DateTimePicker
                mode={"time"}
                is24Hour={false}
                style={styles.picker}
                placeholder="Ends"
                textStyle={styles.pickerText}
                format={'MMM DD, YYYY       h:mma'}
                value={this.state.checkinTime}
                onConfirm={(checkinTime) => this.setState({checkinTime})}
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
  }
});

function mapStateToProps(state) {
  return {}
}

export default connect(mapStateToProps)(AppointmentCreate);
