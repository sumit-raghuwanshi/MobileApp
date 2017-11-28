import { AsyncStorage } from 'react-native';
export default {
  user: null,
  users: []
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
