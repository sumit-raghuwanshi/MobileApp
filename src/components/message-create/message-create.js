import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  TextInput,
  SafeAreaView,
  StatusBar,
  Image
} from 'react-native';
import { Touchable, Picker, Loader } from '../common';
import {sendMessage, getUserList} from '../../actions';
import {Notification} from '../../helpers';
import {connect} from 'react-redux';
import _ from 'lodash';
import { DocumentPicker, DocumentPickerUtil } from 'react-native-document-picker';
import ImagePicker from 'react-native-image-picker';

class MessageCreate extends Component {
  static navigatorStyle = {
    navBarHidden: true
  }

  constructor(props) {
    super(props)

    this.state = {
      to: "",
      subject: "",
      messageBody: ""
    }
  }

  componentDidMount() {
    this.setState({loading: true})

    this.props.getUserList()
    .then((response) => {
      this.setState({ loading: false })
    })
    .catch(error => {
      this.setState({ loading: false })
    })
  }

  _navigateToDashboard = () => {
    this.props.navigator.popToRoot()
  }

  _navigateToPreviousScreen = () => {
    this.props.navigator.pop()
  }

  _sendMessage = () => {
    var {receiver_email, subject, messageBody} = this.state

    var errorMessages = []

    if (!receiver_email)
      errorMessages.push('Receiver is required')

    if (!subject)
      errorMessages.push('Subject is required')

    if (!messageBody)
      errorMessages.push('Message is required')

    if (errorMessages.length > 0) {
      Notification.error(_.join(errorMessages, "\n"))

      return
    }

    this.setState({loading: true})
    var message = new FormData()

    message.append("receiver_email", receiver_email)
    message.append("message[subject]", subject)
    message.append("message[content]", messageBody)

    if (this.state.file_attachment && this.state.file_attachment.uri) {
      message.append("message[data][uri]", this.state.file_attachment.uri)
      message.append("message[data][name]", this.state.file_attachment.fileName)
      message.append("message[data][type]", this.state.file_attachment.type ? this.state.file_attachment.type : "image/jpg")
    }

    this.props.sendMessage(message)
    .then((response) => {
      this.setState({ loading: false }, this._navigateToPreviousScreen)
    })
    .catch(error => {
      this.setState({ loading: false })
    })
  }

  _addAttachment = () => {
    DocumentPicker.show({
      filetype: [DocumentPickerUtil.allFiles()],
    },(error,file) => {
      this.setState({
        file_attachment: file
      })
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
          <View style={{ flex: 1, alignItems: 'center' }}>
            <Text style={{ fontSize: 16, color: '#FFFFFF', fontWeight: '600' }}>MESSAGES</Text>
            <Image style={{ marginTop: 10 }} source={require('../../../img/icons/messages.png')}/>
          </View>
          <Touchable style={{ width: 50, alignItems: 'center', justifyContent: 'center' }}>
            <View></View>
          </Touchable>
        </SafeAreaView>

        <View style={styles.body}>
          <View style={styles.topButtonContainer}>
            <View style={{ flex: 1 }}>
              <Touchable onPress={this._navigateToPreviousScreen}>
                  <Image source={require('../../../img/icons/cross.png')}/>
              </Touchable>
            </View>
            <View style={{flex: 1, alignItems: 'flex-end'}}>
              <Touchable onPress={this._sendMessage}>
                  <Image source={require('../../../img/icons/save.png')}/>
              </Touchable>
            </View>
          </View>

          <View style={styles.messageHeaders}>
            <View style={styles.messageHeaderItem}>
              <Picker
                placeholder="To"
                placeholderTextColor="#BFBFBF"
                style={styles.picker}
                textStyle={styles.pickerText}
                selectedValue={this.state.receiver_email}
                onValueChange={(receiver_email) => this.setState({receiver_email})}
                items={_.map(_.filter(this.props.users, (user) => user.id != this.props.user.id), (user) => ({ label: user.email, value: user.email }))}
                />
            </View>
            <View style={styles.messageHeaderSeperator}></View>
            <View style={styles.messageHeaderItem}>
              <TextInput
                placeholder="Subject"
                style={styles.messageHeaderItemText}
                value={this.state.subject}
                onChangeText={(subject) =>  this.setState({subject})}/>
            </View>
          </View>

          <ScrollView style={styles.messageBody}>
            <TextInput
              placeholder="Type your text here..."
              multiline={true}
              style={styles.messageBodyText}
              value={this.state.messageBody}
              onChangeText={(messageBody) =>  this.setState({messageBody})}/>
          </ScrollView>

          <View style={styles.footer}>
            <Touchable onPress={this._addAttachment}>
              <View style={{ alignItems: 'center' }}>
                <Image source={require('../../../img/icons/folder.png')}/>
                <Text style={{ fontSize: 14, fontWeight: '500', color: '#999999', marginTop: 5 }}>Add Attachment</Text>
              </View>
            </Touchable>
          </View>

        </View>
        <Loader loading={this.state.loading} />
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
    paddingLeft: 25,
    paddingRight: 10,
    paddingTop: 20,
    paddingBottom: 10
  },
  messageHeaders: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20
  },
  messageHeaderItem: {
    height: 44,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center'
  },
  messageHeaderItemText: {
    fontSize: 17,
    color: 'rgba(0, 0, 0, 0.73)'
  },
  messageHeaderSeperator: {
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    height: 1
  },
  messageBody: {
    marginTop: 26,
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 15,
    paddingVertical: 15
  },
  messageBodyText: {
    flex: 1,
    height: 100,
    fontSize: 17,
    color: 'rgba(0, 0, 0, 0.73)',
    lineHeight: 25
  },
  footer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 122
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
  }
});

function mapStateToProps(state) {
  return {
    user: state.user,
    users: state.users
  }
}

export default connect(mapStateToProps, {sendMessage, getUserList})(MessageCreate)
