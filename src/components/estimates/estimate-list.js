import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  ListView,
  Text,
  Image
} from 'react-native';
import EstimateListItem from './estimate-list-item';

class EstimateList extends Component {
  constructor(props) {
    super(props)
    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 != r2})
  }

  render() {
    var dataSource = this.ds.cloneWithRows(this.props.estimates)
    return (
      <ListView
        enableEmptySections={true}
        style={styles.container}
        dataSource={dataSource}
        renderRow={(item , sectionID, rowID) => (
          <EstimateListItem index={rowID} estimate={item} onPress={this.props.onItemPress}/>
        )} />
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent'
  }
});

export default EstimateList
