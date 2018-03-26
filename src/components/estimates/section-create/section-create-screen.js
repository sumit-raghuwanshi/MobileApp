import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  SafeAreaView,
  StatusBar,
  Image,
} from 'react-native';
import {
  TextInput,
  Touchable,
  Picker,
  TouchableField,
  Loader
} from '../../common';
import {connect} from 'react-redux';
import {Notification} from '../../../helpers';
import _ from 'lodash';

class SectionCreateScreen extends Component {
  static navigatorStyle = {
    navBarHidden: true
  }

  constructor(props) {
    super(props)

    this.state = {
      loading: false
    }
  }

  _navigateToDashboard = () => {
    this.props.navigator.popToRoot()
  }

  _submit = () => {
    var {tradeType, name, templateId} = this.state
    var errorMessages = []

    if (typeof tradeType == "undefined")
      errorMessages.push('Trade Type is required')


    if (!name)
      errorMessages.push('Section Name is required')

    if (typeof templateId == "undefined")
      errorMessages.push('Template is required')

    if (errorMessages.length > 0) {
      Notification.error(_.join(errorMessages, "\n"))

      return
    }

    this.props.onSubmit && this.props.onSubmit({tradeType, name, templateId})
  }

  render() {
    var {currentUser} = this.props

    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content"/>

        <SafeAreaView style={styles.header}>
          <Touchable style={{ width: 50, alignItems: 'center', justifyContent: 'center' }} onPress={this._navigateToDashboard}>
            <Image source={require('../../../../img/icons/home.png')} />
          </Touchable>
          <View style={{ flex: 1, alignItems: 'center' }}>
            <Text style={{ fontSize: 16, color: '#FFFFFF', fontWeight: '600' }}>Estimate</Text>
            <Image style={{ marginTop: 10 }} source={require('../../../../img/icons/estimate.png')}/>
          </View>
          <Touchable style={{ width: 50, alignItems: 'center', justifyContent: 'center' }}>
            <View></View>
          </Touchable>
        </SafeAreaView>

        <ScrollView style={styles.body} contentContainerStyle={{paddingBottom: 20}}>
          <View style={styles.topButtonContainer}>

          </View>

          <View style={styles.groupSeparator}/>

          <Picker
            placeholder="Trade"
            selectedValue={this.state.tradeType}
            onValueChange={(tradeType) => {
              this.setState({tradeType, name: currentUser["trade_types"][tradeType] + " Section"})
            }}
            items={_.map(currentUser["trade_types"], (tt, index) => ({label: tt, value: index }))}
            />

          <TextInput
            placeholder="Section Name"
            value={this.state.name}
            onChangeText={(name) =>  this.setState({name})}/>

          <View style={styles.groupSeparator}/>

          <Picker
            placeholder="Template"
            selectedValue={this.state.templateId}
            onValueChange={(templateId) => this.setState({templateId})}
            items={_.map(this.props.templates, (template) => ({label: template.name, value: template.id }))}
            />

          <View style={styles.groupSeparator}/>


          <View style={styles.bottomBottomContainer}>
            <Touchable onPress={this._submit}>
              <View style={styles.submitButton}>
                <Text style={styles.submitButtonText}>Next</Text>
              </View>
            </Touchable>
          </View>

        </ScrollView>
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
    height: 80,
    paddingLeft: 25,
    paddingRight: 10,
    paddingTop: 20,
    paddingBottom: 10
  },
  groupSeparator: {
    height: 30
  },
  bottomBottomContainer: {
    alignItems: 'center'
  },
  submitButton: {
    borderWidth: 1,
    borderColor: "#919599",
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 7,
    paddingHorizontal: 15,
    backgroundColor: 'white'
  },
  submitButtonText: {
    color: '#919599'
  }

});

function mapStateToProps(state) {
  return {
    currentUser: state.user,
    templates: state.templates
  }
}

export default connect(mapStateToProps)(SectionCreateScreen)
