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
import { Touchable, Picker, Loader, DateTimePicker } from '../../common';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {createLead, getUserList} from '../../../actions';
import {Notification} from '../../../helpers';
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
      loading: true
    }
  }

  componentDidMount() {
    this.props.getUserList()
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

  _navigateToPreviousScreen = () => {
    this.props.navigator.pop()
  }

  _navigateToAppointmentCreate = () => {
    this.props.navigator.push({
      screen: 'roof_gravy.appointment_create'
    })
  }

  _cameraPressHandler = () => {
    var options = {
      title: 'Take Picture'
    }

    ImagePicker.launchCamera(options, (response)  => {
      if (response.error) {
        alert(response.error)
      }
      else if (!response.didCancel) {
        this.setState({
          image_attach: response
        })
      }
    })
  }

  _onSubmit = () => {
    var {image_attach, contact, company, phone, email, address, city, state, zip, source, job_category, work_type, trade_type, assignee_id, title, start_date, end_date, appointment_address, appointment_city} = this.state

    var errorMessages = []

    if (!image_attach)
      errorMessages.push('Picture is required')

    if (!contact)
      errorMessages.push('Contact Name is required')

    if (!company)
      errorMessages.push('Company is required')

    if (!email)
      errorMessages.push('Email is required')

    if (!address)
      errorMessages.push('Address is required')

    if (!city)
      errorMessages.push('City is required')

    if (!state)
      errorMessages.push('State is required')

    if (!zip)
      errorMessages.push('Zipcode is required')

    if (typeof source == "undefined")
      errorMessages.push('Source is required')

    if (typeof job_category == "undefined")
      errorMessages.push('Job Category is required')

    if (typeof work_type == "undefined")
      errorMessages.push('Work Type is required')

    if (typeof trade_type == "undefined")
      errorMessages.push('Trade Type is required')

    if (typeof assignee_id == "undefined")
      errorMessages.push('Assignee is required')

    if (errorMessages.length > 0) {
      Notification.error(_.join(errorMessages, "\n"))

      return
    }

    this.setState({loading: true})

    var params = new FormData();
    params.append("job[assignee_id]", assignee_id)
    params.append("job[contact]", contact)
    params.append("job[contact]", company)
    params.append("job[phone]", phone)
    params.append("job[email]", email)
    params.append("job[source]", source)
    params.append("job[job_category]", job_category)
    params.append("job[work_type]", work_type)
    params.append("job[trade_type]", trade_type)
    params.append("job[mailing_same_as_location]", true)

    params.append("job[location_info_attributes][address]", address)
    params.append("job[location_info_attributes][city]", city)
    params.append("job[location_info_attributes][state]", state)
    params.append("job[location_info_attributes][zip]", zip)

    params.append("job[appointment_attributes][event_title]", title)
    params.append("job[appointment_attributes][start_date]", start_date)
    params.append("job[appointment_attributes][end_date]", end_date)
    params.append("job[appointment_attributes][address]", appointment_address)
    params.append("job[appointment_attributes][city]", appointment_city)

    params.append("job[attachments_attributes][0][data]", {
      uri: image_attach.uri,
      name: "lead_image.jpg",
      type: "image/jpg"
    })

    this.props.createLead(params)
    .then(response => {
      this.setState({loading: false}, this._navigateToPreviousScreen)
    }).catch(error => {
      this.setState({loading: false})
    })
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

            <Touchable onPress={this._onSubmit}>
              <Image source={require('../../../../img/icons/save.png')} />
            </Touchable>
          </View>

          <View style={{ flexDirection: 'row', marginBottom: 12 }}>

            <View style={{ justifyContent: 'center', paddingHorizontal: 20 }}>
              <Touchable onPress={this._cameraPressHandler}>
                <View style={{height: 65, width: 65, backgroundColor: '#354052', justifyContent: 'center', alignItems: 'center', borderRadius: 2}}>
                  {
                    this.state.image_attach
                    ?
                      <Image style={{height: 65, width: 65}} resizeMode="cover" source={{uri: this.state.image_attach.uri}}/>
                    :
                      <Image source={require('../../../../img/icons/camera-upload.png')} />
                  }
                </View>
              </Touchable>
            </View>

            <View style={{ flex: 1}}>
              <View style={{ height: 44, backgroundColor: '#FFFFFF', paddingLeft: 15 }}>
                <TextInput
                  placeholder="Contact Name"
                  value={this.state.contact}
                  onChangeText={(contact) => this.setState({contact})}
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
                autoCapitalize="none"
                keyboardType="email-address"
                onChangeText={(email) => this.setState({email})}
                style={styles.textField} />
            </View>
          </View>

          <View style={{ marginVertical: 12 }}>
            <View style={{ height: 44, backgroundColor: '#FFFFFF', paddingLeft: 15 }}>
              <TextInput
                placeholder="Address"
                value={this.state.address}
                onChangeText={(address) => this.setState({address})}
                style={styles.textField} />
            </View>

            <View style={{ height: 44, backgroundColor: '#FFFFFF', paddingLeft: 15 }}>
              <TextInput
                placeholder="City"
                value={this.state.city}
                onChangeText={(city) => this.setState({city})}
                style={styles.textField} />
            </View>

            <View style={{ height: 44, backgroundColor: '#FFFFFF', paddingLeft: 15 }}>
              <TextInput
                placeholder="State"
                value={this.state.state}
                onChangeText={(state) => this.setState({state})}
                style={styles.textField} />
            </View>

            <View style={{ height: 44, backgroundColor: '#FFFFFF', paddingLeft: 15 }}>
              <TextInput
                placeholder="Zip Code"
                value={this.state.zip}
                onChangeText={(zip) => this.setState({zip})}
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
                selectedValue={this.state.source}
                onValueChange={(source) => this.setState({source})}
                items={_.map(this.props.user.source_leads, (source, index) => ({label: source, value: index}))}
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
                items={_.map(this.props.user.job_categories, (jc, index) => ({label: jc, value: index}))}
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
                items={_.map(this.props.user.work_types, (wt, index) => ({label: wt, value: index}))}
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
                items={_.map(this.props.user.trade_types, (tt, index) => ({label: tt, value: index}))}
                />
            </View>
          </View>

          <View style={{margin: 10}}>
            <Text style={{
              fontSize: 17,
              color: 'rgba(0, 0, 0, 0.73)'
            }}>Appointment</Text>
          </View>

          <View style={{ marginVertical: 12 }}>
            <View style={{ height: 44, backgroundColor: '#FFFFFF', paddingLeft: 15 }}>
              <TextInput
                placeholder="Title"
                value={this.state.title}
                onChangeText={(title) => this.setState({title})}
                style={styles.textField} />
            </View>

            <View style={{ height: 44, backgroundColor: '#FFFFFF', paddingLeft: 15 }}>
              <DateTimePicker
                mode={"date"}
                is24Hour={false}
                placeholder="Select Start date"
                style={styles.picker}
                textStyle={styles.pickerText}
                format={'MMM DD, YYYY h:mma'}
                value={this.state.start_date}
                onConfirm={(start_date) => this.setState({start_date})}
                />
            </View>

            <View style={{ height: 44, backgroundColor: '#FFFFFF', paddingLeft: 15 }}>
              <DateTimePicker
                mode={"date"}
                is24Hour={false}
                placeholder="Select End date"
                style={styles.picker}
                textStyle={styles.pickerText}
                format={'MMM DD, YYYY h:mma'}
                value={this.state.end_date}
                onConfirm={(end_date) => this.setState({end_date})}
                />
            </View>

            <View style={{ height: 44, backgroundColor: '#FFFFFF', paddingLeft: 15 }}>
              <TextInput
                placeholder="Address"
                value={this.state.appointment_address}
                onChangeText={(appointment_address) => this.setState({appointment_address})}
                style={styles.textField} />
            </View>

            <View style={{ height: 44, backgroundColor: '#FFFFFF', paddingLeft: 15 }}>
              <TextInput
                placeholder="City"
                value={this.state.appointment_city}
                onChangeText={(appointment_city) => this.setState({appointment_city})}
                style={styles.textField} />
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

export default connect(mapStateToProps, {createLead, getUserList})(LeadCreate);
