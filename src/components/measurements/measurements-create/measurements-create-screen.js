import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  SafeAreaView,
  StatusBar,
  Image,
} from 'react-native';
import {
  TextInput,
  Touchable,
  Picker,
  TouchableField,
  Loader
} from '../../common';
import MeasurementInput from './measurement-input';
import {connect} from 'react-redux';
import {getJobs, updateJob} from '../../../actions';
import {Notification} from '../../../helpers';
import _ from 'lodash';

class MeasurementsCreateScreen extends Component {
  static navigatorStyle = {
    navBarHidden: true
  }

  constructor(props) {
    super(props)

    var {currentUser} = this.props

    this.state = {
      measurements: []
    }
  }

  componentDidMount() {
    this.props.getJobs().then(response => {

    })
  }

  _navigateToDashboard = () => {
    this.props.navigator.popToRoot()
  }

  _navigateToPreviousScreen = () => {
    this.props.navigator.pop()
  }

  _submit = () => {
    var state = this.state

    var {jobId, mType, name, measurements} = this.state
    var errorMessages = []

    //
    if (typeof jobId == "undefined")
      errorMessages.push('Job is required')
    //
    if (typeof mType == "undefined")
      errorMessages.push('Measurement Type is required')
    //
    if (!name)
      errorMessages.push('Measurement Name is required')

    if (_.some(measurements, (m) => !m))
      errorMessages.push('Measurement value missing')

    if (errorMessages.length > 0) {
      Notification.error(_.join(errorMessages, "\n"))

      return
    }
    //
    this.setState({loading: true})
    var measurementType = this.props.currentUser["measurement_types"][mType]

    var params = {
      "job": {
        "measurements_attributes": [{
          "name": name,
          "m_type": mType,
          "items_attributes": _.map(measurementType["values"], (item, index) => ({
            "item_name": item[0],
            "unit": item[1],
            "value": measurements[index]
          }))
        }]
      }
    }


    this.props.updateJob(jobId, params)
    .then((response) => {
      this.setState({loading: false}, this._navigateToPreviousScreen)
    })
    .catch((error) => {
      this.setState({loading: false})
    })
  }

  _onMeasurementTypeChange = (mType) => {
    var measurementType = this.props.currentUser["measurement_types"][mType]

    this.setState({
      mType,
      measurements: new Array(measurementType["values"].length).fill('')
    })
  }

  _onChangeText = (value, index) => {
    var measurements = _.clone(this.state.measurements)

    measurements[index] = value

    this.setState({measurements})
  }

  _renderMeasurementFields = () => {
    var {currentUser} = this.props
    var measurementType = currentUser["measurement_types"][this.state.mType]

    if (!measurementType)
      return null

    return (
      <View>
        {
          _.map(measurementType["values"], (item, index) => (
            <View style={{marginBottom: 20}} key={index}>
              <MeasurementInput
                keyboardType="numeric"
                label={item[0]}
                unit={item[1]}
                value={this.state.measurements[index]}
                onChangeText={(value) => this._onChangeText(value, index)}/>
            </View>
          ))
        }
      </View>
    )
  }

  renderItem = (label, unit) => {

  }

  render() {
    var {currentUser} = this.props

    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content"/>

        <SafeAreaView style={styles.header}>
          <Touchable style={{ width: 50, alignItems: 'center', justifyContent: 'center' }} onPress={this._navigateToDashboard}>
            <Image source={require('../../../../img/icons/home.png')} />
          </Touchable>
          <View style={{ flex: 1, alignItems: 'center' }}>
            <Text style={{ fontSize: 16, color: '#FFFFFF', fontWeight: '600' }}>Measurements</Text>
            <Image style={{ marginTop: 10 }} source={require('../../../../img/icons/measurements.png')}/>
          </View>
          <Touchable style={{ width: 50, alignItems: 'center', justifyContent: 'center' }}>
            <View></View>
          </Touchable>
        </SafeAreaView>

        <ScrollView style={styles.body} contentContainerStyle={{paddingBottom: 20}}>
          <View style={styles.topButtonContainer}>
            <View style={{ flex: 1 }}>
              <Touchable onPress={this._navigateToPreviousScreen}>
                <Image source={require('../../../../img/icons/cross.png')}/>
              </Touchable>
            </View>
            <View style={{flex: 1, alignItems: 'flex-end'}}>
              <Touchable onPress={this._submit}>
                <Image source={require('../../../../img/icons/save.png')}/>
              </Touchable>
            </View>
          </View>

          <Picker
            placeholder="Select Job"
            selectedValue={this.state.jobId}
            onValueChange={(jobId) => this.setState({jobId})}
            items={_.map(this.props.jobs, (job) => ({label: job.contact ? job.contact : "N/A", value: job.id }))}
            />

          <View style={{height: 30}}/>

          <Picker
            placeholder="Measurement Type"
            selectedValue={this.state.mType}
            onValueChange={this._onMeasurementTypeChange}
            items={_.map(currentUser["measurement_types"], (mt, index) => ({label: mt.name, value: index }))}
            />

          <TextInput
            placeholder="Measurement Name"
            value={this.state.name}
            onChangeText={(name) =>  this.setState({name})}/>

          <View style={styles.groupSeparator}/>

          {
            this._renderMeasurementFields()
          }

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
  topButtonContainer: {
    flexDirection: 'row',
    height: 80,
    paddingLeft: 25,
    paddingRight: 10,
    paddingTop: 20,
    paddingBottom: 10
  },
  groupSeparator: {
    height: 30
  }
});

function mapStateToProps(state) {
  return {
    currentUser: state.user,
    jobs: state.jobs
  }
}

export default connect(mapStateToProps, {getJobs, updateJob})(MeasurementsCreateScreen)
