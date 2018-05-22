import { persistCombineReducers } from 'redux-persist';
import storage from 'redux-persist/es/storage';
import { combineReducers } from 'redux';
import authenticationReducer from './authentication-reducer';
import appointmentsReducer from './appointments.reducer';
import usersReducer from './users.reducer';
import leadsReducer from './leads.reducer';
import messagesReducer from './messages.reducer';
import jobsReducer from './jobs.reducer';
import tasksReducer from './tasks.reducer';
import templatesReducer from './templates.reducer';

const config = {
  key: 'roof_gravy',
  storage
}

const rootReducer = persistCombineReducers(config, {
  appointments: appointmentsReducer,
  user:  authenticationReducer,
  users: usersReducer,
  jobs: jobsReducer,
  leads: leadsReducer,
  messages: messagesReducer,
  tasks: tasksReducer,
  templates: templatesReducer
});

export default rootReducer;
