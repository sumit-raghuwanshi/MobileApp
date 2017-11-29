import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  TextInput,
  SafeAreaView,
  AsyncStorage,
  StatusBar,
  ScrollView
} from 'react-native';
// import COLOR from '../../constants/colors';
import { Touchable, Picker, Loader } from '../../common';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../../../actions';
// import * as UserActions from '../../../actions/users';
import _ from 'lodash';
import ImagePicker from 'react-native-image-picker';

class LeadCreate extends Component {
  static navigatorStyle = {
    navBarHidden: true
  }

  constructor(props) {
    super(props)

    this.state = {
      users: [],
      first_name: '',
      last_name: '',
      loading: true
    }
  }

  componentDidMount() {
    this.props.actions.getUserList()
    .then((response) => {
      this.setState({
        loading: false
      })
    })
    .catch(error => {
      this.setState({
        loading: false
      })
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

  _cameraPressHandler = () => {
    var options = {
      title: 'Take Picture',
      cameraType: 'front'
    };

    ImagePicker.launchCamera(options, (response)  => {
      if (response.error) {
        alert(response.error)
      }
      else if (!response.didCancel) {
        this.setState({
          image_attach: response
        })
      }
    });
  }

  render() {
    var user = this.props.user

    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content"/>

        <SafeAreaView style={styles.header}>
          <Touchable style={{ width: 50, alignItems: 'center', justifyContent: 'center' }} onPress={this._navigateToDashboard}>
            <Image source={require('../../../../img/icons/home.png')} />
          </Touchable>
          <View style={{ flex: 1, alignItems: 'center' }}>
            <Text style={{ fontSize: 16, color: '#FFFFFF', fontWeight: '600' }}>LEAD</Text>
            <Image style={{ marginTop: 10 }} source={require('../../../../img/leads/leads.png')}/>
          </View>
          <Touchable style={{ width: 50, alignItems: 'center', justifyContent: 'center' }}>
            <View></View>
          </Touchable>
        </SafeAreaView>

        <ScrollView style={styles.body}>
          <View style={styles.buttonContainer}>
            <Touchable onPress={this._navigateToDashboard}>
              <Image source={require('../../../../img/icons/cross.png')} />
            </Touchable>

            <Touchable onPress={() => {}}>
              <Image source={require('../../../../img/icons/save.png')} />
            </Touchable>
          </View>

          <View style={{ flexDirection: 'row', marginBottom: 12 }}>

            <View style={{ justifyContent: 'center', paddingHorizontal: 20 }}>
              <Touchable onPress={this._cameraPressHandler}>
                <View style={{height: 65, width: 65, backgroundColor: '#354052', justifyContent: 'center', alignItems: 'center', borderRadius: 2}}>
                  <Image source={require('../../../../img/icons/camera-upload.png')} />
                </View>
              </Touchable>
            </View>

            <View style={{ flex: 1}}>
              <View style={{ height: 44, backgroundColor: '#FFFFFF', paddingLeft: 15 }}>
                <TextInput
                  placeholder="First Name"
                  value={this.state.first_name}
                  onChangeText={(first_name) => this.setState({first_name})}
                  style={styles.textField} />
              </View>

              <View style={{ height: 44, backgroundColor: '#FFFFFF', paddingLeft: 15 }}>
                <TextInput
                  placeholder="Last Name"
                  value={this.state.last_name}
                  onChangeText={(last_name) => this.setState({last_name})}
                  style={styles.textField} />
              </View>

              <View style={{ height: 44, backgroundColor: '#FFFFFF', paddingLeft: 15 }}>
                <TextInput
                  placeholder="Company"
                  value={this.state.company}
                  onChangeText={(company) => this.setState({company})}
                  style={styles.textField} />
              </View>
            </View>
          </View>

          <View style={{ marginVertical: 12 }}>
            <View style={{ height: 44, backgroundColor: '#FFFFFF', paddingLeft: 15 }}>
              <TextInput
                placeholder="Phone"
                value={this.state.phone}
                keyboardType="numeric"
                onChangeText={(phone) => this.setState({phone})}
                style={styles.textField} />
            </View>

            <View style={{ height: 44, backgroundColor: '#FFFFFF', paddingLeft: 15 }}>
              <TextInput
                placeholder="Email"
                value={this.state.email}
                keyboardType="email-address"
                onChangeText={(email) => this.setState({email})}
                style={styles.textField} />
            </View>

            <View style={{ height: 44, backgroundColor: '#FFFFFF', paddingLeft: 15 }}>
              <TextInput
                placeholder="Address"
                value={this.state.address}
                keyboardType="email-address"
                onChangeText={(address) => this.setState({address})}
                style={styles.textField} />
            </View>
          </View>

          <View style={{ marginVertical: 12 }}>
            <View style={{ height: 44, backgroundColor: '#FFFFFF', paddingLeft: 15 }}>
              <Picker
                placeholder="Lead Source"
                placeholderTextColor="#BFBFBF"
                style={styles.picker}
                textStyle={styles.pickerText}
                selectedValue={this.state.job_category}
                onValueChange={(job_category) => this.setState({job_category})}
                items={_.map(this.props.user.job_categories, (jc) => ({label: jc, value: jc}))}
                />
            </View>

            <View style={{ height: 44, backgroundColor: '#FFFFFF', paddingLeft: 15 }}>
              <Picker
                placeholder="Job Category"
                placeholderTextColor="#BFBFBF"
                style={styles.picker}
                textStyle={styles.pickerText}
                selectedValue={this.state.job_category}
                onValueChange={(job_category) => this.setState({job_category})}
                items={_.map(this.props.user.job_categories, (jc) => ({label: jc, value: jc}))}
                />
            </View>

            <View style={{ height: 44, backgroundColor: '#FFFFFF', paddingLeft: 15 }}>
              <Picker
                placeholder="Work Type"
                placeholderTextColor="#BFBFBF"
                style={styles.picker}
                textStyle={styles.pickerText}
                selectedValue={this.state.work_type}
                onValueChange={(work_type) => this.setState({work_type})}
                items={_.map(this.props.user.work_types, (wt) => ({label: wt, value: wt}))}
                />
            </View>

            <View style={{ height: 44, backgroundColor: '#FFFFFF', paddingLeft: 15 }}>
              <Picker
                placeholder="Trade Type"
                placeholderTextColor="#BFBFBF"
                style={styles.picker}
                textStyle={styles.pickerText}
                selectedValue={this.state.trade_type}
                onValueChange={(trade_type) => this.setState({trade_type})}
                items={_.map(this.props.user.trade_types, (tt) => ({label: tt, value: tt}))}
                />
            </View>
          </View>

          <View style={{ marginVertical: 12 }}>
            <View style={{ height: 44, backgroundColor: '#FFFFFF', paddingLeft: 15 }}>
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
          </View>

          <View style={{ marginVertical: 12, alignItems: 'center' }}>
            <Touchable onPress={this._navigateToAppointmentCreate}>
              <View style={{ alignItems: 'center' }}>
                <Image source={require('../../../../img/icons/add.png')}/>
                <Text style={{ fontSize: 12, fontWeight: '500', color: '#999999', marginTop: 5 }}>NEW APPOINTMENT</Text>
              </View>
            </Touchable>
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
  textField: {
    height: 44,
    backgroundColor: '#FFFFFF',
    fontSize: 17,
    color: 'rgba(0, 0, 0, 0.73)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.2)'
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
  }

});

function mapStateToProps(state, ownProps) {
  return {
    user: state.user,
    users: state.users
  };
};

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LeadCreate);
