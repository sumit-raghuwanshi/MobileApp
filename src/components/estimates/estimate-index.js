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
import EstimateList from './estimate-list';
import {connect} from 'react-redux';
import {getEstimates} from '../../actions';

class EstimatesIndex extends Component {
  static navigatorStyle = {
    navBarHidden: true
  }

  constructor(props) {
    super(props);
      this.state={
          job_id:'',
          loading: "",
          estimates: []
    }
  }


  componentDidMount() {

  this.setState({
        job_id:this.props.item.id
    },()=>{
      this.props.getEstimates(this.state.job_id)
      .then((response)=>{
        this.setState({
          estimates: response.data.estimates
        });
      })
      .catch((error) =>{
          console.log("error ", error)
      })
  });
  }

  _navigateToDashboard = () => {
    this.props.navigator.popToRoot()
  }

  async callBack(){
    this.props.getEstimates()
    .then((response) => {
      console.log(JSON.stringify(response))
      this.setState({loading: false})
    })
    .catch((error) => {
      this.setState({loading: false})
    })
  }

  _onItemPress = (item) => {

    const job_id = this.state.job_id
    this.props.navigator.push({
      screen: "roof_gravy.estimate_view",
      passProps: { item: item ,job_id: job_id, callBack : this.callBack.bind(this)}
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
            <Image style={styles.safeAreaImage} source={require('../../../img/icons/estimate.png')}/>
            <Text style={styles.safeAreaText}>Estimates</Text>
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

          <EstimateList
            onItemPress={this._onItemPress}
            estimates={this.state.estimates}
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
    marginTop: 10,
    marginLeft: 90,
    width: 35,
    height: 35
  },

  safeAreaText: {
    marginLeft: 5,
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

export default connect(mapStateToProps, {getEstimates})(EstimatesIndex)
