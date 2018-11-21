import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  TextInput,
  SafeAreaView,
  AsyncStorage,
  StatusBar,
  ScrollView,
  TouchableHighlight,
  Modal,
  FlatList,
  TouchableOpacity
} from 'react-native';
// import COLOR from '../../constants/colors';
import SelectMultiple from 'react-native-select-multiple'
import { Touchable, Picker, Loader, DateTimePicker } from '../common';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {Notification} from '../../helpers';
import _ from 'lodash';

import {getParticularUser} from '../../actions';
import ImagePicker from 'react-native-image-picker';
import PopupDialog , {DialogTitle}from 'react-native-popup-dialog';
import moment from 'moment';
import RNActionCable from 'react-native-actioncable';
import ActionCableProvider, { ActionCable } from 'react-actioncable-provider';
import { WS_CABLE_URL } from '../../constants/api';


class CustomerChat extends Component {
  static navigatorStyle = {
    navBarHidden: true
  };


  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      user: null,
      item: null,
      typing: '',
      token: null,
      messages: [],
      
    }
    this._getParticularUser = this._getParticularUser.bind(this);
  	this.renderItem = this.renderItem.bind(this);
  	this.sendMessage = this.sendMessage.bind(this);
  	// this.onReceivedConversation = this.onReceivedConversation.bind(this)
  	this.onConnected = this.onConnected.bind(this)
  
  }

 
  componentWillMount(){
    if(this.props.user != undefined){
      this.setState({
        user: this.props.user,
        messages: this.props.user.messages,
      })
    }
  }

  componentDidMount(){
    this._getParticularUser()
    this.actioncableAdd()
  }

  async callBack(){
    await this.props.getParticularUser(this.props.user_id,this.props.job)
    .then((response) => {
      this.setState({
        loading: false,
        item : response.data,
        messages: response.data.messages
      })
    })
    .catch(error => {
      this.setState({
        loading: false,
        messages: []
      })
    })
  }

  async actioncableAdd(){
    const result = await AsyncStorage.getItem('currentUser')
  	token = JSON.parse(result).token
    user_id = JSON.parse(result).id
  	this.setState({current_user_id: user_id, token: token})
  }


  _getParticularUser(){

    this.props.getParticularUser(this.props.user_id, this.props.job)
    .then((response) => {
      // console.log("getting particular item" , response.data)
      this.setState({
        loading: false,
        item : response.data,
        user_id: this.props.user_id,
        messages: response.users.user.messages
      })
    })
    .catch(error => {
      this.setState({
        loading: false,
        user_id:this.props.user_id,
        messages: []
      })
    })
  }


 
  _navigateToDashboard = () => {
    this.props.navigator.popToRoot()
  }

 
  _navigateToPreviousScreen = () => {
    var screen_value = "roof_gravy.customer_job_details"
      this.props.navigator.push({
        screen: screen_value,
        passProps: { item: this.props.job , callBack : this.callBack.bind(this)}
    })
  }

  _capitalizeString = (value) => {
  	return value.replace(/\b\w/g, function(l){ return l.toUpperCase() })
  }



  sendMessage(){
    let user  = this.state.user ||  this.props.user
    var data = {
        message:this.state.typing.trim(),
        conversation_id: user.conversation._id.$oid,
        user_id:this.state.current_user_id,
        recipient_id: user.id,
        sender_id:this.state.current_user_id
    }
    if(this.state.typing.trim().length > 0){
      this.refs.roomChannel.perform('sendMessage',data)
    }else{
      Notification.error('Please type message')
    }
  }


 renderItem({ item }) {
   if(this.props.user.id == item.sender.id){
	    return (
	      <View style={styles.row}>
	        <View style={styles.rowText}>
	          <Text style={styles.message}>{item.body}</Text>
	           <Text style={styles.createdTime}>{item.created_at}</Text>
	        </View>
	      </View>
	    );
	  }else{
	  	return (
	      <View style={styles.rowRight}>
	        <View style={styles.rowTextRight}>
	          <Text style={styles.message}>{item.body}</Text>
	           <Text style={styles.createdTimeRight}>{item.created_at}</Text>
	        </View>
	      </View>
	    );
	  }
  }

  // onConnected(){
  //   alert('connected...')
  // }
   
  onReceived = (data) => {

    new_data = new Array(data)
    this.setState({ messages: new_data.concat(this.state.messages), typing: ''});
    // this.refs.scrollView.scrollTo(this.state.scrollToBottomY+50);
  }

  onConnected(){
   
  }

  render() {
    //("Rendering components");

    var user = this.props.user
    if(this.state.token !== null && user != undefined){
      const cable = RNActionCable.createConsumer(`${WS_CABLE_URL}/api/v1/cable?token=${this.state.token}`);
      return (
      	<ActionCableProvider cable={cable}>
          <ActionCable ref='roomChannel' key={user.conversation._id.$oid+"444"} onConnected={this.onConnected} channel={{channel: 'MessagesChannel', conversation: user.conversation._id.$oid }} onReceived={this.onReceived} />
      	   <View style={styles.container}>
  	        <StatusBar barStyle="light-content"/>

  	        <SafeAreaView style={styles.header}>
  	          <Touchable style={{ width: 50, alignItems: 'center', justifyContent: 'center' }} onPress={this._navigateToDashboard}>
  	            <Image source={require('../../../img/icons/home.png')} />
  	          </Touchable>
  	          <View style={styles.safeAreaView}>
  	            <Image style={styles.safeAreaImage} source={require('../../../img/leads/leads.png')}/>
  	            <Text style={styles.safeAreaText}>CHAT</Text>
  	          </View>
  	          <Touchable style={{ width: 50, alignItems: 'center', justifyContent: 'center' }}>
  	            <View></View>
  	          </Touchable>
  	          <View style={styles.buttonContainer}>
  	            <Touchable onPress={this._navigateToPreviousScreen}>
  	              <Image source={require('../../../img/icons/cross.png')} />
  	            </Touchable>
  	          </View>
  	        </SafeAreaView>
  	        <View style={{ flexDirection: 'row' , backgroundColor : "#FFFFFF", height : 50, alignItems: 'center'}}>
  	          	<Text style={styles.userheader}>{this._capitalizeString(`${user.first_name} ${user.last_name}`)}</Text>
  	        </View>

  	        <ScrollView style={styles.body}>
  	          <FlatList
  		          data={this.state.messages}
  		          renderItem={this.renderItem}
  		          inverted
  	        	/>
  	        </ScrollView>
  	        <View style={styles.footer}>
  	            <TextInput
  	              value={this.state.typing}
  	              style={styles.input}
  	              underlineColorAndroid="transparent"
  	              placeholder="Type Here"
  	              onChangeText={text => this.setState({ typing: text })}
  	            />
  	            <TouchableOpacity onPress={this.sendMessage}>
  	              <Text style={styles.send}>Send</Text>
  	            </TouchableOpacity>
  	          </View>
  	        <Loader loading={this.state.loading}/>
  	      </View>
  	    </ActionCableProvider>
      );
    }else{
      return(<View></View>)
    }
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
  buttonContainer: {
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 15,
    justifyContent: 'space-between'
  },
  textField: {
    height: 44,
    backgroundColor: '#FFFFFF',
    fontSize: 17,
    color: 'rgba(0, 0, 0, 0.73)',
    // borderBottomWidth: 1,
    // borderBottomColor: 'rgba(0, 0, 0, 0.2)'
  },
  userheader:{
  	fontSize: 18,
  	fontWeight: '600',
  	alignItems: 'center',
  	textAlign: 'center',
  	marginLeft: 140
  },
  labelStyle: {
    backgroundColor: '#FFFFFF',
    fontSize: 15,
    color: 'rgba(0, 0, 0, 0.73)',
    fontWeight : 'bold'
    // borderBottomWidth: 1,
    // borderBottomColor: 'rgba(0, 0, 0, 0.2)'
  },

  row: {
    flexDirection: 'row',
    padding: 5,
    paddingTop: 5,
    paddingRight: 40,
    paddingLeft: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    alignSelf: 'flex-start',
    maxWidth: "85%"   
  
  },

  rowRight:{
		flexDirection: 'row',
    paddingTop: 5,
    paddingRight: 5,
    paddingLeft: 40,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    alignSelf: 'flex-end',
    maxWidth: "85%"   
  },
  avatar: {
    borderRadius: 20,
    width: 40,
    height: 40,
    marginRight: 10
  },
  rowText: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: "#FFFFFF",
    height: 'auto',
    borderRadius: 4,
    color: "black",
    shadowOffset:{  width: 10,  height: 10,  },
    shadowColor: 'black',
    shadowOpacity: 1.0,
    padding: 10,
    flexWrap: 'wrap'
   
   

  },
  rowTextRight: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: "#e2fec8",
    borderRadius: 4,
    color: 'black',
    shadowOffset:{  width: 10,  height: 10,  },
    shadowColor: 'black',
    shadowOpacity: 1.0,
    padding: 10,
    flexWrap: 'wrap'
  },
  message: {
    fontSize: 18,
    flexWrap: 'wrap'
  },
  createdTime: {
  	position: 'absolute', 
  	right: 10,
  },

  createdTimeRight: {
    position: 'absolute', 
    right: 10,
  },
  sender: {
    fontWeight: 'bold',
    paddingRight: 10
  },
  labelChildStyle: {
    backgroundColor: '#FFFFFF',
    fontSize: 15,
    color: 'rgba(0, 0, 0, 0.73)',
    
    // borderBottomWidth: 1,
    // borderBottomColor: 'rgba(0, 0, 0, 0.2)'
  },
  labelGreyStyle: {
    backgroundColor: '#FFFFFF',
    fontSize: 15,
    color: 'rgba(192,192,192,1)',
    flexWrap: 'wrap'
    // borderBottomWidth: 1,
    // borderBottomColor: 'rgba(0, 0, 0, 0.2)',
 
  },
  textFieldPhone: {
    height: 44,
    backgroundColor: '#FFFFFF',
    fontSize: 17,
    color: 'rgba(0, 0, 0, 0.73)',
    // borderBottomWidth: 1,
    // borderBottomColor: 'rgba(0, 0, 0, 0.2)',
    flex:1
  },
  picker: {
    height: 44,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.2)',
    paddingRight: 10
  },
  pickerText: {
    fontSize: 17,
    color: 'rgba(0, 0, 0, 0.73)'
  },
  buttonText:{
    fontSize: 15,
    color: 'white',
    textAlign : "center",
    textAlignVertical : "center"

  },
  labelContainer:{
    // height: 25, 
    backgroundColor: '#FFFFFF', 
    paddingLeft: 15 , 
    alignItems : "center" , 
    flexDirection : "row"
  },
  buttonContainers:{
    height: 35, 
    backgroundColor: '#FFFFFF', 
    paddingLeft: 10 , 
    paddingRight : 10,
    alignItems : "center" , 
    justifyContent : "center",
    borderWidth : 1,
    borderColor : 'rgba(0, 0, 0, 0.2)',
    flex : 1
  },
  pickerContainer:{
    height: 44,
    backgroundColor: '#FFFFFF',
    paddingLeft: 8,
    paddingRight: 15,
    // paddingTop : 2,
    // paddingBottom : 2,
    // borderWidth : 1,
    // borderColor : 'rgba(0, 0, 0, 0.2)'
    },
  safeAreaView:{
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center' 
  },
  safeAreaImage: {
    marginTop: 3,
    marginLeft: 80,
    width: 35,
    height: 35
  },
  safeAreaText: {
    marginLeft: 3,
    marginTop: 10,
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '600'
  },
   footer: {
    flexDirection: 'row',
    backgroundColor: '#eee'
  },
  input: {
    paddingHorizontal: 20,
    fontSize: 18,
    flex: 1
  },
  send: {
    alignSelf: 'center',
    color: 'lightseagreen',
    fontSize: 16,
    fontWeight: 'bold',
    padding: 20
  }
});

function mapStateToProps(state, ownProps) {
  return {
    user: state.users.user,
    users: state.users
  };
};

export default connect(mapStateToProps, {getParticularUser})(CustomerChat);