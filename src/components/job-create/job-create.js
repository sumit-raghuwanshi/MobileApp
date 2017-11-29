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

class JobCreate extends Component {
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
      zipCode: 'Zip'
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
              <Touchable style={{paddingHorizontal: 5}} onPress={() => {}}>
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
                  <TextInput
                    placeholder="First Name"
                    style={styles.textField}
                    onChangeText={(first_name) => this.setState({first_name})}
                    value={this.state.first_name}/>
                </View>
              </View>

              <View style={{ height: 44, backgroundColor: '#FFFFFF', paddingLeft: 15 }}>
                <View style={{ flex: 1, justifyContent: 'center', borderBottomWidth: 1, borderBottomColor: 'rgba(0, 0, 0, 0.2)'}}>
                <TextInput
                  placeholder="Last Name"
                  value={this.state.last_name}
                  onChangeText={(last_name) => this.setState({last_name})}
                  style={styles.textField}/>
                </View>
              </View>

              <View style={{ height: 44, backgroundColor: '#FFFFFF', paddingLeft: 15 }}>
                <View style={{ flex: 1, justifyContent: 'center', borderBottomWidth: 1, borderBottomColor: 'rgba(0, 0, 0, 0.2)'}}>
                <TextInput
                  placeholder="Company"
                  value={this.state.company}
                  onChangeText={(company) => this.setState({company})}
                  style={styles.textField}/>
                </View>
              </View>

              <View style={{ height: 44, backgroundColor: '#FFFFFF', paddingLeft: 15 }}>
                <View style={{ flex: 1, justifyContent: 'center', borderBottomWidth: 1, borderBottomColor: 'rgba(0, 0, 0, 0.2)'}}>
                <TextInput
                  placeholder="Balance"
                  value={this.state.balance}
                  onChangeText={(balance) => this.setState({balance})}
                  style={styles.textField}/>
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
                  <TextInput
                    placeholder="Phone"
                    value={this.state.phone}
                    onChangeText={(phone) => this.setState({phone})}
                    style={[styles.textField, {flex: 1}]}/>

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
                  <TextInput
                    placeholder="Email"
                    value={this.state.email}
                    onChangeText={(email) => this.setState({email})}
                    style={[styles.textField, {flex: 1}]}/>
                  <Touchable style={{paddingRight: 10}} onPress={() => {}}>
                    <Image  source={require('../../../img/icons/email.png')}/>
                  </Touchable>
                </View>
              </View>

              <View style={{ height: 44, backgroundColor: '#FFFFFF', paddingLeft: 15 }}>
                <View style={{ flex: 1, alignItems: 'center', flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: 'rgba(0, 0, 0, 0.2)'}}>
                  <TextInput
                    placeholder="Address 1"
                    value={this.state.line1}
                    onChangeText={(line1) => this.setState({line1})}
                    style={[styles.textField, {flex: 1}]}/>
                  <Touchable style={{paddingRight: 10}} onPress={() => {}}>
                    <Image  source={require('../../../img/icons/location.png')}/>
                  </Touchable>
                </View>
              </View>

              <View style={{ height: 44, backgroundColor: '#FFFFFF', paddingLeft: 15 }}>
                <View style={{ flex: 1, justifyContent: 'center', borderBottomWidth: 1, borderBottomColor: 'rgba(0, 0, 0, 0.2)'}}>
                  <TextInput
                    placeholder="Address 2"
                    value={this.state.line2}
                    onChangeText={(line2) => this.setState({line2})}
                    style={styles.textField}/>
                </View>
              </View>

              <View style={{ height: 44, backgroundColor: '#FFFFFF', paddingLeft: 15 }}>
                <View style={{ flex: 1, justifyContent: 'center', borderBottomWidth: 1, borderBottomColor: 'rgba(0, 0, 0, 0.2)'}}>
                  <TextInput
                    placeholder="Address 2"
                    value={this.state.line2}
                    onChangeText={(line2) => this.setState({line2})}
                    style={styles.textField}/>
                </View>
              </View>

              <View style={{ height: 44, backgroundColor: '#FFFFFF', paddingLeft: 15 }}>
                <View style={{ flex: 1, justifyContent: 'center', borderBottomWidth: 1, borderBottomColor: 'rgba(0, 0, 0, 0.2)'}}>
                  <TextInput
                    placeholder="State"
                    value={this.state.state}
                    onChangeText={(state) => this.setState({state})}
                    style={styles.textField}/>
                </View>
              </View>

