import { combineReducers } from 'redux';
import authenticationReducer from './authentication-reducer';
import usersReducer from './users.reducer';

const rootReducer = combineReducers({
	user:  authenticationReducer,
  users: usersReducer
});

export default rootReducer;
