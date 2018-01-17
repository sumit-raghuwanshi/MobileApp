import { Navigation } from 'react-native-navigation';

class Notification{
  static error(message) {
    Navigation.showInAppNotification({
      screen: "roof_gravy.error_view",
      passProps: {
        message
      }
    })
  }
}

export { Notification }
