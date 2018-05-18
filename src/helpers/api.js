import axios from 'axios';
import _ from 'lodash';
import { Navigation } from 'react-native-navigation';

class API {
  static headers() {
    return {
      "Content-Type": "application/json"
    }
  }

  static fetch(options) {
    debugger;
    console.log("optionssssssss",options);
    options.headers = _.merge(this.headers(), options.headers)
    var appState = AppStore.getState()

    if (appState.user) {
      options.headers["ACCESS_TOKEN"] = appState.user.token
      options.headers["LOCATION_TOKEN"] = appState.user.company_locations[0].token
    }

    return axios(options).catch(error => {
      
       //console.log("Helllo"+JSON.stringify(error))
      var message = error.response.data.success !== undefined ? error.response.data.success : error.response.data.error 
      Navigation.showInAppNotification({
        screen: "roof_gravy.error_view",
        passProps: {
          message: message
        }
      })

      throw error
    })
  }
}

export {API}
