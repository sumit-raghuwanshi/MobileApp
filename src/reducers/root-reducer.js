import { combineReducers } from 'redux';
import authenticationReducer from './authentication-reducer';

const rootReducer = combineReducers({
	user: authenticationReducer
});

export default rootReducer;
