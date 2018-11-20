import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image
} from 'react-native';
import { Touchable } from '../common';

var colors = ["#40B34F", "#846542", "#FECD53", "#919AAC", "#5791CA", "#E6892C", "#BF2932", "#000000"]


class EstimateListItem extends Component {
  constructor(props) {
    super(props)
    this.imageApproved = this.imageApproved.bind(this)
  }
  getEstimateStatus(){
    var status = true 
    return status 
  }

 
  imageApproved(estimate){
    if(estimate.estimate_status_cd == 0){
     return( <Image style={styles.approvedImage} source={require('../../../img/icons/right-icon.png')}/>)
    }else{
      return(<Image style={styles.approvedImage} source={require('../../../img/icons/red-cross.png')}/>)
    }
  }

  render() {
    var estimate = this.props.estimate
   
    return (
     <Touchable style={styles.container} 
       onPress={() => this.props.onPress && this.props.onPress(estimate)}>
        <View style={this.props.index % 2 == 0 ? styles.contentContainerWhite : styles.contentContainerGrey}>
          {/* <View style={{width: 44, backgroundColor: colors[Math.floor((Math.random() * colors.length))]}}> */}
          <View style={{width: 44, backgroundColor: "transparent" , justifyContent: "center" , alignItems : "center"}}>
          </View>
          <View>
           {this.imageApproved(estimate)}
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.title} numberOfLines={1}>{`${estimate.name} `}</Text>
            <Text style={styles.title} numberOfLines={1}>{`Price: ${estimate.total}`}</Text>
          </View>
          <View style={{ alignItems: 'flex-end', justifyContent: 'center' }}>
            <Image source={require('../../../img/icons/arrow-right.png')}/>
            {/* {this.getImageFromStatus} */}
          </View>
        </View>
      </Touchable>
      )
  }
}

const styles = StyleSheet.create({
  container: {
    height: 46,
    marginBottom: 10,
    backgroundColor: "#FFFFFF"
  },
  contentContainerWhite: {
    flex: 1,
    flexDirection: 'row',
    paddingRight: 15,
    backgroundColor: 'white',
  },
  contentContainerGrey: {
    flex: 1,
    flexDirection: 'row',
    paddingRight: 15,
    backgroundColor: '#D3D3D3'
  },
  title: {
    color: 'rgba(0, 0, 0, 0.7)',
    fontSize: 17,
    alignItems: 'flex-start',
  },
  textContainer: {
    flex: 1,
    paddingHorizontal: 10,
    justifyContent: 'center',
   
  },
  approvedImage: {
    width:20,
    height: 20,
    marginTop: 3,
    justifyContent: 'flex-start',
     
  }
});

export default EstimateListItem
