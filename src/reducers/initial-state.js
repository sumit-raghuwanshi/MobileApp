import { AsyncStorage } from 'react-native';
export default {
};

export async function load(success) {
  var user = await AsyncStorage.getItem('currentUser');
  user = JSON.parse(user)

  var initialState = {
    user
  }

  if (success)
    success(initialState)
}
