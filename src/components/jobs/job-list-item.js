import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image
} from 'react-native';
import { Touchable } from '../common';

var colors = ["#40B34F", "#846542", "#FECD53", "#919AAC", "#5791CA", "#E6892C", "#BF2932", "#000000"]

const prospect = require("../../../img/jobStatus/prospect.png");
const approved = require("../../../img/jobStatus/approved.png");
const completed = require("../../../img/jobStatus/completed.png");
const invoiced = require("../../../img/jobStatus/invoiced.png");
const closed = require("../../../img/jobStatus/closed.png");
const lead = require("../../../img/jobStatus/leads.png");

class JobListItem extends Component {
    getImageFromStatus(){
      var status = this.props.job.status_cd
      switch (status) {
        case 1 : return(
          prospect
        )
        case 2 : return(
          approved
        )
        case 3 : return(
          completed
        )
        case 4 : return(
          invoiced
        )
        case 5 : return(
          closed
        )
        default : return(
          lead
        )
      } 
    }
    //this.props.index % 2 == 0 ? styles.containerWhite : styles.containerGrey
  render() {
    console.log("index of each elemnent", this.props.index)
    var job = this.props.job
    var firstName = job["first_name"] ? job["first_name"] : "N/A"
    var lastName = job["last_name"] ? job["last_name"] : ""

    console.log("kjsbh jb jwbefjs bsajfblasj bsaljghb dsafljghb" , this.props.job.status_cd)
    return (
      <Touchable style={styles.container}
        onPress={() => this.props.onPress && this.props.onPress(job)}>
        <View style={this.props.index % 2 == 0 ? styles.contentContainerWhite : styles.contentContainerGrey}>
          {/* <View style={{width: 44, backgroundColor: colors[Math.floor((Math.random() * colors.length))]}}> */}
          <View style={{width: 44, backgroundColor: "transparent" , justifyContent: "center" , alignItems : "center"}}>
          <Image source={this.getImageFromStatus()} style={{width: 35, height: 35}}/>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.title} numberOfLines={1}>{`${firstName} ${lastName}`}</Text>
          </View>
          <View style={{ alignItems: 'flex-end', justifyContent: 'center' }}>
            
            <Image source={require('../../../img/icons/chevron.png')}/>
            {/* {this.getImageFromStatus} */}
          </View>
        </View>
      </Touchable>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    height: 44,
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
    fontSize: 17
  },
  textContainer: {
    flex: 1,
    paddingHorizontal: 10,
    justifyContent: 'center'
  }
});

export default JobListItem
