import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import { connect } from 'react-redux';
import {getAllMeasurements} from '../../actions'
import { Touchable } from '../common'
import styles from './styles'

class MeasurementListScreen extends Component {
    // static navigatorStyle = {
    //     navBarHidden: true
    // }

    constructor(props) {
        super(props);
        this.state={
            job_id:'',
            measurementList:[]
        }
    }
    componentDidMount(){
        this.setState({
            job_id:this.props.job_id
        },()=>{
            this.props.getAllMeasurements(this.state.job_id)
            .then((response)=>{
                console.log("Hello Brother ",response)
                this.setState({
                    measurementList:response.data.measurements
                });
            })
            .catch((error) =>{
                console.log("error ", error)

            })
        });
    }
  render() {
      const renderMeasureItems = this.state.measurementList
      .map((data,key)=>{
          return(
              <Touchable key={key} style={styles.item_container}
                  >
                  <View >
                    <View style={styles.textContainer}>
                        <Text style={styles.title}>{data.name}</Text>
                    </View>
                    <View style={styles.imageContainer}>
                            <Image source={require('../../../img/icons/chevron.png')} />
                    </View>
                </View>
            </Touchable>
          )
      })
    return (
      <View style={styles.main_container}>
        <View style={styles.button_container}>
            <Touchable 
                    onPress={() =>
                        this.props.navigator.push({
                            screen: 'roof_gravy.measurements_create',
                            passProps: { job_id: this.state.job_id }
                        })}>
                <Image source={require('../../../img/icons/add.png')} />
            </Touchable>
        </View>
            {renderMeasureItems}
      </View>
    );
  }
}

function mapStateToProps(state, ownProps) {
    console.log("MapStateTpProps => ",state.jobs)
    return {
    };
};

export default connect(mapStateToProps, { getAllMeasurements })(MeasurementListScreen);