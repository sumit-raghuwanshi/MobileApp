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

class CurrentTask extends Component {

    constructor(props){
        super(props);
        this.state ={
            showDeleteAlert:'none',
            showCompletedAlert:'none',
            message:''
        }
    }

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

    onTaskCompleteShow = () => {
        this.setState({
            showCompletedAlert:'flex'
        })
    }

    onTaskCompleteHide = () => {
        this.setState({
            showCompletedAlert:'none'
        })
        this._navigateToPreviousScreen();
    }

    onTaskDelete = () => {
        this.setState({
            showCompletedAlert:'none'
        })
        this._navigateToPreviousScreen();
    }

    onTaskDeleteShow = () => {
        this.setState({
            showDeleteAlert:'flex'
        })
    }

    onTaskDeleteHide = () => {
        this.setState({
            showDeleteAlert:'none'
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
            </View>

            <Text style={{alignSelf:'center', fontSize:16, color:'#888888', marginTop:5}}>Current Task</Text>

            <ScrollView>
                <View style={{marginTop:10, marginBottom:10}}>
                    <Touchable style={{backgroundColor:'white', height:40, width:screenWidth, marginBottom:1, justifyContent:'center', paddingLeft:10}}>
                        <Text style={{fontWeight:'500'}}>Call Joe</Text>
                    </Touchable>
                    <Touchable style={{backgroundColor:'white', height:40, width:screenWidth, justifyContent:'center', paddingLeft:10, paddingRight:10}}>
                        <View style={{justifyContent:'space-between', flexDirection:'row'}}>
                            <Text style={{fontWeight:'500'}}>September 7, 2017</Text>
                            <Text style={{fontWeight:'500'}}>3:30 PM</Text>
                        </View>
                    </Touchable>
                </View>

                <View style={{marginTop:20, marginBottom:10}}>
                    <Touchable style={{backgroundColor:'white', height:40, width:screenWidth, marginBottom:1, justifyContent:'center', paddingLeft:10}}>
                        <Text style={{fontWeight:'500'}}>Assigned To Me</Text>
                    </Touchable>
                </View>

                <View style={{marginTop:20, marginBottom:10}}>
                    <Touchable style={{backgroundColor:'white', height:200, width:screenWidth, marginBottom:1, justifyContent:'center'}}>
                    <TextInput
                        style={{height: 200, paddingLeft:10}}
                        underlineColorAndroid="transparent"
                        selectionColor='rgba(239, 146, 57, 1)'
                        value="Call to schedule appointment"
                    />
                    </Touchable>
                </View>

                <View style={{width:screenWidth, flexDirection:'row', justifyContent:'space-around', marginTop:20, paddingHorizontal:20}}>
                    <Touchable onPress={this.onTaskCompleteShow}>
                        <View style={{justifyContent:'center', alignItems:'center'}}>
                            <View style={{marginTop:10, height:50, width:50, borderRadius:25, backgroundColor:'rgba(239, 146, 57, 1)', justifyContent:'center', alignItems:'center', marginBottom:5}} >
                                <Image style={{ height:25, width:25}} source={require('../../../img/tasks/check-box.png')}/>
                            </View>
                            <Text style={{color:'#888888'}}>Task Completed</Text>
                        </View>
                    </Touchable>
                    <Touchable onPress={this.onTaskDeleteShow}>
                        <View style={{justifyContent:'center', alignItems:'center'}}>
                            <View style={{marginTop:10, height:50, width:50, borderRadius:25, backgroundColor:'rgba(239, 146, 57, 1)', justifyContent:'center', alignItems:'center', marginBottom:5}} >
                                <Image style={{ height:25, width:25}} source={require('../../../img/tasks/trash-white.png')}/>
                            </View>
                            <Text style={{color:'#888888'}}>Delete Task</Text>
                        </View>
                    </Touchable>
                </View>
            </ScrollView>

            <View style={{display:this.state.showCompletedAlert, width:screenWidth*0.8, height:200, zIndex:20, elevation:5, position:'absolute', top:screenHeight/2-100, left:screenWidth*0.1, backgroundColor:'white', justifyContent:'center', alignItems:'center' }}>
                <View style={{marginVertical:30, marginHorizontal:40, justifyContent:'center', alignItems:'center'}}>
                    <View style={{marginTop:10, height:50, width:50, borderRadius:25, backgroundColor:'rgba(239, 146, 57, 1)', justifyContent:'center', alignItems:'center', marginBottom:10}} >
                        <Image style={{ height:25, width:25}} source={require('../../../img/tasks/check-box.png')}/>
                    </View>
                    <Text numberOfLines={3} style={{fontSize:17, textAlign:'center'}}>
                        {"Task Completed"}
                    </Text>
                    <View style={{flexDirection:'row', marginTop:10}}>
                        <Touchable onPress={this.onTaskCompleteHide} style={{backgroundColor:'white', borderRadius:4, borderColor:'#888888', borderWidth:1, justifyContent:'center', alignItems:'center', height:25, width:60}}>
                            <Text style={{fontSize:12, color:'#888888'}}>OK</Text>
                        </Touchable>
                    </View>
                </View>
                
            </View>
            
            <View style={{display:this.state.showDeleteAlert, width:screenWidth*0.8, height:200, zIndex:20, elevation:5, position:'absolute', top:screenHeight/2-100, left:screenWidth*0.1, backgroundColor:'white', justifyContent:'center', alignItems:'center' }}>
                <View style={{marginVertical:30, marginHorizontal:40, justifyContent:'center', alignItems:'center'}}>
                    <View style={{marginTop:10, height:50, width:50, borderRadius:25, backgroundColor:'rgba(239, 146, 57, 1)', justifyContent:'center', alignItems:'center', marginBottom:10}} >
                        <Image style={{ height:25, width:25}} source={require('../../../img/tasks/check-box.png')}/>
                    </View>
                    <Text numberOfLines={3} style={{fontSize:17, textAlign:'center'}}>
                        {"Are you sure you would like to DELETE this task?"}
                    </Text>
                    <View style={{flexDirection:'row', marginTop:10}}>
                        <Touchable onPress={this.onTaskDeleteHide} style={{backgroundColor:'white', borderRadius:4, borderColor:'#888888', borderWidth:1, justifyContent:'center', alignItems:'center', height:25, width:60}}>
                            <Text style={{fontSize:12, color:'#888888'}}>CANCEL</Text>
                        </Touchable>
                        <Touchable onPress={this.onTaskDelete} style={{backgroundColor:'#888888', borderRadius:4, justifyContent:'center', alignItems:'center', height:25, width:60, marginLeft:20}}>
                            <Text style={{fontSize:12, color:'white'}}>DELETE</Text>
                        </Touchable>
                    </View>
                </View>
                
            </View>

        </View>
        )
    }
}

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

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

export default connect(mapStateToProps, mapDispatchToProps)(CurrentTask);