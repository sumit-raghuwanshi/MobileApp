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
import { Touchable, Picker } from '../common';

class Job extends Component {
  static navigatorStyle = {
    navBarHidden: true
  }

  constructor(props) {
    super(props)

    this.state = {
      first_name: 'First Name',
      last_name: 'Last Name',
      company: 'Company',
      balance: 'Balance Due',
      phone: 'Phone',
      line1: 'Address 1',
      line2: 'Address 2',
      city: 'City',
      state: 'State',
      zipCode: 'Zip',
      leadSource: 'LeadSource',
      jobCategory: 'Job Category',
      workType: 'Work Type',
      tradeType: 'Trade Type',
      measurements: 'Measurements',
      estimates: 'Estimates',
      other: 'Other',
    }
  }

  _navigateToDashboard = () => {
    this.props.navigator.popToRoot()
  }

  _navigateToPreviousScreen = () => {
    this.props.navigator.pop()
  }

  _editButtonHandler = () => {
    this.props.navigator.push({
      screen: 'roof_gravy.job_create'
    })
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
            <Text style={{ fontSize: 16, color: '#FFFFFF', fontWeight: '600' }}>Jobs</Text>
            <Image style={{ marginTop: 10 }} source={require('../../../img/icons/jobs.png')}/>
          </View>
          <Touchable style={{ width: 50, alignItems: 'center', justifyContent: 'center' }}>
            <View></View>
          </Touchable>
        </SafeAreaView>

        <ScrollView style={styles.body}>
          <View style={styles.topButtonContainer}>
            <View style={{ flex: 1 }}>
              <Touchable onPress={this._navigateToPreviousScreen}>
                <Image source={require('../../../img/icons/cross.png')}/>
              </Touchable>
            </View>
            <View style={{flex: 1, alignItems: 'flex-end'}}>
              <Touchable style={{paddingHorizontal: 5}} onPress={this._editButtonHandler}>
                <Image source={require('../../../img/icons/save.png')}/>
              </Touchable>
            </View>
          </View>

          <View style={{ flexDirection: 'row', marginBottom: 24 }}>

            <View style={{ justifyContent: 'center', paddingHorizontal: 20 }}>
              <Touchable onPress={this._cameraPressHandler}>
                <View style={{height: 65, width: 65, backgroundColor: '#354052', justifyContent: 'center', alignItems: 'center', borderRadius: 2}}>
                  <Image source={require('../../../img/icons/camera-upload.png')} />
                </View>
              </Touchable>
            </View>

            <View style={{ flex: 1}}>
              <View style={{ height: 44, backgroundColor: '#FFFFFF', paddingLeft: 15 }}>
                <View style={{ flex: 1, justifyContent: 'center', borderBottomWidth: 1, borderBottomColor: 'rgba(0, 0, 0, 0.2)'}}>
                  <Text style={styles.textField}>{this.state.first_name ? this.state.first_name : 'N/A'}</Text>
                </View>
              </View>

              <View style={{ height: 44, backgroundColor: '#FFFFFF', paddingLeft: 15 }}>
                <View style={{ flex: 1, justifyContent: 'center', borderBottomWidth: 1, borderBottomColor: 'rgba(0, 0, 0, 0.2)'}}>
                  <Text style={styles.textField}>{this.state.last_name ? this.state.last_name : 'N/A'}</Text>
                </View>
              </View>

              <View style={{ height: 44, backgroundColor: '#FFFFFF', paddingLeft: 15 }}>
                <View style={{ flex: 1, justifyContent: 'center', borderBottomWidth: 1, borderBottomColor: 'rgba(0, 0, 0, 0.2)'}}>
                  <Text style={styles.textField}>{this.state.company ? this.state.company : 'N/A'}</Text>
                </View>
              </View>

              <View style={{ height: 44, backgroundColor: '#FFFFFF', paddingLeft: 15 }}>
                <View style={{ flex: 1, justifyContent: 'center', borderBottomWidth: 1, borderBottomColor: 'rgba(0, 0, 0, 0.2)'}}>
                  <Text style={styles.textField}>{this.state.balance ? this.state.balance : 'N/A'}</Text>
                </View>
              </View>
            </View>
          </View>

          <View>
            <View style={{ height: 44, backgroundColor: '#FFFFFF', flexDirection: 'row' }}>
              <View style={{ width: 44, backgroundColor: '#35B44F', justifyContent: 'center', alignItems: 'center' }}>
                <Image source={require('../../../img/icons/down.png')}/>
              </View>
              <View style={{ flex: 1, justifyContent: 'center', paddingHorizontal: 15 }}>
                <Text style={styles.textField}>{'LEAD'}</Text>
              </View>
              <View style={{ justifyContent: 'center', paddingHorizontal: 15 }}>
                <Text style={styles.textField}>{'21 Days in Status'}</Text>
              </View>
            </View>
          </View>

          <View style={{ marginTop: 24 }}>
            <View style={{ flex: 1}}>

              <View style={{ height: 44, backgroundColor: '#FFFFFF', paddingLeft: 15 }}>
                <View style={{ flex: 1, alignItems: 'center', flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: 'rgba(0, 0, 0, 0.2)'}}>
                  <Text style={[styles.textField, {flex: 1}]}>{this.state.phone ? this.state.phone : 'N/A'}</Text>
                  <Touchable style={{paddingRight: 10}} onPress={() => {}}>
                    <Image  source={require('../../../img/icons/text.png')}/>
                  </Touchable>
                  <Touchable style={{paddingRight: 10}} onPress={() => {}}>
                    <Image source={require('../../../img/icons/phone.png')}/>
                  </Touchable>
                </View>
              </View>

              <View style={{ height: 44, backgroundColor: '#FFFFFF', paddingLeft: 15 }}>
                <View style={{ flex: 1, alignItems: 'center', flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: 'rgba(0, 0, 0, 0.2)'}}>
                  <Text style={[styles.textField, {flex: 1}]}>{this.state.email ? this.state.email : 'N/A'}</Text>
                  <Touchable style={{paddingRight: 10}} onPress={() => {}}>
                    <Image  source={require('../../../img/icons/email.png')}/>
                  </Touchable>
                </View>
              </View>

              <View style={{ height: 44, backgroundColor: '#FFFFFF', paddingLeft: 15 }}>
                <View style={{ flex: 1, alignItems: 'center', flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: 'rgba(0, 0, 0, 0.2)'}}>
                  <Text style={[styles.textField, {flex: 1}]}>{this.state.line1 ? this.state.line1 : 'N/A'}</Text>
                  <Touchable style={{paddingRight: 10}} onPress={() => {}}>
                    <Image  source={require('../../../img/icons/location.png')}/>
                  </Touchable>
                </View>
              </View>

              <View style={{ height: 44, backgroundColor: '#FFFFFF', paddingLeft: 15 }}>
                <View style={{ flex: 1, justifyContent: 'center', borderBottomWidth: 1, borderBottomColor: 'rgba(0, 0, 0, 0.2)'}}>
                  <Text style={styles.textField}>{this.state.line2 ? this.state.line2 : 'N/A'}</Text>
                </View>
              </View>

              <View style={{ height: 44, backgroundColor: '#FFFFFF', paddingLeft: 15 }}>
                <View style={{ flex: 1, justifyContent: 'center', borderBottomWidth: 1, borderBottomColor: 'rgba(0, 0, 0, 0.2)'}}>
                  <Text style={styles.textField}>{this.state.city ? this.state.city : 'N/A'}</Text>
                </View>
              </View>

              <View style={{ height: 44, backgroundColor: '#FFFFFF', paddingLeft: 15 }}>
                <View style={{ flex: 1, justifyContent: 'center', borderBottomWidth: 1, borderBottomColor: 'rgba(0, 0, 0, 0.2)'}}>
                  <Text style={styles.textField}>{this.state.state ? this.state.state : 'N/A'}</Text>
                </View>
              </View>

              <View style={{ height: 44, backgroundColor: '#FFFFFF', paddingLeft: 15 }}>
                <View style={{ flex: 1, justifyContent: 'center', borderBottomWidth: 1, borderBottomColor: 'rgba(0, 0, 0, 0.2)'}}>
                  <Text style={styles.textField}>{this.state.zipCode ? this.state.zipCode : 'N/A'}</Text>
                </View>
              </View>

            </View>
          </View>

          <View style={{ marginTop: 24 }}>

            <View style={{ height: 44, backgroundColor: '#FFFFFF', paddingLeft: 15 }}>
              <View style={{ flex: 1, justifyContent: 'center', borderBottomWidth: 1, borderBottomColor: 'rgba(0, 0, 0, 0.2)'}}>
                <Text style={styles.textField}>{this.state.leadSource ? this.state.leadSource : 'N/A'}</Text>
              </View>
            </View>

            <View style={{ height: 44, backgroundColor: '#FFFFFF', paddingLeft: 15 }}>
              <View style={{ flex: 1, justifyContent: 'center', borderBottomWidth: 1, borderBottomColor: 'rgba(0, 0, 0, 0.2)'}}>
                <Text style={styles.textField}>{this.state.jobCategory ? this.state.jobCategory : 'N/A'}</Text>
              </View>
            </View>

            <View style={{ height: 44, backgroundColor: '#FFFFFF', paddingLeft: 15 }}>
              <View style={{ flex: 1, justifyContent: 'center', borderBottomWidth: 1, borderBottomColor: 'rgba(0, 0, 0, 0.2)'}}>
                <Text style={styles.textField}>{this.state.workType ? this.state.workType : 'N/A'}</Text>
              </View>
            </View>

            <View style={{ height: 44, backgroundColor: '#FFFFFF', paddingLeft: 15 }}>
              <View style={{ flex: 1, justifyContent: 'center', borderBottomWidth: 1, borderBottomColor: 'rgba(0, 0, 0, 0.2)'}}>
                <Text style={styles.textField}>{this.state.tradeType ? this.state.tradeType : 'N/A'}</Text>
              </View>
            </View>

          </View>

          <View style={{marginTop: 24, height: 25, backgroundColor: '#95989A', justifyContent: 'center', paddingHorizontal: 15}}>
            <Text style={{fontSize: 15, fontWeight: '700', color: '#FFFFFF'}}>DOCUMENTS</Text>
          </View>

          <View style={{ marginTop: 24 }}>

            <View style={{ height: 44, backgroundColor: '#FFFFFF', paddingLeft: 15 }}>
              <View style={{ flex: 1, justifyContent: 'center', borderBottomWidth: 1, borderBottomColor: 'rgba(0, 0, 0, 0.2)'}}>
                <Text style={styles.textField}>{this.state.measurements ? this.state.measurements : 'N/A'}</Text>
              </View>
            </View>

            <View style={{ height: 44, backgroundColor: '#FFFFFF', paddingLeft: 15 }}>
              <View style={{ flex: 1, justifyContent: 'center', borderBottomWidth: 1, borderBottomColor: 'rgba(0, 0, 0, 0.2)'}}>
                <Text style={styles.textField}>{this.state.estimates ? this.state.estimates : 'N/A'}</Text>
              </View>
            </View>

          </View>

          <View style={{ marginTop: 24 }}>

            <View style={{ height: 44, backgroundColor: '#FFFFFF', paddingLeft: 15 }}>
              <View style={{ flex: 1, justifyContent: 'center', borderBottomWidth: 1, borderBottomColor: 'rgba(0, 0, 0, 0.2)'}}>
                <Text style={styles.textField}>{this.state.other ? this.state.other : 'N/A'}</Text>
              </View>
            </View>

          </View>

          <View style={{ marginVertical: 25, alignItems: 'center' }}>
            <Touchable onPress={this._navigateToAppointmentCreate}>
              <View style={{ alignItems: 'center' }}>
                <Image source={require('../../../img/icons/add.png')}/>
                <Text style={{ fontSize: 12, fontWeight: '500', color: '#999999', marginTop: 5 }}>NEW DOCUMENT</Text>
              </View>
            </Touchable>
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
  textField: {
    backgroundColor: '#FFFFFF',
    fontSize: 17,
    color: 'rgba(0, 0, 0, 0.73)',
  },
  picker: {
    height: 44,
    backgroundColor: '#FFFFFF',
    paddingRight: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.2)'
  },
  pickerText: {
    fontSize: 17,
    color: 'rgba(0, 0, 0, 0.73)'
  }
});

export default Job