              <View style={{ height: 44, backgroundColor: '#FFFFFF', paddingLeft: 15 }}>
                <View style={{ flex: 1, justifyContent: 'center', borderBottomWidth: 1, borderBottomColor: 'rgba(0, 0, 0, 0.2)'}}>
                  <TextInput
                    placeholder="Zip Code"
                    value={this.state.zipCode}
                    onChangeText={(zipCode) => this.setState({zipCode})}
                    style={styles.textField}/>
                </View>
              </View>

            </View>
          </View>

          <View style={{ marginTop: 24 }}>

            <View style={{backgroundColor: '#FFFFFF', paddingLeft: 15}}>
              <Picker
                placeholder="Lead Source"
                placeholderTextColor="#BFBFBF"
                style={styles.picker}
                textStyle={styles.pickerText}
                selectedValue={this.state.leadSource}
                onValueChange={(leadSource) => this.setState({leadSource})}
                items={[{label: 'Lead Source', value: 'Lead Source'}]}
                />
            </View>

            <View style={{backgroundColor: '#FFFFFF', paddingLeft: 15}}>
              <Picker
                placeholder="Job Category"
                placeholderTextColor="#BFBFBF"
                style={styles.picker}
                textStyle={styles.pickerText}
                selectedValue={this.state.jobCategory}
                onValueChange={(jobCategory) => this.setState({jobCategory})}
                items={[{label: 'Job Category', value: 'Job Category'}]}
                />
            </View>

            <View style={{backgroundColor: '#FFFFFF', paddingLeft: 15}}>
              <Picker
                placeholder="Work Type"
                placeholderTextColor="#BFBFBF"
                style={styles.picker}
                textStyle={styles.pickerText}
                selectedValue={this.state.workType}
                onValueChange={(workType) => this.setState({workType})}
                items={[{label: 'Work Type', value: 'Work Type'}]}
                />
            </View>

            <View style={{backgroundColor: '#FFFFFF', paddingLeft: 15}}>
              <Picker
                placeholder="Trade Type"
                placeholderTextColor="#BFBFBF"
                style={styles.picker}
                textStyle={styles.pickerText}
                selectedValue={this.state.tradeType}
                onValueChange={(tradeType) => this.setState({tradeType})}
                items={[{label: 'Trade Type', value: 'Trade Type'}]}
                />
            </View>

          </View>

          <View style={{marginTop: 24, height: 25, backgroundColor: '#95989A', justifyContent: 'center', paddingHorizontal: 15}}>
            <Text style={{fontSize: 15, fontWeight: '700', color: '#FFFFFF'}}>DOCUMENTS</Text>
          </View>

          <View style={{ marginTop: 24 }}>

            <View style={{backgroundColor: '#FFFFFF', paddingLeft: 15}}>
              <Picker
                placeholder="Measurements"
                placeholderTextColor="#BFBFBF"
                style={styles.picker}
                textStyle={styles.pickerText}
                selectedValue={this.state.measurements}
                onValueChange={(measurements) => this.setState({measurements})}
                items={[{label: 'Measurements', value: 'Measurements'}]}
                />
            </View>

            <View style={{backgroundColor: '#FFFFFF', paddingLeft: 15}}>
              <Picker
                placeholder="Estimates"
                placeholderTextColor="#BFBFBF"
                style={styles.picker}
                textStyle={styles.pickerText}
                selectedValue={this.state.estimates}
                onValueChange={(estimates) => this.setState({estimates})}
                items={[{label: 'Estimates', value: 'Estimates'}]}
                />
            </View>

          </View>

          <View style={{ marginTop: 24 }}>

            <View style={{backgroundColor: '#FFFFFF', paddingLeft: 15}}>
              <Picker
                placeholder="Other"
                placeholderTextColor="#BFBFBF"
                style={styles.picker}
                textStyle={styles.pickerText}
                selectedValue={this.state.other}
                onValueChange={(other) => this.setState({other})}
                items={[{label: 'Other', value: 'Other'}]}
                />
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

export default JobCreate
