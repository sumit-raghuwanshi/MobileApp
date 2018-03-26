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

class Payments extends Component {
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
            <Text style={{ fontSize: 16, color: '#FFFFFF', fontWeight: '600' }}>PAYMENTS</Text>
            <Image style={{ marginTop: 10 }} source={require('../../../img/icons/payments.png')}/>
          </View>
          <Touchable style={{ width: 50, alignItems: 'center', justifyContent: 'center' }}>
            <View></View>
          </Touchable>
        </SafeAreaView>

        <ScrollView style={styles.body} contentContainerStyle={{paddingBottom: 20}}>
          <View style={styles.topButtonContainer}>
            <View style={{ flex: 1 }}>
              <Touchable onPress={this._navigateToPreviousScreen}>
                  <Image source={require('../../../img/icons/cross.png')}/>
              </Touchable>
            </View>
            <View style={{flex: 1, alignItems: 'flex-end'}}>
              <Touchable onPress={() => {}}>
                  <Image source={require('../../../img/icons/save.png')}/>
              </Touchable>
            </View>
          </View>

          <View style={{backgroundColor: '#FFFFFF', paddingHorizontal: 15}}>
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

          <View style={{backgroundColor: '#FFFFFF', paddingHorizontal: 15, marginTop :26}}>
            <DateTimePicker
              mode={"date"}
              is24Hour={false}
              style={styles.picker}
              placeholder="Date"
              textStyle={styles.pickerText}
              format={'MMM DD, YYYY'}
              value={this.state.checkinTime}
              onConfirm={(checkinTime) => this.setState({checkinTime})}
              />
          </View>

          <View style={{backgroundColor: '#FFFFFF', paddingHorizontal: 15, marginTop :26, height: 44, flexDirection: 'row'}}>
            <View style={{flex: 1, justifyContent: 'center'}}>
              <Text style={styles.text}>Payment Amount</Text>
            </View>
            <View style={{flex: 1}}>
              <TextInput
                placeholder="$0.00"
                style={[styles.inputField, {textAlign: 'right'}]}
                />
            </View>
          </View>

          <View style={styles.paymentMethodContainer}>
            <Text style={styles.paymentTitle}>Select a Payment Method</Text>
            <View style={styles.paymentButtonContainer}>

              <Touchable style={styles.paymentButton} onPress={() => {}}>
                <Text>Credit</Text>
              </Touchable>

              <View style={styles.paymentButtonSpace}/>

              <Touchable style={styles.paymentButton} onPress={() => {}}>
                <Text>Check</Text>
              </Touchable>

              <View style={styles.paymentButtonSpace}/>

              <Touchable style={styles.paymentButton} onPress={() => {}}>
                <Text>Cash</Text>
              </Touchable>

            </View>
          </View>

          <View style={{backgroundColor: '#FFFFFF', paddingHorizontal: 15, marginTop :26, height: 44, flexDirection: 'row'}}>
            <View style={{flex: 1, justifyContent: 'center'}}>
              <Text style={styles.text}>Ref #</Text>
            </View>
            <View style={{flex: 1}}>
              <TextInput
                placeholder="(Optional)"
                style={[styles.inputField, {textAlign: 'right'}]}
                />
            </View>
          </View>

          <View style={{backgroundColor: '#FFFFFF', paddingHorizontal: 15, marginTop :26, height: 120}}>
            <TextInput
              multiline={true}
              placeholder="Notes"
              style={[styles.inputField, {flex: 1}]}
              />
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
  topButtonContainer: {
    flexDirection: 'row',
    height: 80,
    paddingLeft: 25,
    paddingRight: 10,
    paddingTop: 20,
    paddingBottom: 10
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
  inputField: {
    flex: 1,
    fontSize: 17,
    color: 'rgba(0, 0, 0, 0.73)'
  },
  text: {
    fontSize: 17,
    color: 'rgba(0, 0, 0, 0.73)'
  },
  paymentMethodContainer: {
    padding: 15
  },
  paymentTitle: {
    fontSize: 17,
    color: 'rgba(0, 0, 0, 0.73)'
  },
  paymentButtonContainer: {
    flexDirection: 'row',
    marginTop: 15
  },
  paymentButton: {
    flex: 1,
    height: 45,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.5)',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center'
  },
  paymentButtonSpace: {
    width: 10
  }
});

export default Payments
