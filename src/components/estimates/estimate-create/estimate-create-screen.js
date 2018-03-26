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
import Section from './section.js';
import {connect} from 'react-redux';
import {getJobs, updateJob, getTemplates} from '../../../actions';
import {Notification} from '../../../helpers';
import _ from 'lodash';

class EstimateCreateScreen extends Component {
  static navigatorStyle = {
    navBarHidden: true
  }

  constructor(props) {
    super(props)

    this.state = {
      loading: true,
      sections: []
    }
  }

  componentDidMount() {
    Promise.all([this.props.getJobs(), this.props.getTemplates()])
    .then(response => {
      this.setState({loading: false}, () => {
        this.props.navigator.showModal({
          screen: 'roof_gravy.estimate_job_selection',
          passProps: {
            onSubmit: (params) => {
              this.props.navigator.dismissModal()
              this.setState(params, () => {
                setTimeout(this._addSection, 500)
              })
            }
          }
        })
      })
    })
    .catch(error => {
      this.setState({loading: false}, this._navigateToPreviousScreen)
    })
  }

  _addSection = () => {
    this.props.navigator.showModal({
      screen: 'roof_gravy.estimate_section_create',
      passProps: {
        onSubmit: (params) => {
          this.props.navigator.dismissModal()

          var sections = this.state.sections.slice()
          sections.push(params)
          this.setState(params)
        }
      }
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

    if (typeof jobId == "undefined")
      errorMessages.push('Job is required')

    if (typeof mType == "undefined")
      errorMessages.push('Measurement Type is required')

    if (!name)
      errorMessages.push('Measurement Name is required')

    if (_.some(measurements, (m) => !m))
      errorMessages.push('Measurement value missing')

    if (errorMessages.length > 0) {
      Notification.error(_.join(errorMessages, "\n"))

      return
    }

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

          <View style={styles.estimateHeader}>
            <View style={[styles.estimateHeaderColumn, styles.flex2]}>
              <Text style={styles.estimateHeaderText}>{"NAME"}</Text>
            </View>

            <View style={[styles.estimateHeaderColumn, styles.flex1]}>
              <Text style={styles.estimateHeaderText}>{"COST"}</Text>
            </View>
            <View style={[styles.estimateHeaderColumn, styles.flex1]}>
              <Text style={styles.estimateHeaderText}>{"PRICE"}</Text>
            </View>
          </View>

          <View style={{height: 50, flexDirection: 'row', backgroundColor: 'white', paddingHorizontal: 10}}>
            <View style={[styles.estimateColumn, styles.flex2]}>
              <Text style={styles.estimateText}>{"NAME"}</Text>
            </View>
            <View style={[styles.estimateColumn, styles.flex1]}>
              <Text style={styles.estimateText}>{"NAME"}</Text>
            </View>
            <View style={[styles.estimateColumn, styles.flex1]}>
              <Text style={styles.estimateText}>{"NAME"}</Text>
            </View>
          </View>

          <View style={styles.groupSeparator}/>

          <Section />

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
    height: 20
  },
  bottomBottomContainer: {
    alignItems: 'center'
  },
  estimateHeader: {
    backgroundColor: "#919599",
    height: 25,
    flexDirection: 'row',
    paddingHorizontal: 10
  },
  flex1: {
    flex: 1
  },
  flex2: {
    flex: 2
  },
  estimateHeaderColumn: {
    justifyContent: 'center'
  },
  estimateHeaderText: {
    fontSize: 16,
    color: 'white',
    fontWeight: '800'
  },
  estimateColumn: {
    justifyContent: 'center'
  },
  estimateText: {
    fontSize: 18,
    color: "rgba(0, 0, 0, 0.8)"
  }
});

function mapStateToProps(state) {
  return {
    currentUser: state.user,
    jobs: state.jobs,
    templates: state.templates
  }
}

export default connect(mapStateToProps, {getJobs, updateJob, getTemplates})(EstimateCreateScreen)
