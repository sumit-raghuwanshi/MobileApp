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

class Settings extends Component {

    static navigatorStyle = {
        navBarHidden: true
    }

    _navigateToDashboard = () => {
        this.props.navigator.popToRoot()
      }

    render(){
        return(
        <View style={styles.container}>
            <StatusBar barStyle="light-content"/>

            <SafeAreaView style={styles.header}>
                <Touchable style={{ width: 50, alignItems: 'center', justifyContent: 'center' }} onPress={this._navigateToDashboard}>
                    <Image source={require('../../../img/icons/home.png')} />
                </Touchable>
                <View style={{ flex: 1, alignItems: 'center' }}>
                    <Text style={{ fontSize: 16, color: '#FFFFFF', fontWeight: '600' }}>Settings</Text>
                    <Image style={{ marginTop: 10 }} source={require('../../../img/dashboard/settings.png')}/>
                </View>
                <Touchable style={{ width: 50, alignItems: 'center', justifyContent: 'center' }}>
                    <View></View>
                </Touchable>
            </SafeAreaView>

            <ScrollView style={styles.body}>
                <Touchable style={styles.viewContainer}>
                    <View style={styles.contentContainer}>
                    <View style={styles.textContainer}>
                        <Text style={styles.viewText}>{"Image Upload Quality"}</Text>
                    </View>
                    <View style={{ alignItems: 'flex-end' }}>
                        <View style={{flex: 1, justifyContent: 'center', flexDirection:'row', alignItems:'center'}}>
                        <Text style={styles.viewText}>Large</Text>
                        <Image source={require('../../../img/icons/chevron.png')}/>
                        </View>
                    </View>
                    </View>
                </Touchable>

                <Touchable style={styles.viewContainer}>
                    <View style={styles.contentContainer}>
                    <View style={styles.textContainer}>
                        <Text style={styles.viewText}>{"Location Settings"}</Text>
                    </View>
                    <View style={{ alignItems: 'flex-end' }}>
                        <View style={{flex: 1, justifyContent: 'center', flexDirection:'row', alignItems:'center'}}>
                        <Text style={styles.viewText}></Text>
                        <Image source={require('../../../img/icons/chevron.png')}/>
                        </View>
                    </View>
                    </View>
                </Touchable>

                <Touchable style={styles.viewContainer}>
                    <View style={styles.contentContainer}>
                    <View style={styles.textContainer}>
                        <Text style={styles.viewText}>{"Edit My Info"}</Text>
                    </View>
                    <View style={{ alignItems: 'flex-end' }}>
                        <View style={{flex: 1, justifyContent: 'center', flexDirection:'row', alignItems:'center'}}>
                        <Text style={styles.viewText}></Text>
                        <Image source={require('../../../img/icons/chevron.png')}/>
                        </View>
                    </View>
                    </View>
                </Touchable>

                <Touchable style={styles.viewContainer}>
                    <View style={styles.contentContainer}>
                    <View style={styles.textContainer}>
                        <Text style={styles.viewText}>{"Create/Connect Stripe Account"}</Text>
                    </View>
                    <View style={{ alignItems: 'flex-end' }}>
                        <View style={{flex: 1, justifyContent: 'center', flexDirection:'row', alignItems:'center'}}>
                        <Text style={styles.viewText}></Text>
                        <Image source={require('../../../img/icons/chevron.png')}/>
                        </View>
                    </View>
                    </View>
                </Touchable>
            </ScrollView>

        </View>
        )
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
    },body: {
        flex: 1,
        marginTop:20
    },
    oneView:{
        backgroundColor:'white',
        height:60, 
        width:Dimensions.get('window').width -10,
        marginLeft:5,
        marginRight:5,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
    },
    viewText: {
        marginRight:5,
        fontWeight:'600',
        fontSize:16
    },
    viewContainer: {
        height: 60,
        backgroundColor: 'white',
        marginTop:10,
        marginLeft:5,
        marginRight:5
      },
      contentContainer: {
        flex: 1,
        flexDirection: 'row',
        marginHorizontal: 10,
        paddingVertical: 15
      },
      title: {
        color: 'rgba(0, 0, 0, 0.6)',
        fontSize: 17
      },
      subject: {
        color: 'rgba(0, 0, 0, 0.6)',
        fontSize: 11
      },
      preview: {
        color: 'rgba(0, 0, 0, 0.6)',
        fontSize: 11,
        marginLeft: 10
      },
      textContainer: {
          justifyContent:'center',
        flex: 1,
        paddingRight: 50
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

export default connect(mapStateToProps, mapDispatchToProps)(Settings);