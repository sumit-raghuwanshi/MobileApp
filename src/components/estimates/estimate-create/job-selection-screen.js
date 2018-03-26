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
import {connect} from 'react-redux';
import {getJobs, updateJob, getTemplates} from '../../../actions';
import {Notification} from '../../../helpers';
import _ from 'lodash';

class JobSelectionScreen extends Component {
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
    this.props.getJobs()
    .then(response => {
      this.setState({loading: false})
    })
    .catch(error => {
      this.setState({loading: false})
    })
  }

  _navigateToDashboard = () => {
    this.props.navigator.popToRoot()
  }

  _navigateToPreviousScreen = () => {
    this.props.navigator.pop()
  }

  _submit = () => {
    var {jobId} = this.state
    var errorMessages = []

    if (typeof jobId == "undefined")
      errorMessages.push('Job is required')

    if (errorMessages.length > 0) {
      Notification.error(_.join(errorMessages, "\n"))

      return
    }

    this.props.onSubmit && this.props.onSubmit({jobId})
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
            <Text style={{ fontSize: 16, color: '#FFFFFF', fontWeight: '600' }}>Estimate</Text>
            <Image style={{ marginTop: 10 }} source={require('../../../../img/icons/estimate.png')}/>
          </View>
          <Touchable style={{ width: 50, alignItems: 'center', justifyContent: 'center' }}>
            <View></View>
          </Touchable>
        </SafeAreaView>

        <ScrollView style={styles.body} contentContainerStyle={{paddingBottom: 20}}>
          <View style={styles.topButtonContainer}>

          </View>

          <Picker
            placeholder="Select Job"
            selectedValue={this.state.jobId}
            onValueChange={(jobId) => this.setState({jobId})}
            items={_.map(this.props.jobs, (job) => ({label: job.contact ? job.contact : "N/A", value: job.id }))}
            />

          <View style={styles.groupSeparator}/>

          <View style={styles.bottomBottomContainer}>
            <Touchable onPress={this._submit}>
              <View style={styles.submitButton}>
                <Text style={styles.submitButtonText}>Next</Text>
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
  topButtonContainer: {
    height: 80,
    paddingLeft: 25,
    paddingRight: 10,
    paddingTop: 20,
    paddingBottom: 10
  },
  groupSeparator: {
    height: 30
  },
  bottomBottomContainer: {
    alignItems: 'center'
  },
  submitButton: {
    borderWidth: 1,
    borderColor: "#919599",
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 7,
    paddingHorizontal: 15,
    backgroundColor: 'white'
  },
  submitButtonText: {
    color: '#919599'
  }

});

function mapStateToProps(state) {
  return {
    jobs: state.jobs,
  }
}

export default connect(mapStateToProps, {getJobs})(JobSelectionScreen)
