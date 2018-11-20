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
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  Button,
  Modal,
} from 'react-native';
import {connect} from 'react-redux';
import { Touchable ,Loader } from '../../common';
import {Notification} from  '../../../helpers';
import {getParticularInvoice} from '../../../actions';
import Payment from 'payment'
import Stripe from 'react-native-stripe-api';
import {makePaymentAction} from '../../../actions';



class JobEstimatePayment extends Component {
  static navigatorStyle = {
    navBarHidden: true
  }
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      modalVisible: false,
      card_number: '',
      cvv: '',
      exp_date: '',
      card_number_error: false,
      exp_error: false,
      make_pay_error: true,
      error: '',
      token: null,
      paymentStatus: false
    }
    this.handleFieldParamsChange = this.handleFieldParamsChange.bind(this)
    this.makePay = this.makePay.bind(this)
    this.cardErrorRender  = this.cardErrorRender.bind(this)
    this.paymentRender = this.paymentRender.bind(this)
    this.renderView = this.renderView.bind(this)
  }

  componentWillReceiveProps(props){
    this.setState({modalVisible: props.props.modalVisible}) 
   
    if(props.jobs.success !== undefined && props.jobs.success !== '')
    {
      this.setState({paymentStatus: true})
      setTimeout(function(){ 
         this.setState({modalVisible: false}) 
      }.bind(this), 1000);
    }  
  }


  async makePay(){
    const invoice = this.props.props.invoice
    const apiKey = 'pk_test_FoFciEBNWgBOwpo78vWSqlHf';
    const client = new Stripe(apiKey);
    var data =  {
      number: this.state.card_number,
      exp_month: this.state.exp_date.split('/')[0],
      exp_year: this.state.exp_date.split('/')[1],
      cvc: this.state.cvv
    }
    try {
      this.setState({ loading: true, token: null, error: null })
      const token =  await client.createToken(data);
      this.props.makePaymentAction(invoice,token)
      this.setState({ loading: false, error: undefined, token })
    } catch (error) {
      this.setState({ loading: false, error })
    }
  }

  handleFieldParamsChange(value, value_type){
    var card_number, exp_date;
    if(value_type == 'card_number' && value.length < 17 ){
      card_number = value
      this.setState({card_number: value, card_number_error: true });
    }
    if(value_type == 'cvv' && value.length < 4 ){
      this.setState({ [value_type]: value });
    }
    if(value_type == 'exp_date' && value.length < 6 ){
      var exp_value = value.length == 2 ? value+"/" : value
      exp_date = exp_value
      this.setState({exp_date: exp_value, exp_error: true});
    }
    this.validationCardNumber(value,value_type,card_number, exp_date)
  
  }

  validationCardNumber(value,value_type, card_number,exp_date){
    if(value_type == 'card_number'){
      valid = Payment.fns.validateCardNumber(this.state.card_number);
      this.setState({card_number_error: !valid });
    }
    if(value_type == 'exp_date'){

      var today = new Date();
      var mm = today.getMonth()+1;
      var yy = today.getFullYear()%100;
      var inputmm = this.state.exp_date.split('/')[0]
      var inputyy = (this.state.exp_date.split('/')[1] || 0)
      if(!(parseInt(inputyy) >= yy && parseInt(inputmm) >= mm)){
        this.setState({exp_error: true});
      }else{
        this.setState({exp_error: false, make_pay_error: false});
      }
    }
  }

 
  cardErrorRender(error_type){
     if(error_type == 'card_number' && this.state.card_number_error){
      return(<Text style={styles.errorText}>Card number is not valid</Text>)
     }
     if(error_type == 'exp_date' && this.state.exp_error){
           return(<Text style={styles.errorText}>Expiration date not valid</Text>)
     }
  }


  paymentRender(){
    if((!this.state.card_number_error) && (!this.state.exp_error) && (!this.state.make_pay_error)){
      return (<View style={styles.buttonContainer}>
        <TouchableOpacity onPress={this.makePay} style={styles.buttonMakePay}>
          <Text style={styles.buttonText}>Confirm</Text>
        </TouchableOpacity>
      </View>)

    }else{
      return(<View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.buttonMakePayDisabled}>
          <Text style={styles.buttonText}>Confirm</Text>
        </TouchableOpacity>
      </View>)
    }
  }



  renderView(props){
    if(!this.state.paymentStatus){
      return(<View style={styles.modalInner}>
        <TouchableHighlight
        onPress={() => {
        this.props.setModalVisible(!this.state.modalVisible);
        }}>
        <Text style={styles.crossText}><Image style={styles.crossImg} source={require("../../../../img/icons/cross.png")} /></Text>
        </TouchableHighlight>
          
        <View style={{ flexDirection: 'row', marginBottom: 12 }}>
          <View style = {{flexDirection : "row" , backgroundColor : "#FFFFFF" , flex :1}}>
            <View style={{ flex: 1 ,width:'50%' , marginTop : 12}}>
              <View style={styles.labelContainerwithoutrow}>
                  <Text style={styles.labelStyle}>Amount: </Text>
                  <Text style={styles.inputStyle}>$ {props.invoice == undefined ? '' : props.invoice.amount}</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={{ flexDirection: 'row', marginBottom: 12 }}>
          <View style = {{flexDirection : "row" , backgroundColor : "#FFFFFF" , flex :1}}>
            <View style={{ flex: 1 ,width:'50%' , marginTop : 12}}>
              <View style={styles.labelContainerwithoutrow}>
                <Text style={styles.labelStyle}>Card Number </Text>
                <TextInput
                  placeholder="Card number"
                  value={this.state.card_number}
                  onChangeText={(text) => this.handleFieldParamsChange(text,'card_number')}
                  style={styles.textField} />
                  {this.cardErrorRender('card_number')}
              </View>
            </View>
          </View>
        </View>
        <View style={{ flexDirection: 'row', marginBottom: 12 }}>
          <View style = {{flexDirection : "row" , backgroundColor : "#FFFFFF" , flex :1}}>
            <View style={{ flex: 1 ,width:'50%' , marginTop : 12}}>
              <View style={styles.labelContainerwithoutrow}>
                  <Text style={styles.labelStyle}>CVC</Text>
                   <TextInput
                    placeholder="CVV"
                    value={this.state.cvv}
                    onChangeText={(text) => this.handleFieldParamsChange(text,'cvv')}
                    style={styles.textField_cvc_num} />

              </View>
            </View>
            <View style={{ flex: 1,width:'50%',marginTop : 12}}>
              <View style={styles.labelContainerwithoutrow}>
                <Text style={styles.labelStyle}>Exp Date </Text>
                <TextInput
                  placeholder="MM/YY"
                  value={this.state.exp_date}
                  onChangeText={(text) => this.handleFieldParamsChange(text,'exp_date')}
                  style={styles.textField_exp_date} />
                  {this.cardErrorRender('exp_date')}
              </View>
            </View>
          </View>    
        </View>

        {this.paymentRender()}
      </View>)
    }else{
      return(
        <View style={styles.modalPayment}>
          <Image style={styles.paymentImg} source={require("../../../../img/icons/tick-inside-a-circle.png")} />
          <Text style={{fontSize: 21,top: 55,fontWeight: '700', marginLeft: 10}}>Payment</Text>
          <Text style={{fontSize: 20,top:55,fontWeight: '700', marginLeft: 5}}>Successfull!!</Text>       
        </View>)
    }

  }


  render() {
    const props = this.props.props
    return (
      <View style={{marginTop: 22}}>
       <Modal
          animationType="fade"
          transparent={true}
          visible={this.state.modalVisible}
          style={styles.modalmain}
          onRequestClose={() => {
           
          }}>
          <View style={styles.modalBody}>
           {this.renderView(props)}
          </View>
        </Modal>
      </View>
    );


  }
}


