import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  SafeAreaView,
  StatusBar,
  Image
} from 'react-native';
import { Touchable, Loader } from '../common';
import { Format } from '../../helpers';
import OpenFile from 'react-native-doc-viewer';

class Message extends Component {
  static navigatorStyle = {
    navBarHidden: true
  }

  _navigateToDashboard = () => {
    this.props.navigator.popToRoot()
  }

  _navigateToPreviousScreen = () => {
    this.props.navigator.pop()
  }

  _openAttachment = () => {
    var message = this.props.message
    var documentUrl = Format.imageUrl(message["data_url"])

    OpenFile.openDoc([{
      url: documentUrl,
      fileName:"sample"
    }], (error, url) => {
      this.setState({
        loading: false
      })

      if (error) {
        alert(JSON.stringify(error))
      }
    })
  }

  render() {
    var message = this.props.message

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
            <View style={{flex: 1, justifyContent: 'flex-end', alignItems: 'flex-end', flexDirection: 'row'}}>
              <Touchable style={{paddingHorizontal: 5}} onPress={() => {}}>
                  <Image source={require('../../../img/icons/undo.png')}/>
              </Touchable>
              <Touchable style={{paddingHorizontal: 5}} onPress={() => {}}>
                  <Image source={require('../../../img/icons/redo.png')}/>
              </Touchable>
              <Touchable style={{paddingHorizontal: 5}} onPress={() => {}}>
                  <Image source={require('../../../img/icons/bin.png')}/>
              </Touchable>
            </View>
          </View>

          <View style={styles.messageHeaders}>
            <View style={styles.messageHeaderItem}>
              <Text style={styles.messageHeaderItemText}>
                {message["sender_name"]}
              </Text>
            </View>
            <View style={styles.messageHeaderSeperator}></View>
            <View style={styles.messageHeaderItem}>
              <Text style={styles.messageHeaderItemText}>
                {message["subject"] ? message["subject"] : "No subject"}
              </Text>
            </View>
          </View>

          <ScrollView style={styles.messageBody}>
            <Text style={styles.messageBodyText}>
              {message["content"]}
            </Text>
          </ScrollView>

          <View style={styles.footer}>
            <Touchable onPress={this._openAttachment}>
              <View style={{ alignItems: 'center' }}>
                <Image source={require('../../../img/icons/folder.png')}/>
                <Text style={{ fontSize: 14, fontWeight: '500', color: '#999999', marginTop: 5 }}>View Attachment</Text>
              </View>
            </Touchable>
          </View>

        </View>

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
    fontSize: 17,
    color: 'rgba(0, 0, 0, 0.73)',
    lineHeight: 25
  },
  footer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 122
  }
});

export default Message
