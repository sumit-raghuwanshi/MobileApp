import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  SafeAreaView,
  AsyncStorage,
  StatusBar,
  ScrollView,
  Dimensions
} from 'react-native';
import COLOR from '../../constants/colors';
import Touchable from '../common/touchable';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../../actions';

class Estimate extends Component {

    static navigatorStyle = {
        navBarHidden: true
    }

    _navigateToDashboard = () => {
        this.props.navigator.popToRoot()
      }

    _onItemPress = (item) => {
        this.props.navigator.push({
            screen: 'roof_gravy.current_task'
        })
    }


    _onNextButtonPress = (item) => {
        this.props.navigator.push({
            screen: 'roof_gravy.estimate_internal'
        })
    }

    render(){
        return(
        <View style={styles.container}>
            <StatusBar barStyle="light-content"/>

            <View style={{height:100}}>
                <SafeAreaView style={styles.header}>
                    <Touchable style={{ width: 50, alignItems: 'center', justifyContent: 'center' }} onPress={this._navigateToDashboard}>
                        <Image source={require('../../../img/icons/home.png')} />
                    </Touchable>
                    
                    <Touchable style={{ width: 50, alignItems: 'center', justifyContent: 'center' }}>
                        <View></View>
                    </Touchable>
                </SafeAreaView>
                <View style={{ flex: 1, alignItems: 'center', position:'absolute', zIndex:12, alignSelf:'center', top:15}}>
                    <Text style={{ fontSize: 16, color: '#FFFFFF', fontWeight: '600' }}>Estimate</Text>
                    <View style={{marginTop:10, height:50, width:50, borderRadius:25, backgroundColor:'rgba(239, 146, 57, 1)', justifyContent:'center', alignItems:'center'}} >
                        <Image style={{ height:25, width:25}} source={require('../../../img/estimate/estimate.png')} resizeMode="contain"/>
                    </View>
                </View>
            </View>

            <Text style={{alignSelf:'center', marginBottom:10, fontSize:16, color:'#888888'}}>NEW SECTION</Text>

            <View style={{marginTop:20, marginBottom:20}}>
                <Touchable style={{backgroundColor:'white', height:40, width:screenWidth, marginBottom:1, justifyContent:'center', paddingLeft:10}}>
                    <Text style={{fontWeight:'500', fontSize:15}}>Customer</Text>
                </Touchable>
            </View>

            <View style={{marginTop:20, marginBottom:20}}>
                <Touchable style={{backgroundColor:'white', height:40, width:screenWidth, marginBottom:1, justifyContent:'center', paddingLeft:10}}>
                    <Text style={{fontWeight:'500', fontSize:15}}>Trade</Text>
                </Touchable>
                <Touchable style={{backgroundColor:'white', height:40, width:screenWidth, marginBottom:1, justifyContent:'center', paddingLeft:10}}>
                    <Text style={{fontWeight:'500', fontSize:15}}>Roofing Section (Estimate Name)</Text>
                </Touchable>
            </View>

            <View style={{marginTop:20, marginBottom:20}}>
                <Touchable style={{backgroundColor:'white', height:40, width:screenWidth, marginBottom:1, justifyContent:'center', paddingLeft:10}}>
                    <Text style={{fontWeight:'500', fontSize:15}}>Roofing Template (Select Template)</Text>
                </Touchable>
            </View>

            <View style={{marginTop:20, marginBottom:20, alignItems:'center'}}>
                <Touchable onPress={this._onNextButtonPress} style={{backgroundColor:'white', height:40, width:80, marginBottom:1, justifyContent:'center', borderColor:'gray', borderRadius:4, borderWidth:1, alignItems:'center'}}>
                    <Text style={{fontWeight:'500', fontSize:15}}>Next</Text>
                </Touchable>
            </View>

        </View>
        )
    }
}

const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    container: {
        position:'relative',
      flex: 1,
      backgroundColor: 'rgba(194, 185, 165, 0.31)'
    },
    header: {
      flexDirection: 'row',
      height: 66,
      backgroundColor: '#354052',
      zIndex: 1
    }
});

function mapStateToProps(state, ownProps) {
    return {
      user: state.user
    };
  };
  
  function mapDispatchToProps(dispatch) {
    return {
      actions: bindActionCreators(Actions, dispatch)
    };
  }

export default connect(mapStateToProps, mapDispatchToProps)(Estimate);