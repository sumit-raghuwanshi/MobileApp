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
import COLOR from '../../../constants/colors';
import Touchable from '../../common/touchable';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../../../actions';
import MeasurementInnerList from './measurement-inner-list';

class MeasurementInner extends Component {

    static navigatorStyle = {
        navBarHidden: true
    }

    _navigateToDashboard = () => {
        this.props.navigator.popToRoot()
    }

    _navigateToPreviousScreen = () => {
        this.props.navigator.pop()
    }

    _handleEdit = () => {
        this.props.navigator.push({
            screen: "roof_gravy.upload_xml"
          })
    }

    _onItemPress = (item) => {
    }

    render(){
        return(
        <View style={styles.container}>
            <StatusBar barStyle="light-content"/>

            <View style={{height:100}}>
                <SafeAreaView style={styles.header}>
                    <Touchable style={{ width: 50, alignItems: 'center', justifyContent: 'center' }} onPress={this._navigateToDashboard}>
                        <Image source={require('../../../../img/icons/home.png')} />
                    </Touchable>
                    
                    <Touchable style={{ width: 50, alignItems: 'center', justifyContent: 'center' }}>
                        <View></View>
                    </Touchable>
                </SafeAreaView>
                <View style={{ flex: 1, alignItems: 'center', position:'absolute', zIndex:12, alignSelf:'center', top:15}}>
                    <Text style={{ fontSize: 16, color: '#FFFFFF', fontWeight: '600' }}>Measurements</Text>
                    <View style={{marginTop:10, height:50, width:50, borderRadius:25, backgroundColor:'rgba(239, 146, 57, 1)', justifyContent:'center', alignItems:'center'}} >
                        <Image style={{ height:35, width:35}} source={require('../../../../img/measurements/measurement.png')}/>
                    </View>
                </View>
            </View>


                <View style={{justifyContent:'space-between', top:70, position:'absolute', flexDirection:'row', alignItems:'center', let:0, width:screenWidth }}>
                    <Touchable style={{padding:10}} onPress={this._navigateToPreviousScreen}>
                        <Image source={require('../../../../img/icons/cross.png')}/>
                    </Touchable>
                    <Touchable style={{padding:10}} onPress={this._handleEdit}>
                        <View style={{height:30, width:85, borderColor:'gray', backgroundColor:'white', borderWidth:1, justifyContent:'center', alignItems:'center', borderRadius:4}}>
                            <Text style={{fontSize:12}}>UPLOAD XML</Text>
                        </View>
                    </Touchable>
                </View>


                <View style={{marginTop:20, marginBottom:20}}>
                    <Touchable style={{backgroundColor:'white', height:40, width:screenWidth, marginBottom:1, justifyContent:'center', paddingLeft:10}}>
                        <Text style={{fontWeight:'500'}}>Measurement Type</Text>
                    </Touchable>
                    <Touchable style={{backgroundColor:'white', height:40, width:screenWidth, justifyContent:'center', paddingLeft:10}}>
                        <Text style={{fontWeight:'500'}}>Measurement Name</Text>
                    </Touchable>
                </View>


                <MeasurementInnerList
                        onItemPress={this._onItemPress}
                        messages={[{}, {}, {}]}
                />

        </View>
        )
    }
}

const screenWidth = Dimensions.get('window').width;

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

export default connect(mapStateToProps, mapDispatchToProps)(MeasurementInner);