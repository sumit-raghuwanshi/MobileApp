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
  TextInput,
  Slider
} from 'react-native';
import COLOR from '../../constants/colors';
import Touchable from '../common/touchable';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../../actions';

class EstimateInternal extends Component {

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


    _onCompletedTaskPress = (item) => {
        this.props.navigator.push({
            screen: 'roof_gravy.completed_task'
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

            <View style={{backgroundColor:'gray', width:screenWidth, height:25, flexDirection:'row', alignItems:'center', marginTop:20}}>
                <View style={{flex:3, justifyContent:'flex-start', alignItems:'center', flexDirection:'row'}}>
                    <Text style={{color:'white', fontWeight:'500', marginLeft:20}}>NAME</Text>
                </View>
                <View style={{flex:2, flexDirection:'row', justifyContent:'space-around', alignItems:'center'}}>
                    <Text style={{color:'white', fontWeight:'500'}}>COST</Text>
                    <Text style={{color:'white', fontWeight:'500'}}>PRICE</Text>
                </View>
            </View>

            <View style={{backgroundColor:'white', width:screenWidth, height:40, flexDirection:'row', alignItems:'center'}}>
                <View style={{flex:3, justifyContent:'flex-start', alignItems:'center', flexDirection:'row'}}>
                    <Text style={{color:'black', marginLeft:20}}>Milton Co. Estimate</Text>
                </View>
                <View style={{flex:2, flexDirection:'row', justifyContent:'space-around', alignItems:'center'}}>
                    <Text style={{color:'black'}}>$0.00</Text>
                    <Text style={{color:'black'}}>$0.00</Text>
                </View>
            </View>

            <View>
                <View style={{backgroundColor:'white', width:screenWidth, height:40, flexDirection:'row', alignItems:'center', marginTop:10, borderBottomColor:'gray', borderBottomWidth:1}}>
                    <Image source={require("../../../img/estimate/down-arrow.png")} style={{height:15, width:15, marginLeft:20, marginRight:10}} resizeMode="contain"/>
                    <Text style={{color:'black'}}>Roofing Section</Text>
                </View>
                <View style={{backgroundColor:'white', width:screenWidth, height:60, flexDirection:'row'}}>
                    <View style={{flex:3, justifyContent:'flex-start', alignItems:'center', flexDirection:'row'}}>
                        <View style={{flexDirection:'column'}}>
                            <Text style={{color:'gray', marginLeft:20, fontSize:12}}>Steep Slope - Build Cricket</Text>
                            <View style={{flexDirection:'row', marginTop:5}}>
                                <Touchable style={{height:30, width:30, marginLeft:20}}>
                                    <Image style={{height:20, width:20}} source={require('../../../img/estimate/trash.png')} resizeMode='contain'/>
                                </Touchable>
                                <TextInput style={{width:40, height:20, borderColor:'gray', borderWidth:1, borderRadius:4, paddingVertical:0, color:'gray', fontSize:10}} underlineColorAndroid='transparent'/>
                                <TextInput style={{marginLeft:10, width:40, height:20, borderColor:'gray', borderWidth:1, borderRadius:4, paddingVertical:0, color:'gray', fontSize:10}} underlineColorAndroid='transparent'/>
                            </View>
                        </View>
                    </View>
                    <View style={{flex:2, flexDirection:'row', justifyContent:'space-around', marginTop:5}}>
                        <Text style={{color:'gray', fontSize:12}}>$0.00</Text>
                        <Text style={{color:'gray', fontSize:12}}>$0.00</Text>
                    </View>
                </View>

                <View style={{backgroundColor:'gray', height:1, width:screenWidth - 40, marginHorizontal:20}}/>

                <View style={{backgroundColor:'white', width:screenWidth, height:60, flexDirection:'row'}}>
                    <View style={{flex:3, justifyContent:'flex-start', alignItems:'center', flexDirection:'row'}}>
                        <View style={{flexDirection:'column'}}>
                            <Text style={{color:'gray', marginLeft:20, fontSize:12}}>Steep Slope - Build Cricket</Text>
                            <View style={{flexDirection:'row', marginTop:5}}>
                                <Touchable style={{height:30, width:30, marginLeft:20}}>
                                    <Image style={{height:20, width:20}} source={require('../../../img/estimate/trash.png')} resizeMode='contain'/>
                                </Touchable>
                                <TextInput style={{width:40, height:20, borderColor:'gray', borderWidth:1, borderRadius:4, paddingVertical:0, color:'gray', fontSize:10}} underlineColorAndroid='transparent'/>
                                <TextInput style={{marginLeft:10, width:40, height:20, borderColor:'gray', borderWidth:1, borderRadius:4, paddingVertical:0, color:'gray', fontSize:10}} underlineColorAndroid='transparent'/>
                            </View>
                        </View>
                    </View>
                    <View style={{flex:2, flexDirection:'row', justifyContent:'space-around', marginTop:5}}>
                        <Text style={{color:'gray', fontSize:12}}>$0.00</Text>
                        <Text style={{color:'gray', fontSize:12}}>$0.00</Text>
                    </View>
                </View>

                <View style={{backgroundColor:'gray', height:1, width:screenWidth - 40, marginHorizontal:20}}/>

                <View style={{backgroundColor:'white', width:screenWidth, height:60, flexDirection:'row', alignItems:'center'}}>
                    <TextInput style={{borderColor:'gray', borderWidth:1, height:25, width:screenWidth/2 - 40, paddingVertical:0, marginLeft:20}} placeholder="Add Item" underlineColorAndroid='transparent'/>
                    <Touchable style={{backgroundColor:'gray', height:25, width:25, justifyContent:'center', alignItems:'center'}}>
                        <Image source={require('../../../img/estimate/search.png')} style={{height:15, width:15}}/>
                    </Touchable>
                    <Touchable style={{backgroundColor:'white', height:25, width:70, justifyContent:'center', alignItems:'center', borderColor:'gray', borderWidth:1, borderRadius:2, marginLeft:10}}>
                        <Text style={{fontSize:12, color:'gray', fontWeight:'500'}}>BROWSE</Text>
                    </Touchable>
                </View>

                <View style={{backgroundColor:'gray', height:1, width:screenWidth - 40, marginHorizontal:20}}/>

                <View style={{backgroundColor:'white', width:screenWidth, height:90, flexDirection:'row'}}>
                    <View style={{flex:3, justifyContent:'flex-start', flexDirection:'row', marginTop:10}}>
                        <View style={{flexDirection:'column'}}>
                            <Text style={{color:'gray', marginLeft:20, fontSize:12}}>Profit Margin</Text>
                            <View style={{flexDirection:'row', marginTop:5}}>
                                <TextInput style={{marginLeft:20, width:50, height:25, borderColor:'gray', borderWidth:1, borderRadius:4, paddingVertical:0, color:'gray', fontSize:10}} underlineColorAndroid='transparent'/>
                                <TextInput style={{marginLeft:10, width:40, height:25, borderColor:'gray', borderWidth:1, borderRadius:4, paddingVertical:0, color:'gray', fontSize:10}} underlineColorAndroid='transparent'/>
                            </View>
                            <Slider style={{width:screenWidth - 100, marginTop:10, color:'gray'}}/>
                        </View>
                    </View>
                    <View style={{flex:2, flexDirection:'row', justifyContent:'space-around', marginTop:10}}>
                        <Text style={{color:'gray', fontSize:12}}>$0.00</Text>
                        <Text style={{color:'gray', fontSize:12}}>$0.00</Text>
                    </View>
                </View>

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

export default connect(mapStateToProps, mapDispatchToProps)(EstimateInternal);