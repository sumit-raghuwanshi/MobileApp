import axios from 'axios';
import _ from 'lodash';
import { Navigation } from 'react-native-navigation';

class API {
  static headers() {
    return {
      "Content-Type": "application/json",
      "ACCESS_TOKEN": "72d2d63c293fa2fba53627dea33b3311"
    }
  }

  static fetch(options) {
    options.headers = _.merge(this.headers(), options.headers)

    return axios(options).catch(error => {
      Navigation.showInAppNotification({
        screen: "roof_gravy.error_view",
        passProps: {
          errorMessage: 'JSON.stringify(error)'
        }
      })

      throw error
    })
  }
}

export {API}
