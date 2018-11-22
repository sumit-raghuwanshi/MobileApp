import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  StatusBar,
  Image,
  BackHandler
} from 'react-native';
import { Touchable, Loader } from '../common';
import JobList from './job-list';
import {connect} from 'react-redux';
import {getJobs, getCustomerJobs } from '../../actions';

class Jobs extends Component {
  static navigatorStyle = {
    navBarHidden: true
  }
  state = {
    loading: true,
    flag: true
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);

    (this.props.user.role !== "Customer" ? this.props.getJobs() : this.props.getCustomerJobs()).then((response) => {
      this.setState({loading: false})
    })
    .catch((error) => {
      this.setState({loading: false})
    })
  }

  handleBackPress = () => {
    (this.props.user.role !== "Customer" ? this.props.getJobs() : this.props.getCustomerJobs()).then((response) => {
      this.setState({loading: false, flag: true})
    })
    .catch((error) => {
      this.setState({loading: false,flag: true})
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
    if(this.state.flag){
      this.setState({loading: true, flag: false})
      var screen_value = (this.props.user.role == "Customer") ? "roof_gravy.customer_job_details" : "roof_gravy.job_details"
      this.props.navigator.push({
        screen: screen_value,
        passProps: { item: item , callBack : this.callBack.bind(this)}
      })
    }

  }

  async callBack(){
    this.props.getJobs()
    .then((response) => {
      console.log("jobsssssssss", JSON.stringify(response))
      this.setState({loading: false})
    })
    .catch((error) => {
      this.setState({loading: false})
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
          <View style={styles.safeAreaView}>
            <Image style={styles.safeAreaImage} source={require('../../../img/icons/jobs.png')}/>
            <Text style={styles.safeAreaText}>JOBS</Text>
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
            jobs={this.props.jobs || this.props.companyjobs}
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
    marginTop: 0,
    backgroundColor: 'rgba(194, 185, 165, 0.31)'
  },
  header: {
    flexDirection: 'row',
    height: 66,
    backgroundColor: '#354052',
    zIndex: 1
  },
  body: {
    flex: 1,
    marginTop: 0
  },
  topButtonContainer: {
    flexDirection: 'row',
    height: 30,
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
  },
  safeAreaView:{
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center' 
  },
  safeAreaImage: {
    marginTop: 3,
    marginLeft: 100,
    width: 35,
    height: 35
  },

  safeAreaText: {
    marginLeft: 3,
    marginTop: 10,
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '600'
  } 
});

function mapStateToProps(state) {
  return {
    jobs: state.jobs,
    user: state.user
  }
}

export default connect(mapStateToProps, {getJobs, getCustomerJobs})(Jobs)
