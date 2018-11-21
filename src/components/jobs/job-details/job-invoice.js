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
import {Notification} from  '../../../helpers';
import {getParticularInvoice} from '../../../actions';
import JobEstimatePayment from './job-estimate-payment'



class JobInvoice extends Component {
  static navigatorStyle = {
    navBarHidden: true
  }
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      invoice: {},
      estimate: {},
      modalVisible: false,
    }
    this._discountType = this._discountType.bind(this)
    this.makePayment = this.makePayment.bind(this)
    this.setModalVisible = this.setModalVisible.bind(this)
  }

  componentDidMount(){
    this._getParticularInvoice()
  }


  setModalVisible(visible) {
  
    this.setState({modalVisible: visible});
  }


  async callBack(){
     console.log("callback")
    await  this.props.getParticularInvoice(this.props.job_id,this.props.estimate.id)
    .then((response) => {
      	
       // console.log("getting particular item" , response.data)
      this.setState({
        loading: false,
        invoice : response.data.invoice,
        estimate: response.data,
        modalVisible: false
      })
    })
    .catch(error => {
      this.setState({
        loading: false
      })
    })
  }

  _discountType = (discount) => {
    if(discount.discount_type_cd == "1"){
     return(<Text>{`(${discount.percent_value}%)`}</Text>)
    }else
     return(<Text>{`($${discount.value})`}</Text>)
  }



  _navigateToDashboard = () => {
    this.props.navigator.popToRoot()
  }


  _navigateToPreviousScreen = () => {
      var screen_value = (this.props.user.role == "Customer" || 'undefined') ? "roof_gravy.customer_job_details" : "roof_gravy.job_details"
            this.props.navigator.push({
              screen: screen_value,
              passProps: { item: this.props.job , callBack : this.callBack.bind(this)}
          })
  }



  _getParticularInvoice(){

  	this.props.getParticularInvoice(this.props.job_id,this.props.estimate.id)
    .then((response) => {
      // console.log("getting particular item" , response.data)
      this.setState({
        loading: false,
        invoice : response.data.invoice,
        estimate : response.data,
        modalVisible: false
      })
    })
    .catch(error => {
      this.setState({
        loading: false,
      })
    })
  }


 
  componentWillMount(){

    console.log("wiil mount ")
    this.setState({
      estimate: this.props.estimate,
      invoice: this.props.invoice
    })
  }

  makePayment(){
  	 this.setModalVisible(true);
  }


 
  render() {
  
    const _this = this
    const estimate = this.state.estimate;
    const invoice = this.state.invoice;
   
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content"/>
        <SafeAreaView style={styles.header}>
          <Touchable style={{ width: 50, alignItems: 'center', justifyContent: 'center' }} onPress={this._navigateToDashboard}>
            <Image source={require('../../../../img/icons/home.png')} />
          </Touchable>
          <View style={styles.safeAreaView}>
            <Image style={styles.safeAreaImage} source={require('../../../../img/icons/estimate.png')}/>
            <Text style={styles.safeAreaText}>Invoice</Text>
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

         <View style={{margin: 10}}>
            <Text style={{
              fontSize: 17,
              color: 'rgba(0, 0, 0, 0.73)',
              fontWeight : 'bold'
            }}>Invoice Details</Text>
        </View> 
          <View style={styles.mainView}>
          	<View style={{ flexDirection: 'row', marginBottom: 12 }}>
  	  				<View style = {{flexDirection : "row" , backgroundColor : "#FFFFFF" , flex :1}}>
  	      			<View style={{ flex: 1 ,width:'50%' , marginTop : 12}}>
  			          <View style={styles.labelContainerwithoutrow}>
  			              <Text style={styles.labelStyle}>Amount : </Text>
  			              <Text>$ {invoice == undefined ? '' : invoice.amount}</Text>
  			          </View>
  	        		</View>
  				      <View style={{ flex: 1,width:'50%',marginTop : 12}}>
  								<View style={styles.labelContainerwithoutrow}>
  								  <Text style={styles.labelStyle}>Due On : </Text>
  								  <Text>{invoice == undefined ? '' : invoice.due_date}</Text>
  								</View>
  				      </View>
  				    </View>    
  				  </View>


          	<View style={{ height: 15 }} />

	          <View style={styles.buttonContainer}>
	            <TouchableOpacity onPress={this.makePayment} style={styles.buttonMakePay}>
	              <Text style={styles.buttonText}>Make A Payment</Text>
	            </TouchableOpacity>
	          </View>

  					<View style={{ flexDirection: 'row', marginBottom: 12 }}>
  	  				<View style = {{flexDirection : "row" , backgroundColor : "#FFFFFF" , flex :1}}>
  	      			<View style={{ flex: 1 ,width:'50%' , marginTop : 12}}>
  			          <View style={styles.labelContainer}>
  			              <Text style={styles.labelStyle}>Name : </Text>
  			              <Text>{estimate.name}</Text>
  			          </View>
  	        		</View>
  				      <View style={{ flex: 1,width:'50%',marginTop : 12}}>
  								<View style={styles.labelContainer}>
  								  <Text style={styles.labelStyle}>Number : </Text>
  								  <Text>{estimate.number}</Text>
  								</View>
  				      </View>
  				    </View>    
  				  </View>
            <View style={{ flexDirection: 'row', marginBottom: 12 }}>
    				  <View style={{ flex: 1,width:'100%',marginTop : 12}}>
    		     		<View style={styles.labelContainer}>
    						  <Text style={styles.labelStyle}>Description : </Text>
    						  <Text>{estimate.description}</Text>
    						</View>
    				  </View>
            </View>
            <View style={{ flexDirection: 'row', marginBottom: 12 }}>
              <View style = {{flexDirection : "row" , backgroundColor : "#FFFFFF" , flex :1}}>
                <View style={{ flex: 1 ,width:'50%' , marginTop : 12}}>
                  <View style={styles.labelContainer}>
                      <Text style={styles.labelStyle}>Price : </Text>
                      <Text>{estimate.sub_price}</Text>
                  </View>
                </View>
                <View style={{ flex: 1,width:'50%',marginTop : 12}}>
                  <View style={styles.labelContainer}>
                    <Text style={styles.labelStyle}>Taxes : </Text>
                    <Text></Text>
                  </View>
                </View>
              </View>
            </View>
          </View>

          <View style={{marginLeft: 10, marginTop: 10}}>
            <Text style={{
              fontSize: 17,
              color: 'rgba(0, 0, 0, 0.73)',
              fontWeight : 'bold'
            }}>Sections</Text>
          </View>
          <View style={{ width:'100%',marginTop : 6}}>
	          { 
	            estimate.sections.map((section,key) =>{
	            return(
	                <View style={{backgroundColor: '#FFFFFF', paddingLeft: 15 , alignItems : "center" ,
	                flexDirection : "row",borderBottomWidth:1,paddingHorizontal: 10, borderBottomColor: '#ddd'}}>
	                  <Text >{section.name} {"\n"}
	                  {`Price: $ ${section.total_price}`}</Text>
	                </View>
	            )
	          })}
	        </View>
          <View style={{marginLeft: 10, marginTop: 10}}>
            <Text style={{
              fontSize: 17,
              color: 'rgba(0, 0, 0, 0.73)',
              fontWeight : 'bold'
            }}>Taxes</Text>
          </View>
          <View style={{ width:'100%',marginTop : 6}}>
          
          { 
            estimate.sections.map((section,key) =>{
              var tax = section.tax
              if(tax !== null && tax.tax_type_cd == 0){
                return(
                  <View style={{backgroundColor: '#FFFFFF', paddingLeft: 15 , alignItems : "center" ,
                  flexDirection : "row",borderBottomWidth:1,paddingHorizontal: 10, borderBottomColor: '#ddd'}}>
                    <Text >{tax.description}</Text>
                  </View>
                )
              }else{
                return(<View></View>)
              }
          })}
          </View>
          <View style={{marginLeft: 10, marginTop: 10}}>
            <Text style={{
              fontSize: 17,
              color: 'rgba(0, 0, 0, 0.73)',
              fontWeight : 'bold'
            }}>Discounts</Text>
          </View>
          <View style={{ width:'100%',marginTop : 6}}>
          
          { 
            estimate.discounts.map((discount,key) =>{
              return(
                <View style={{backgroundColor: '#FFFFFF', paddingLeft: 15 , alignItems : "center" ,
                flexDirection : "row",borderBottomWidth:1,paddingHorizontal: 10, borderBottomColor: 'black'}}>
                  <Text>Discount: </Text>
                  <Text>{discount.description} </Text>
                  {_this._discountType(discount)}
                  <Text>{`  $${discount.final_value}`}</Text>
                </View>
              )
             
          })}
          </View>
          <JobEstimatePayment setModalVisible={this.setModalVisible} props={this.state}/>
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

  buttonMakePay: {
    height: 30,
    width: 350,
    backgroundColor: '#E88A18',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 30
  }, 

  labelContainer:{
    // height: 25, 
    backgroundColor: '#FFFFFF', 
    paddingLeft: 15 , 
    alignItems : "center" , 
    flexDirection : "row"
  },
 labelContainerwithoutrow:{
    // height: 25, 
    backgroundColor: '#FFFFFF', 
    paddingLeft: 15 , 
    alignItems : "flex-start", 

  },
  labelStyle: {
    backgroundColor: '#FFFFFF',
    fontSize: 15,
    color: 'rgba(0, 0, 0, 0.73)',
    fontWeight : 'bold',

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
});


function mapStateToProps(state, ownProps) {
  return {
    user: state.user,
    users: state.users
  };
};

export default connect(mapStateToProps, {getParticularInvoice})(JobInvoice);