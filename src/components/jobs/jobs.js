import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  StatusBar,
  Image
} from 'react-native';
import { Touchable, Loader } from '../common';
import JobList from './job-list';
import {connect} from 'react-redux';
import {getJobs} from '../../actions';

class Jobs extends Component {
  static navigatorStyle = {
    navBarHidden: true
  }

  state = {
    loading: true
  }

  componentDidMount() {
    this.props.getJobs()
    .then((response) => {
      console.log("jobsssssssss", JSON.stringify(response))
      this.setState({loading: false})
    })
    .catch((error) => {
      this.setState({loading: false})
    })
  }

  _navigateToDashboard = () => {
    this.props.navigator.popToRoot()
  }

  _navigateToJobCreateScreen = () => {
    this.props.navigator.push({
      screen: "roof_gravy.job_create"
    })
  }

  _onItemPress = (item) => {
    this.props.navigator.push({
      screen: "roof_gravy.job_details",
      passProps: { item: item }
    })
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
            <Text style={{ fontSize: 16, color: '#FFFFFF', fontWeight: '600' }}>JOBS</Text>
            <Image style={{ marginTop: 10 }} source={require('../../../img/icons/jobs.png')}/>
          </View>
          <Touchable style={{ width: 50, alignItems: 'center', justifyContent: 'center' }}>
            <View></View>
          </Touchable>
        </SafeAreaView>

        <View style={styles.body}>
          <View style={styles.topButtonContainer}>
            <View style={styles.spaceFlex}></View>
            {/* <Touchable style={styles.newButton} onPress={this._navigateToJobCreateScreen}>
              <View style={styles.buttonContent}>
                <Image source={require('../../../img/icons/add.png')}/>
                <Text style={styles.buttonText}>NEW</Text>
              </View>
            </Touchable> */}
          </View>
          <JobList
            onItemPress={this._onItemPress}
            jobs={this.props.jobs}
            />
        </View>
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
    paddingHorizontal: 25
  },
  newButton: {
    justifyContent: 'center'
  },
  spaceFlex: {
    flex: 1
  },
  buttonContent: {
    alignItems: 'center'
  },
  buttonText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#999999',
    marginTop: 5
  }
});

function mapStateToProps(state) {
  return {
    jobs: state.jobs
  }
}

export default connect(mapStateToProps, {getJobs})(Jobs)
