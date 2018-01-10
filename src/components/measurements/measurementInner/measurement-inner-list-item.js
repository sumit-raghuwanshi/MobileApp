import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image
} from 'react-native';
import { Touchable } from '../../common';

class MeasurementInnerListItem extends Component {
  render() {
    var message = this.props.message

    return (
      <Touchable style={styles.container}
        onPress={() => this.props.onPress && this.props.onPress(message)}>
        <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center', flex:1}}>
            <View style={{flex:1, paddingLeft:10, paddingRight:10,  alignItems:'center', flexDirection:'row', justifyContent:'space-between', backgroundColor:'white', paddingVertical:10}}>
                <Text style={styles.text}>Total Roof Area</Text>
                <Text style={styles.text}>0</Text>
            </View>
            <View style={{backgroundColor:'transparent', width:40, justifyContent:'center', alignItems:'center'}}>
                <Text style={styles.text}>SQ</Text>
            </View>
        </View>
      </Touchable>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    height: 50,
    backgroundColor: 'transparent'
  },
  text: {
    fontWeight:'500'
  }
});

export default MeasurementInnerListItem
