import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Picker as NativePicker,
  Modal,
  TouchableOpacity,
  Text,
  Button,
  PixelRatio,
  Platform,
  Image
} from 'react-native';
import _ from 'lodash';
import { Touchable } from './touchable';

class Picker extends Component {
  constructor(props) {
    super(props)

    this.state = {
      pickerVisible: false,
      selectedValue: this.props.selectedValue
    }
  }

  showPicker = () => {
    this.setState({
      pickerVisible: true,
      selectedValue: this.props.selectedValue ? this.props.selectedValue : (this.props.items[0].value)
    })
  }

  _hidePicker = () => {
    this.setState({
      pickerVisible: false,
    })
  }

  _confirm = () => {
    this.props.onValueChange(this.state.selectedValue)
    this.setState({
      pickerVisible: false
    })

    if (this.props.onClosePicker)
      this.props.onClosePicker()
  }

  _renderItems() {
    var itemsData = this.props.items

    return _.map(itemsData, (item, index) => {
      return <NativePicker.Item key={index} label={item.label} value={item.value} />
    });
  }

  render() {
    var items = this._renderItems()
    var selectedItem = _.find(this.props.items, (item) => item.value === this.props.selectedValue)
    var selectedValue = selectedItem ? selectedItem.label : (this.props.placeholder ? this.props.placeholder : '')

    if (Platform.OS === 'android')
      return (
        <View style={this.props.style} >
          <NativePicker
            selectedValue={this.state.selectedValue}
            onValueChange={(selectedValue) => this.setState({selectedValue: selectedValue})}
            >
            {items}
          </NativePicker>
        </View>
      )

    return (
      <Touchable style={this.props.style} onPress={this.showPicker}>
        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <Text style={[this.props.textStyle, selectedItem ? null : { color: this.props.placeholderTextColor}]}>{selectedValue}</Text>
          <Image source={require('../../../img/icons/chevron-small.png')}/>
          <Modal
            animationType="slide"
            transparent={true}
            visible={this.state.pickerVisible}
            onRequestClose={this._hidePicker}
            >
            <TouchableOpacity onPress={this._hidePicker} style={styles.spaceContainer}></TouchableOpacity>
            <View style={styles.buttonBar}>
              <Button title="Cancel" color={'grey'} onPress={this._hidePicker}/>
              <View style={styles.buttonBarSpace}></View>
              <Button title={this.props.confirmBtnText ? this.props.confirmBtnText : "Confirm"} onPress={this._confirm}/>
            </View>
            <View style={styles.pickerContainer}>
              <NativePicker
                selectedValue={this.state.selectedValue}
                onValueChange={(selectedValue) => this.setState({selectedValue: selectedValue})}
                >
                {items}
              </NativePicker>
            </View>
          </Modal>
        </View>
      </Touchable>
    );
  }
}

const styles = StyleSheet.create({
  spaceContainer: {
    flex: 1
  },
  pickerContainer: {
    backgroundColor: '#FFFFFF',
    justifyContent: 'center'
  },
  buttonBar: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1 / PixelRatio.get(),
    borderBottomColor: 'grey',
    borderTopWidth: 1 / PixelRatio.get(),
    borderTopColor: 'grey'
  },
  buttonBarSpace: {
    flex: 1
  }
});

export { Picker }
