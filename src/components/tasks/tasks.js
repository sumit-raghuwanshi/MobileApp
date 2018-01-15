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
import TaskList from './task-list';

class Tasks extends Component {

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

    _onNewTaskPress = (item) => {
        this.props.navigator.push({
            screen: 'roof_gravy.new_task'
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

            <View style={{height:100, marginBottom:40}}>
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

            <View style={{justifyContent:'space-between', position:'absolute', top:70, left:0, width:screenWidth, flexDirection:'row', alignItems:'center'}}>
                <Touchable style={{padding:10}} onPress={this._onCompletedTaskPress}>
                    <View style={{flex:1, justifyContent:'flex-end'}}>
                        <Text>View Completed</Text>
                    </View>
                </Touchable>
                <Touchable style={{padding:10}} onPress={this._onNewTaskPress}>
                    <View style={{justifyContent:'center', alignItems:'center', flexDirection:'column'}}>
                        <Image style={{height:30, width:30}} source={require('../../../img/tasks/add.png')}/>
                        <Text>New Task</Text>
                    </View>
                </Touchable>
            </View>

                <TaskList
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

export default connect(mapStateToProps, mapDispatchToProps)(Tasks);