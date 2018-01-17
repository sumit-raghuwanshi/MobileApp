import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  StatusBar,
  Image
} from 'react-native';
import { Touchable, Loader} from '../common';
import TaskList from './task-list';
import {connect} from 'react-redux';
import {getTasks} from '../../actions';

class Tasks extends Component {
  static navigatorStyle = {
    navBarHidden: true
  }

  constructor(props) {
    super(props)

    this.state = {
      loading: false
    }
  }

  componentDidMount() {
    this.setState({loading: true})

    this.props.getTasks()
    .then(response => {
      this.setState({loading: false})
    })
    .catch(error => {
      this.setState({loading: false})
    })
  }

  _navigateToDashboard = () => {
    this.props.navigator.popToRoot()
  }

  _navigateToTaskCreateScreen = () => {
    this.props.navigator.push({
      screen: 'roof_gravy.task_create'
    })
  }

  _onItemPress = (task) => {
    this.props.navigator.push({
      screen: 'roof_gravy.task_edit',
      passProps: {
        task
      }
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
            <Text style={{ fontSize: 16, color: '#FFFFFF', fontWeight: '600' }}>TASKS</Text>
            <Image style={{ marginTop: 10 }} source={require('../../../img/icons/tasks.png')}/>
          </View>
          <Touchable style={{ width: 50, alignItems: 'center', justifyContent: 'center' }}>
            <View></View>
          </Touchable>
        </SafeAreaView>

        <View style={styles.body}>
          <View style={styles.topButtonContainer}>
            <View style={styles.spaceFlex}></View>
            <Touchable style={styles.newButton} onPress={this._navigateToTaskCreateScreen}>
              <View style={styles.buttonContent}>
                <Image source={require('../../../img/icons/add.png')}/>
                <Text style={styles.buttonText}>NEW TASK</Text>
              </View>
            </Touchable>
          </View>
          <TaskList
            onItemPress={this._onItemPress}
            tasks={this.props.tasks}
            />
        </View>
        <Loader loading={this.state.loading}/>
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
})

function mapStateToProps(state) {
  return {
    tasks: state.tasks
  }
}

export default connect(mapStateToProps, {getTasks})(Tasks)
