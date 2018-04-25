import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    TouchableOpacity,
    StatusBar
} from 'react-native';
import Loader from '../common/loader';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../../actions';
import { getProfile,updateCurrentLocationAction } from '../../actions';
class ChooseLocation extends Component {
    static navigatorStyle = {
        navBarHidden: true
    }
    constructor(props) {
        super(props)
        this.state={
            loading:false,
            companyLocations:[],
            updated:false
        }
        this.updateCompanyLocation = this.updateCompanyLocation.bind(this)
        this.onLocationSelect = this.onLocationSelect.bind(this)
    }
    componentWillMount() {
        this.props.getProfile()
    }
    componentDidMount(){
        // this.props.getProfile()
    }

    componentWillReceiveProps(nextProps){
        //console.log("componentWillReceiveProps  "+JSON.stringify(nextProps))
        var companyLocations = this.props.user.company_locations
        if(companyLocations.length ===1&&!nextProps.updated){
            this.onLocationSelect(companyLocations[0])
        }else if(nextProps.updated){
            this.props.navigator.resetTo({
                        screen: 'roof_gravy.dashboard'
                    })
        }
    }
    updateCompanyLocation(payload) {
        this.setState({
            loading:true
        });
        console.log("Hello "+JSON.stringify(payload))
        this.props.updateCurrentLocationAction(payload)
        // .then((response) => {
        //     console.log("Success of location " + JSON.stringify(response))
        //         this.setState({
        //             loading: false
        //         }, () => {
        //             this.props.navigator.resetTo({
        //                 screen: 'roof_gravy.dashboard'
        //             })
        //         });
        //     }).catch((error) => {
        //         console.log("Error in choose location" + JSON.stringify(error))
        //         this.setState({
        //             loading: false
        //         })
        //     })
    }
  
    onLocationSelect(data){
        //console.log("onLocationSelect --->"+JSON.stringify(data))
        var payload = {
            data: {
                company_location_id: data.id.$oid,
            }
        };
        this.updateCompanyLocation(payload)
    }

    render() {
        //console.log("Props inside the choose location "+JSON.stringify(this.props))
        const companyLocations = this.props.user.company_locations
        //if(companyLocations)

        return (
            <View style={styles.container}>
                <StatusBar barStyle="light-content" />

                <Image resizeMode={"stretch"} style={styles.background} source={require("../../../img/login/login-bg.png")} />
                <View style={styles.formContainer}>

                    <View style={styles.imageContainer}>
                        <Image source={require("../../../img/logo.png")} />
                    </View>
                    <View style={{backgroundColor:'#ffffff'}}>
                        <Text>This step can skipped by setting a default location in your profile preferences under global setting</Text>
                        {companyLocations.map((value, index) => (
                            <TouchableOpacity key={index} onPress={()=>this.onLocationSelect(value)}>
                                <View style={{marginTop:10, backgroundColor: '#E88A18', borderRadius: 10 }}>
                                    <View style={{ margin: 2, backgroundColor: '#ffffff', borderRadius: 10 }}>
                                        <Text style={{ textAlign: 'center' }}>{value.name}</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>


                        ))
                        }
                    </View>
                    
                    {/* <Row
                        locationName={value.name}
                        locationTime={value.last_location_time}
                        index={index}
                        onClick={() => this.onLocationSelect(value.id.$oid, index)}
                    /> */}

                </View>
                <Loader loading={this.state.loading} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    },
    background: {
        position: "absolute",
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
        width: undefined,
        height: undefined
    },
    formContainer: {
        height: 345.6,
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        paddingHorizontal: 22.05,
        justifyContent: 'center'
    },
    imageContainer: {
        alignItems: 'center'
    },

});

function mapStateToProps(state, ownProps) {
    //console.log("mapStateToProps "+JSON.stringify(state))
    return {
        user: state.user,
        updated:state.user.updated
    };
};


export default connect(mapStateToProps, { getProfile, updateCurrentLocationAction })(ChooseLocation);
