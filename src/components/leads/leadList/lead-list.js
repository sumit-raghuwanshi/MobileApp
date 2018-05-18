import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  ListView,
  Text,
  Image
} from 'react-native';
import LeadListItem from './lead-list-item';


class LeadList extends Component {
  constructor(props) {
    super(props)
    console.log("sdfbdxfbnc" , this.props);
    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 != r2})
  }

  render() {
    var dataSource = this.ds.cloneWithRows(this.props.leads)

    return (
      <ListView
        enableEmptySections={true}
        style={styles.container}
        dataSource={dataSource}
        renderRow={(item) => (
          <LeadListItem lead={item} onPress={this.props.onItemPress}/>
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

export default LeadList
