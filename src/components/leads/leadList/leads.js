import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  StatusBar,
  Image,
  ListView
} from 'react-native';
import { Touchable, Loader } from '../../common';
import LeadList from './lead-list';
import {connect} from 'react-redux';
import {getLeads} from '../../../actions';

import LeadListItem from './lead-list-item';

class Leads extends Component {
  static navigatorStyle = {
    navBarHidden: true
  }

  state = {
    loading: true,
    leads : []
  }
  constructor(props){
    super(props)
    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 != r2})
  }

  componentWillReceiveProps(){
   
    console.log("getting props for lead list " , this.props);
  }

  componentDidMount() {
   
    this.props.getLeads()
    .then((response) => {
     
      console.log("Hello data ",response.data.leads)

      if (typeof response != "undefined"){
        if (typeof response.data.leads != "undefined"){
          this.setState({leads : response.data.leads})
        }
      }
      this.setState({loading: false})
    })
    .catch((error) => {
      this.setState({loading: false})
    })
  }

  _navigateToDashboard = () => {
    this.props.navigator.popToRoot()
  }

  _navigateToLeadCreateScreen = () => {
    this.props.navigator.push({
      screen: "roof_gravy.lead_create",
      passProps: {callBack : this.callBack.bind(this)}
    })
  }

  async callBack(){
    this.props.getLeads()
    .then((response) => {
     
      console.log("Hello data ",response.data.leads)

      if (typeof response != "undefined"){
        if (typeof response.data.leads != "undefined"){
          this.setState({leads : response.data.leads})
        }
      }
      this.setState({loading: false})
    })
    .catch((error) => {
      this.setState({loading: false})
    })
 }


  _onItemPress = (item) => {
    console.log("itemssssssssss" ,item )
    this.props.navigator.push({
      screen: "roof_gravy.lead_details",
      passProps: { item: item }
    })
  }

  render() {
  
    console.log("==========>",this.props)
    var dataSource = this.ds.cloneWithRows(this.props.leads)

    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content"/>

        <SafeAreaView style={styles.header}>
          <Touchable style={{ width: 50, alignItems: 'center', justifyContent: 'center' }} onPress={this._navigateToDashboard}>
            <Image source={require('../../../../img/icons/home.png')} />
          </Touchable>
          <View style={{ flex: 1, alignItems: 'center' }}>
            <Text style={{ fontSize: 16, color: '#FFFFFF', fontWeight: '600' }}>LEADS</Text>
            <Image style={{ marginTop: 10 }} source={require('../../../../img/icons/jobs.png')}/>
          </View>
          <Touchable style={{ width: 50, alignItems: 'center', justifyContent: 'center' }}>
            <View></View>
          </Touchable>
        </SafeAreaView>

        <View style={styles.body}>
          <View style={styles.topButtonContainer}>
            <View style={styles.spaceFlex}></View>
            <Touchable style={styles.newButton} onPress={this._navigateToLeadCreateScreen}>
              <View style={styles.buttonContent}>
                <Image source={require('../../../../img/icons/add.png')}/>
                <Text style={styles.buttonText}>NEW</Text>
              </View>
            </Touchable>
          </View>
          <ListView
            enableEmptySections={true}
            style={styles.container}
            dataSource={dataSource}
            renderRow={(item) => (
              <LeadListItem lead={item} onPress={()=>this._onItemPress(item)}/>
            )} />
          {/* <LeadList
            onItemPress={this._onItemPress}
            leads={this.state.leads}
            /> */}
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
    leads: state.leads
  }
}

export default connect(mapStateToProps, {getLeads})(Leads)
