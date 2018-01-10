import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  ListView,
  Text,
  Image
} from 'react-native';
import MeasurementInnerListItem from './measurement-inner-list-item';


class MeasurementInnerList extends Component {
  constructor(props) {
    super(props)

    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 != r2})
  }

  render() {
    var dataSource = this.ds.cloneWithRows(this.props.messages)

    return (
      <ListView
        style={styles.container}
        dataSource={dataSource}
        renderRow={(item) => (
          <MeasurementInnerListItem message={item} onPress={this.props.onItemPress}/>
        )} />
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default MeasurementInnerList
