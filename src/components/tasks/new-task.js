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
  Dimensions,
  TextInput
} from 'react-native';
import COLOR from '../../constants/colors';
import Touchable from '../common/touchable';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../../actions';

class NewTask extends Component {

    static navigatorStyle = {
        navBarHidden: true
    }

    _navigateToDashboard = () => {
        this.props.navigator.popToRoot()
      }

    _onItemPress = (item) => {
        this.props.navigator.push({
            screen: 'roof_gravy.measurement_inner'
        })
    }

    _navigateToPreviousScreen = () => {
        this.props.navigator.pop()
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
                    <Text style={{ fontSize: 16, color: '#FFFFFF', fontWeight: '600' }}>Tasks</Text>
                    <View style={{marginTop:10, height:50, width:50, borderRadius:25, backgroundColor:'rgba(239, 146, 57, 1)', justifyContent:'center', alignItems:'center'}} >
                        <Image style={{ height:25, width:25}} source={require('../../../img/tasks/check-box.png')}/>
                    </View>
                </View>
            </View>


            <View style={{justifyContent:'space-between', top:70, position:'absolute', flexDirection:'row', alignItems:'center', let:0, width:screenWidth }}>
                <Touchable style={{padding:10}} onPress={this._navigateToPreviousScreen}>
                    <Image source={require('../../../img/icons/cross.png')}/>
                </Touchable>
                <Touchable style={{padding:10}} onPress={this._handleEdit}>
                    <View style={{height:30, width:85, borderColor:'gray', backgroundColor:'white', borderWidth:1, justifyContent:'center', alignItems:'center', borderRadius:4}}>
                        <Text style={{fontSize:12}}>SAVE</Text>
                    </View>
                </Touchable>
            </View>

            <Text style={{alignSelf:'center', fontSize:16, color:'#888888', marginTop:5}}>New Task</Text>

            <View style={{marginTop:10, marginBottom:10}}>
                <Touchable style={{backgroundColor:'white', height:40, width:screenWidth, marginBottom:1, justifyContent:'center', paddingLeft:10}}>
                    <Text style={{fontWeight:'500'}}>Subject</Text>
                </Touchable>
                <Touchable style={{backgroundColor:'white', height:40, width:screenWidth, justifyContent:'center', paddingLeft:10}}>
                    <Text style={{fontWeight:'500'}}>Due</Text>
                </Touchable>
            </View>

            <View style={{marginTop:20, marginBottom:10}}>
                <Touchable style={{backgroundColor:'white', height:40, width:screenWidth, marginBottom:1, justifyContent:'center', paddingLeft:10}}>
                    <Text style={{fontWeight:'500'}}>Assign To</Text>
                </Touchable>
            </View>

            <View style={{marginTop:20, marginBottom:10}}>
                <Touchable style={{backgroundColor:'white', height:200, width:screenWidth, marginBottom:1, justifyContent:'center'}}>
                <TextInput
                    style={{height: 200, paddingLeft:10}}
                    underlineColorAndroid="transparent"
                    selectionColor='rgba(239, 146, 57, 1)'
                />
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

export default connect(mapStateToProps, mapDispatchToProps)(NewTask);