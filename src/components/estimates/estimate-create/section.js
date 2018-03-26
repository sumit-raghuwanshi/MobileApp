import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TextInput,
  LayoutAnimation,
  PixelRatio,
  Slider
} from 'react-native';
import {
  Touchable
} from '../../common';

class Section extends Component {
  state = {
    isCollapsed: false
  }

  componentWillUpdate() {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring)
  }

  _toggleCollapse = () => {
    this.setState({ isCollapsed: !this.state.isCollapsed})
  }

  render() {
    return (
      <View>
        <Touchable onPress={this._toggleCollapse}>
          <View style={{height: 50, flexDirection: 'row', backgroundColor: 'white', paddingHorizontal: 10, borderBottomWidth: 1, borderBottomColor: 'rgba(0, 0, 0, 0.8)'}}>
            <View style={{justifyContent: 'center', paddingTop: 3, marginRight: 8}}>
              {
                this.state.isCollapsed ?
                  <Image source={require('../../../../img/icons/chevron.png')}/>
                :
                  <Image source={require('../../../../img/icons/down.png')}/>
              }
            </View>
            <View style={{justifyContent: 'center'}}>
              <Text style={styles.estimateText}>{"NAME"}</Text>
            </View>
          </View>
        </Touchable>

        <View style={{height: this.state.isCollapsed ? 0 : undefined, overflow: 'hidden', paddingLeft: 10, backgroundColor: 'white'}}>
          <View style={{height: 60, borderBottomWidth: 1, borderBottomColor: 'rgba(0, 0, 0, 0.8)', paddingVertical: 8, justifyContent: 'space-between'}}>
            <View style={{flexDirection: 'row'}}>
              <Text numberOfLines={1} style={{flex: 2, fontSize: 13, fontWeight: '300', color: 'rgba(0, 0, 0, 0.8)'}}>Steep Slope - Build Cricket</Text>
              <Text style={{flex: 1, fontSize: 13, fontWeight: '300', color: 'rgba(0, 0, 0, 0.8)'}}>$200</Text>
              <Text style={{flex: 1, fontSize: 13, fontWeight: '300', color: 'rgba(0, 0, 0, 0.8)'}}>$200</Text>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Touchable onPress={() => {}}>
                <Image source={require('../../../../img/icons/bin.png')}/>
              </Touchable>
              <View style={{width: 8}}/>
              <TextInput
                keyboardType="numeric"
                maxLength={2}
                style={{
                  height: 20,
                  width: 30,
                  fontSize: 13,
                  borderWidth: 1 / PixelRatio.get(),
                  borderColor: 'rgba(0, 0, 0, 0.8)',
                  color: 'rgba(0, 0, 0, 0.8)',
                  textAlign: 'right',
                  paddingHorizontal: 3
                }}/>
              <View style={{width: 16}}/>
              <TextInput
                maxLength={2}
                style={{
                  height: 20,
                  width: 60,
                  fontSize: 13,
                  borderWidth: 1 / PixelRatio.get(),
                  borderColor: 'rgba(0, 0, 0, 0.8)',
                  color: 'rgba(0, 0, 0, 0.8)',
                  textAlign: 'right',
                  paddingHorizontal: 3
                }}/>
            </View>
          </View>
          <Slider
            style={{marginRight: 10}}
            step={1}
            mainimumValue={0}
            maximumValue={100}
            onValueChange={(profit) => {this.setState({profit})}}
            value={50}
            />
        </View>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  estimateText: {
    fontSize: 18,
    color: "rgba(0, 0, 0, 0.8)"
  }
})

export default Section
