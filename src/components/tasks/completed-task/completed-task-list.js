import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  ListView,
  Text,
  Image
} from 'react-native';
import CompletedTaskListItem from './completed-task-list-item';


class CompletedTaskList extends Component {
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
          <CompletedTaskListItem message={item} onPress={this.props.onItemPress}/>
        )} />
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default CompletedTaskList
