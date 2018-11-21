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
import { Touchable ,Loader } from '../common';
import {Notification} from '../../helpers';
import {getParticularEstimate, updateEstimateStatus} from '../../actions';


class EstimateView extends Component {
  static navigatorStyle = {
    navBarHidden: true
  }
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      item : {},
      job_id:'',
    }

    this._discountType = this._discountType.bind(this)
    this.approvePress = this.approvePress.bind(this)
    this.denyPress = this.denyPress.bind(this)
    this.estimateStatus = this.estimateStatus.bind(this)
    this._navigateToJobScreen =  this._navigateToJobScreen.bind(this)
  }

  componentDidMount(){
    this._getParticularEstimate()
  }


  async callBack(){
     console.log("callback")
    await this.props.getParticularEstimate(this.props.job_id, this.props.item.id)
    .then((response) => {
      
       // console.log("getting particular item" , response.data)
      this.setState({
        loading: false,
        item : response.data
      })
    })
    .catch(error => {
      this.setState({
        loading: false
      })
    })
  }

  _getParticularEstimate(){
   const _this = this
    _this.props.getParticularEstimate(_this.props.job_id, _this.props.item.id)
    .then((response) => {
      this.setState({
        loading: false,
        item : response.data,
        estimate_id: _this.props.item.id,
      })
    })
    .catch(error => {
      _this.setState({
        loading: false,
        estimate_id:_this.props.item.id
      })
    })
  }


  componentWillMount(){
    console.log("wiil mount ")
    this.setState({
      item: this.props.item,
      
    })
  }

  _navigateToDashboard = () => {
    this.props.navigator.popToRoot()
  }
  _navigateToPreviousScreen = () => {
    // this.props.navigator.pop()
    alert(this.props.user.role)
    var screen_value = (this.props.user.role == "Customer" || 'undefined') ? "roof_gravy.customer_job_details" : "roof_gravy.job_details"
      this.props.navigator.push({
        screen: screen_value,
        passProps: { item: this.props.job , callBack : this.callBack.bind(this)}
    })
  }

  _discountType = (discount) => {
    if(discount.discount_type_cd == "1"){
     return(<Text>{`(${discount.percent_value}%)`}</Text>)
    }else
     return(<Text>{`($${discount.value})`}</Text>)
  }
  

  denyPress = () => {
    this.estimateStatus(1)
  }
  approvePress = () => {
   this.estimateStatus(0)
  }


  _navigateToJobScreen = () => {
   this.props.navigator.pop()
  }

  estimateStatus = (val) => {
    this.setState({loading: true})
    const _this = this
    _this.props.updateEstimateStatus(_this.props.job_id, _this.props.item.id,val)
    .then((response) => {
      this.setState({
        loading: false,
      })
    this._navigateToJobScreen();
    let msg = val === 0 ? "successfully Approved" : "successfully Deny"
    Notification.alertView(msg)
    })
    .catch(errorMessage => {
      _this.setState({
        loading: false,
      })
      Notification.error(_.join(errorMessage, "\n"))
    })
  }


  render() {
    const _this = this
  	const estimate = this.state.item

    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content"/>
        <SafeAreaView style={styles.header}>
          <Touchable style={{ width: 50, alignItems: 'center', justifyContent: 'center' }} onPress={this._navigateToDashboard}>
            <Image source={require('../../../img/icons/home.png')} />
          </Touchable>
          <View style={styles.safeAreaView}>
            <Image style={styles.safeAreaImage} source={require('../../../img/icons/estimate.png')}/>
            <Text style={styles.safeAreaText}>Estimate</Text>
          </View>
          <Touchable style={{ width: 50, alignItems: 'center', justifyContent: 'center' }}>
            <View></View>
          </Touchable>
        </SafeAreaView>
        <ScrollView style={styles.body}>
          <View style={styles.buttonContainer1}>
            <Touchable onPress={this._navigateToPreviousScreen}>
              <Image source={require('../../../img/icons/cross.png')} />
            </Touchable>
          </View>
          <View style={styles.mainView}>
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
            this.state.item.sections.map((section,key) =>{
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
            this.state.item.sections.map((section,key) =>{
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
            this.state.item.discounts.map((discount,key) =>{
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


          <View style={{ marginTop: 25 }} />
          <View style={styles.buttonContainer}>
            <View style={styles.buttonDeny}>
              <Button
                onPress={this.denyPress}
                title="Deny"
                
                color="#ea8919"
                accessibilityLabel="Deny"
              />
            </View>
            <View style={styles.buttonApprove}>
              <Button
              onPress={this.approvePress}
              title="Approve"
              color="#ea8919"
              accessibilityLabel="Approve"
              />

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
});


function mapStateToProps(state, ownProps) {
  return {
    user: state.user,
    users: state.users
  };
};

export default connect(mapStateToProps, {getParticularEstimate, updateEstimateStatus})(EstimateView);