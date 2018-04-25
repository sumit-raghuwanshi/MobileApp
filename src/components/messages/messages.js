import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  StatusBar,
  Image
} from 'react-native';
import { Touchable, Loader } from '../common';
import MessageList from './message-list';
import {getMessages} from '../../actions';
import {connect} from 'react-redux';

class Messages extends Component {
  static navigatorStyle = {
    navBarHidden: true
  }

  constructor(props) {
    super(props)

    this.state = {
      loading: true
    }
  }

  componentDidMount() {
    this.props.getMessages()
    .then((response) => {
      this.setState({loading: false})
    })
    .catch((error) => {
      this.setState({loading: false})
    })
  }

  _navigateToDashboard = () => {
    this.props.navigator.popToRoot()
  }

  _navigateToMessageCreateScreen = () => {
    this.props.navigator.push({
      screen: 'roof_gravy.message_create'
    })
  }

  _onItemPress = (message) => {
    this.props.navigator.push({
      screen: 'roof_gravy.message',
      passProps: {
        message
      }
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content"/>

        <SafeAreaView style={styles.headerContainer}>
          <View style={styles.header}>
          <Touchable style={{ width: 50, alignItems: 'center', justifyContent: 'center' }} onPress={this._navigateToDashboard}>
            <Image source={require('../../../img/icons/home.png')} />
          </Touchable>
            <View style={{ flex: 1, alignItems: 'center', zIndex: 1 , overflow:'visible'}}>
            <Text style={{ fontSize: 16, color: '#FFFFFF', fontWeight: '600' }}>MESSAGES</Text>
            <Image style={{ marginTop: 10 }} source={require('../../../img/icons/messages.png')}/>
          </View>
          <Touchable style={{ width: 50, alignItems: 'center', justifyContent: 'center' }}>
            <View></View>
          </Touchable>
          </View>
        </SafeAreaView>

        <View style={styles.body}>
          <View style={styles.topButtonContainer}>
            <View style={styles.spaceFlex}></View>
            <Touchable style={styles.newButton} onPress={this._navigateToMessageCreateScreen}>
              <View style={styles.buttonContent}>
                <Image source={require('../../../img/icons/add.png')}/>
                <Text style={styles.buttonText}>NEW</Text>
              </View>
            </Touchable>
          </View>
          <MessageList
            onItemPress={this._onItemPress}
            messages={this.props.messages}
            />
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
  headerContainer: {
    backgroundColor: '#354052'
  },
  header: {
    flexDirection: 'row',
    //marginBottom:10,
    height: 66,
    zIndex: 1,
    overflow:'visible'
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
    messages: state.messages
  }
}

export default connect(mapStateToProps, {getMessages})(Messages)
