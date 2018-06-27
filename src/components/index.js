import { Navigation } from 'react-native-navigation';
import SignIn from './sign-in/sign-in';
import Calendar from './calendar/calendar';
import Dashboard from './dashboard/dashboard';
import EstimateCreateScreen from './estimates/estimate-create/estimate-create-screen';
import EstimateJobSelectionScreen from './estimates/estimate-create/job-selection-screen';
import EstimateSectionCreateScreen from './estimates/section-create/section-create-screen';
import LeadCreate from './leads/lead-create/lead-create';
import AppointmentCreate from './appointments/appointment-create/appointment-create';
import MeasurementsCreateScreen from './measurements/measurements-create/measurements-create-screen';
import Messages from './messages/messages';
import Message from './message/message';
import MessageCreate from './message-create/message-create';
import MyInfoScreen from './my-info/my-info-screen';
import Tasks from './tasks/tasks';
import TaskCreate from './task-create/task-create';
import TaskEdit from './task-edit/task-edit';
import Payments from './payments/payments';
import Jobs from './jobs/jobs';
import Job from './job/job';
import JobCreate from './job-create/job-create';
import Settings from './settings/settings';
import ForgotPassword from './sign-in/ForgotPassword';
import ChooseLocation from './location/ChooseLocation';
import Leads from './leads/leadList/leads';
import LeadDetails from './leads/lead-details/lead-details';
import LeadEdit from './leads/lead-edit/lead-edit';
import JobDetails from './jobs/job-details/job-details'
import MeasurementListScreen from './measurements/MeasurementListScreen'
//import SignUp from './sign-up/sign-up.js';

import ConfirmationModal from './common/confirmation-modal';
import { ErrorView } from './common';

export function registerScreens(store, Provider) {

  Navigation.registerComponent('roof_gravy.login_screen', () => SignIn, store, Provider);
  Navigation.registerComponent('roof_gravy.forgot_password', () => ForgotPassword, store, Provider);
  Navigation.registerComponent('roof_gravy.choose_location',() => ChooseLocation, store, Provider)
  
  Navigation.registerComponent('roof_gravy.calendar', () => Calendar, store, Provider);
  Navigation.registerComponent('roof_gravy.dashboard', () => Dashboard, store, Provider);
  Navigation.registerComponent('roof_gravy.estimate_create', () => EstimateCreateScreen, store, Provider);
  Navigation.registerComponent('roof_gravy.estimate_job_selection', () => EstimateJobSelectionScreen, store, Provider);
  Navigation.registerComponent('roof_gravy.estimate_section_create', () => EstimateSectionCreateScreen, store, Provider);
  Navigation.registerComponent('roof_gravy.lead_create', () => LeadCreate, store, Provider);
  Navigation.registerComponent('roof_gravy.lead_list', () => Leads, store, Provider);
  Navigation.registerComponent('roof_gravy.appointment_create', () => AppointmentCreate, store, Provider);
  
  Navigation.registerComponent('roof_gravy.measurements_list', () => MeasurementListScreen, store, Provider);
  Navigation.registerComponent('roof_gravy.measurements_create', () => MeasurementsCreateScreen, store, Provider);
  Navigation.registerComponent('roof_gravy.messages', () => Messages, store, Provider);
  Navigation.registerComponent('roof_gravy.message', () => Message, store, Provider);
  Navigation.registerComponent('roof_gravy.message_create', () => MessageCreate, store, Provider);
  Navigation.registerComponent('roof_gravy.my_info', () => MyInfoScreen, store, Provider);
  Navigation.registerComponent('roof_gravy.tasks', () => Tasks, store, Provider);
  Navigation.registerComponent('roof_gravy.task_create', () => TaskCreate, store, Provider);
  Navigation.registerComponent('roof_gravy.task_edit', () => TaskEdit, store, Provider);
  Navigation.registerComponent('roof_gravy.payments', () => Payments, store, Provider);
  Navigation.registerComponent('roof_gravy.jobs', () => Jobs, store, Provider);
  Navigation.registerComponent('roof_gravy.job', () => Job, store, Provider);
  Navigation.registerComponent('roof_gravy.job_create', () => JobCreate, store, Provider);
  Navigation.registerComponent('roof_gravy.settings', () => Settings, store, Provider);
  Navigation.registerComponent('roof_gravy.lead_details', () => LeadDetails, store, Provider);
  Navigation.registerComponent('roof_gravy.lead_edit' , () => LeadEdit, store , Provider);
  //Navigation.registerComponent('roof_gravy.signup', () => SignUp, store, Provider);
  Navigation.registerComponent('roof_gravy.job_details' , () => JobDetails , store , Provider);

  Navigation.registerComponent('roof_gravy.confirmation_modal', () => ConfirmationModal, store, Provider);
  Navigation.registerComponent('roof_gravy.error_view', () => ErrorView, store, Provider);
}
