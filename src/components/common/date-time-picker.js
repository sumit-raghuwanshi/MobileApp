'use strict'

import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Picker,
  Modal,
  TouchableOpacity,
  TouchableNativeFeedback,
  Text,
  Button,
  PixelRatio,
  Image
} from 'react-native';
import moment from 'moment';
import DateTimePickerComponent from 'react-native-modal-datetime-picker';

class DateTimePicker extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isDateTimePickerVisible: false,
      // date: this.props.date ? this.props.data : new Date()
    }
  }

  _handleDatePicked = (date) => {
    this.props.onConfirm(date)
    this._hideDateTimePicker();
  };

  _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  render() {
    return (
      <TouchableOpacity style={this.props.style}
        onPress={this._showDateTimePicker.bind(this)}>
        <View style={styles.pickerContainer}>
          <Text style={this.props.textStyle}>
            {this.props.value ? moment(Date.parse(this.props.value)).format(this.props.format) : this.props.placeholder ? <Text style={{color: this.props.placeholderTextColor ? this.props.placeholderTextColor : 'gray'}}>{this.props.placeholder}</Text> : ''}
          </Text>
          <DateTimePickerComponent
            mode={this.props.mode}
            is24Hour={this.props.is24Hour}
            date={this.props.value ? new Date(this.props.value) : new Date()}
            isVisible={this.state.isDateTimePickerVisible}
            onConfirm={this._handleDatePicked}
            onCancel={this._hideDateTimePicker}
            minimumDate={this.props.minimumDate}/>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  pickerContainer: {
    flex: 1,
    justifyContent: 'center'
  },
  buttonBar: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1 / PixelRatio.get(),
    borderBottomColor: 'grey'
  },
  buttonBarSpace: {
    flex: 1
  }
});

export { DateTimePicker }
