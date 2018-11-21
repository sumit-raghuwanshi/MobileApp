
import React, {Component} from 'react';
import {
  StyleSheet,
  StatusBar,
  SafeAreaView,
  View,
  ListView,
  Text,
  Image,
  ScrollView,
  TouchableHighlight,
  TouchableOpacity,
  Button,
} from 'react-native';
import {connect} from 'react-redux';
import { Touchable ,Loader } from '../../common';
import {Notification} from '../../../helpers';
import {getJobPayments} from '../../../actions';


class JobPayment extends Component {
  static navigatorStyle = {
    navBarHidden: true
  }
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      item : {},
      invoices: [],
      job_id:'',
    }

    // this._discountType = this._discountType.bind(this)
    // this.approvePress = this.approvePress.bind(this)
    // this.denyPress = this.denyPress.bind(this)
    this._navigateToDashboard = this._navigateToDashboard.bind(this)
    this._navigateToPreviousScreen =  this._navigateToPreviousScreen.bind(this)
  	this._getPayments = this._getPayments.bind(this)
  	this.renderData = this.renderData.bind(this)
  }

  componentDidMount(){
    this._getPayments()
  }

  _navigateToPreviousScreen = () => {
    var screen_value = (this.props.user.role == "Customer") ? "roof_gravy.customer_job_details" : "roof_gravy.job_details"
      this.props.navigator.push({
        screen: screen_value,
        passProps: { item: this.props.job , callBack : this.callBack.bind(this)}
    })
  }

  
  _navigateToDashboard = () => {
    this.props.navigator.popToRoot()
  }



  async callBack(){
     console.log("callback")
    await getJobPayments(this.props.job_id)
    .then((response) => {
      this.setState({
        loading: false,
        invoices : response
      })
    })
    .catch(error => {
      this.setState({
        loading: false
      })
    })
  }



  componentWillMount(){
    console.log("wiil mount ")
    this.setState({
      job_id: this.props.job_id,     
    })
  }
  

  _getPayments(){
  	this.props.getJobPayments(this.props.job_id).then((response) => {

      this.setState({
        loading: false,
        invoices: response
      })
    })
    .catch(error => {
      this.setState({
        loading: false
      })
    })
  }

  renderData(){
  	return this.state.invoices.map((data,index) => {
  		return(
					<Touchable style={styles.container1}>
		        <View style={index % 2 == 0 ? styles.contentContainerWhite : styles.contentContainerGrey}>
		          {/* <View style={{width: 44, backgroundColor: colors[Math.floor((Math.random() * colors.length))]}}> */}
		          <View style={{width: 44, backgroundColor: "transparent" , justifyContent: "center" , alignItems : "center"}}>
								<Text style={styles.title} numberOfLines={1}>$ {`${data.amount}`}</Text>

		          </View>
		          <View style={styles.textContainer}>
		           	<Text style={styles.title} numberOfLines={1}>{`${data.due_date}`}</Text>
		          </View>
		          <View style={{ alignItems: 'flex-end', justifyContent: 'center' }}>
		            
		            <Image source={require('../../../../img/icons/arrow-right.png')}/>
		            {/* {this.getImageFromStatus} */}
		          </View>
		        </View>
		      </Touchable>

  			)
  	})
  }

  render() {

    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content"/>
        <SafeAreaView style={styles.header}>
          <Touchable style={{ width: 50, alignItems: 'center', justifyContent: 'center' }} onPress={this._navigateToDashboard}>
            <Image source={require('../../../../img/icons/home.png')} />
          </Touchable>
          <View style={styles.safeAreaView}>
            <Image style={styles.safeAreaImage} source={require('../../../../img/icons/payments.png')}/>
            <Text style={styles.safeAreaText}>Payments</Text>
          </View>
          <Touchable style={{ width: 50, alignItems: 'center', justifyContent: 'center' }}>
            <View></View>
          </Touchable>
        </SafeAreaView>
        <ScrollView style={styles.body}>
          <View style={styles.buttonContainer1}>
            <Touchable onPress={this._navigateToPreviousScreen}>
              <Image source={require('../../../../img/icons/cross.png')} />
            </Touchable>
          </View>
          <View style={styles.mainView}>
  					<View style={{ flexDirection: 'row', marginBottom: 12 }}>
  				  	{this.renderData()}
  				  </View>
          </View>
    		</ScrollView>
      	<Loader loading={this.state.loading}/>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(194, 185, 165, 0.31)'
  },
  header: {
    flexDirection: 'row',
    height: 66,
    backgroundColor: '#354052',
    zIndex: 1
  },
  body: {
    flex: 1
  },
  mainView: {
    backgroundColor: '#FFFFFF',
  },
  buttonContainer1: {
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 15,
    justifyContent: 'space-between'
  },

  labelContainer:{
    // height: 25, 
    backgroundColor: '#FFFFFF', 
    paddingLeft: 15 , 
    alignItems : "center" , 
    flexDirection : "row"
  },
  labelStyle: {
    backgroundColor: '#FFFFFF',
    fontSize: 15,
    color: 'rgba(0, 0, 0, 0.73)',
    fontWeight : 'bold'
    // borderBottomWidth: 1,
    // borderBottomColor: 'rgba(0, 0, 0, 0.2)'
  },
  safeAreaView:{
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center' 
  },
  safeAreaImage: {
    marginTop: 10,
    marginLeft: 90,
    width: 35,
    height: 35
  },

  safeAreaText: {
    marginLeft: 5,
    marginTop: 10,
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '600'
  }, 

  buttonContainer: {
    flexDirection: 'row',
    flex: 1
  
  },
  buttonDeny: {
    marginLeft: 20,
  }, 
  buttonApprove: {
    
    marginLeft: 250
   
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600'
  },
   container1: {
    height: 35,
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
    marginLeft: 10,
  },
  textContainer: {
    paddingHorizontal: 110,
    justifyContent: 'center'
  }
});


function mapStateToProps(state, ownProps) {
  return {
    user: state.user,
    users: state.users
  };
};

export default connect(mapStateToProps, {getJobPayments})(JobPayment);