const styles = StyleSheet.create({
  modalBody: {
    flex: 1.5,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(52, 52, 52, 0.8)',
    shadowOffset:{  width: 10,  height: 10,  },
    shadowColor: 'black',
    shadowOpacity: 1.0,
  },

  modalInner: {
    width: 400,
    height: 350,
    justifyContent: 'center',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.6)'
  },

  modalPayment: {
    width: 400,
    height: 350,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.6)'
  },
  errorText:{
    fontSize: 15,
    color: 'red',
  },
  modalmain:{
    height: 150,
    width: 200,
    backgroundColor: 'white',
  },
  textField: {
    height: 44,
    width: 380,
    backgroundColor: '#FFFFFF',
    fontSize: 17,
    color: 'rgba(0, 0, 0, 0.73)',
  },
  textField_exp_date:{
    height: 44,
    width: 160,
    backgroundColor: '#FFFFFF',
    fontSize: 17,
    color: 'rgba(0, 0, 0, 0.73)',
  },
  textField_cvc_num:{
    height: 44,
    width: 160,
    backgroundColor: '#FFFFFF',
    fontSize: 17,
    color: 'rgba(0, 0, 0, 0.73)',
  },
  crossImg: {
    backgroundColor: '#ff0000',
    height: 70,
    width:70,
    position: 'absolute',
    top: 0,
    marginRight: 10
  },

  paymentImg: {
    height: 170,
    width:170,
    position: 'absolute',
    top: 20,
    marginRight: 100
  },

  crossText: {
    fontSize: 20,
    marginLeft: 360,
    marginTop: 15,

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
  },
  inputStyle: {
    backgroundColor: '#FFFFFF',
    fontSize: 15,
    color: 'rgba(0, 0, 0, 0.73)',
    fontWeight : 'bold',
  },
   field: {
    width: 300,
    color: '#449aeb',
    borderColor: '#000000',
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: '#FFFFFF',
    overflow: 'hidden',
  },

  buttonContainer: {
    flexDirection: 'row',
    flex: 1
  },
  buttonMakePay: {
    height: 25,
    width: 100,
    backgroundColor: '#E88A18',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 250
  },
  buttonMakePayDisabled: {
    height: 25,
    width: 100,
    backgroundColor: '#D3D3D3',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 250
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
    width: 'auto'
  },
});


function mapStateToProps(state) {
  return {
    jobs: state.jobs,
    user: state.user,
    response: state.jobs.success
  };
};



export default connect(mapStateToProps, {makePaymentAction})(JobEstimatePayment);