import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  TextInput,
  SafeAreaView,
  Image,
  StatusBar
} from 'react-native';
import { connect } from 'react-redux';
import {getAllEventAction} from '../../actions';
import { Touchable, Picker, DateTimePicker, Loader } from '../common';
import {Calendar, Agenda} from 'react-native-calendars';
import _ from 'lodash'

class BigCalendarScreen extends Component {
  static navigatorStyle = {
    navBarHidden: true
  }

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      jobs: [],
      events: [],
      items: {},
      markedItems: {}
    }
    this.getEvents = this.getEvents.bind(this)
    this.togglePopup = this.togglePopup.bind(this)
    this.markAsDates = this.markAsDates.bind(this)
  }

  componentDidMount() {
    this.props.getAllEventAction().then((response) => {
      this.getEvents(response.jobs)
      this.setState({ loading: false})
    }).catch((error) => {
      this.setState({loading: false})
    })
  }


  getEvents(jobs){
    if(jobs !==undefined){

        jobs.map((data,key) =>{
          if (data.appointments !==undefined)
          {
            data.appointments.map((appointment,key) => {
              var start_date = new Date (appointment.start_date);
              var end_date = new Date(appointment.end_date);
              var temp_start_date = new Date (appointment.start_date);;
             
              for(start_date; start_date <= end_date; start_date.setDate(start_date.getDate() + 1)) {
                const strTime = this.timeToString(start_date);
                if (!this.state.items[strTime]) {
                  this.state.items[strTime] = [];
                }
                this.markAsDates(start_date, end_date, temp_start_date)
                this.state.items[strTime].push({
                  name: "Job Name: "+data.first_name+" "+data.last_name,
                  date: "Time: "+this.fullTimeToString(start_date)+" - "+this.fullTimeToString(end_date),
                  height: 80
                });
                
              }
            })
          }
        })  
      
      
    }
  }

  _navigateToDashboard = () => {
    if(this.props.user.role == "Customer"){
      this.props.navigator.push({
        screen: "roof_gravy.customer_dashboard"
      })
    }else{
      this.props.navigator.popToRoot()
    }
  }

  markAsDates(start_date,end_date,temp_start_date){

    const strdTime = this.timeToString(start_date);
    const tmpStrdTime = this.timeToString(temp_start_date);
    const enddTime = this.timeToString(end_date);
    
     if(strdTime == tmpStrdTime){
      this.state.markedItems[strdTime] = {startingDay: true, color: 'green', textColor: 'white'}
     }else if(strdTime == enddTime)
     {
      this.state.markedItems[strdTime] = {endingDay: true, color: 'green',textColor: 'white'}
     }else{
       this.state.markedItems[strdTime] = {color: 'green',textColor: 'white'}
     }
     
  }






  renderItem(item) {
    return (
      <View style={[styles.item, {height: item.height, backgroundColor: 'white'}]}>
        <Text style={styles.eventName}>{item.name}</Text>
        <Text style={styles.eventDate}>{item.date}</Text>
      </View>
    );
  }

 renderEmptyDate() {
    return (
      <View style={styles.emptyDate}><Text>No appointment!!</Text></View>
    );
  }


  rowHasChanged(r1, r2) {
    return r1.name !== r2.name;
  }

  timeToDDString(time) {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
  }

  timeToString(date) {
    return date.toISOString().split('T')[0];
  }

  fullTimeToString(date){
    return date.toISOString().split('T');
  }

	togglePopup(event) {
	  console.log(event)
	}

  loadItems(day) {
      for (let i = -15; i < 85; i++) {
        const time = day.timestamp + i * 24 * 60 * 60 * 1000;
        const strTime = this.timeToDDString(time);
        if (!this.state.items[strTime]) {
          this.state.items[strTime] = [];
          const numItems = Math.floor(Math.random() * 5);
          for (let j = 0; j < numItems; j++) {
            this.state.items[strTime] = (this.state.items[strTime] ? this.state.items[strTime] : [])
          }
        }
      }
    this.state.items[day.dateString] =  _.isEmpty(this.state.items[day.dateString]) ? [] : this.state.items[day.dateString] 
    this.setState({
     items: this.state.items
    });
  }



  render() { 
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content"/>
        <SafeAreaView style={styles.header}>
          <Touchable style={{ width: 50, alignItems: 'center', justifyContent: 'center' }} onPress={this._navigateToDashboard}>
            <Image source={require('../../../img/icons/home.png')} />
          </Touchable>
          <View style={styles.safeAreaView}>
            <Image style={styles.safeAreaImage} source={require('../../../img/icons/calendar.png')}/>
            <Text style={styles.safeAreaText}>CALENDAR</Text>
          </View>
          <Touchable style={{ width: 50, alignItems: 'center', justifyContent: 'center' }}>
            <View></View>
          </Touchable>
        </SafeAreaView>

        <ScrollView style={styles.body} contentContainerStyle={{paddingTop: 30}}>
        
        <Agenda
          // the list of items that have to be displayed in agenda. If you want to render item as empty date
          // the value of date key kas to be an empty array []. If there exists no value for date key it is
          // considered that the date in question is not yet loaded
          items={this.state.items}
          loadItemsForMonth={this.loadItems.bind(this)}

          // callback that gets called on day press
          renderItem={this.renderItem.bind(this)}
          renderEmptyDate={this.renderEmptyDate.bind(this)}
          rowHasChanged={this.rowHasChanged.bind(this)}
          selected={new Date().toJSON().slice(0,10)}
          markedDates={this.state.markedItems}
          style={[styles.calendar, {height: 530}]}
          markingType={'period'}
        />
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
  safeAreaView:{
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center' 
  },
  safeAreaImage: {
    marginTop: 3,
    marginLeft: 110,
    width: 35,
    height: 35
  },
  safeAreaText: {
    marginLeft: 3,
    marginTop: 10,
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '600'
  },
  eventName:{
    fontWeight: '600',
    fontSize: 16,
    marginTop: 5,
  },
  eventDate: {
    fontWeight: '600',
    marginTop: 3,
    fontSize:14,
    color: 'gray'
  },
  item: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17
  },
  emptyDate: {
    height: 15,
    flex:1,
    paddingTop: 30
  }

});

function mapStateToProps(state) {
  return {
    appointments: state.appointments
  }
}

export default connect(mapStateToProps, {getAllEventAction})(BigCalendarScreen);
