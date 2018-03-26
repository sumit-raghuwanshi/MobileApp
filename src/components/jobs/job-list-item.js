import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image
} from 'react-native';
import { Touchable } from '../common';

var colors = ["#40B34F", "#846542", "#FECD53", "#919AAC", "#5791CA", "#E6892C", "#BF2932", "#000000"]

class JobListItem extends Component {
  render() {
    var job = this.props.job

    return (
      <Touchable style={styles.container}
        onPress={() => this.props.onPress && this.props.onPress(job)}>
        <View style={styles.contentContainer}>
          <View style={{width: 44, backgroundColor: colors[Math.floor((Math.random() * colors.length))]}}>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.title}>{job["contact"] ? job["contact"] : 'N/A'}</Text>
          </View>
          <View style={{ alignItems: 'flex-end', justifyContent: 'center' }}>
            <Image source={require('../../../img/icons/chevron.png')}/>
          </View>
        </View>
      </Touchable>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    height: 44,
    marginBottom: 10
  },
  contentContainer: {
    flex: 1,
    flexDirection: 'row',
    paddingRight: 15,
    backgroundColor: 'white',
  },
  title: {
    color: 'rgba(0, 0, 0, 0.7)',
    fontSize: 17
  },
  textContainer: {
    flex: 1,
    paddingHorizontal: 10,
    justifyContent: 'center'
  }
});

export default JobListItem
