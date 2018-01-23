import { Navigation } from 'react-native-navigation';
import SignIn from './sign-in/sign-in';
import Dashboard from './dashboard/dashboard';
import Calendar from './calendar/calendar';
import LeadCreate from './leads/lead-create/lead-create';
import AppointmentCreate from './appointments/appointment-create/appointment-create';
import Messages from './messages/messages';
import Message from './message/message';
import Settings from './settings/settings';
<<<<<<< Updated upstream
import Measurements from './measurements/measurements';
import MeasurementInner from './measurements/measurementInner/measurement-inner';
import uploadXml from './measurements/measurementInner/upload-xml';
=======
import SignUp from './sign-up/sign-up.js';

import ConfirmationModal from './common/confirmation-modal';
>>>>>>> Stashed changes
import { ErrorView } from './common';
import Tasks from './tasks/tasks';
import NewTask from './tasks/new-task';
import completedTask from './tasks/completed-task/completed-task';
import currentTask from './tasks/current-task';
import Estimate from './estimate/estimate';
import EstimateInternal from './estimate/estimate-internal';


export function registerScreens(store, Provider) {
  Navigation.registerComponent('roof_gravy.login_screen', () => SignIn, store, Provider);
  Navigation.registerComponent('roof_gravy.dashboard', () => Dashboard, store, Provider);
  Navigation.registerComponent('roof_gravy.calendar', () => Calendar, store, Provider);
  Navigation.registerComponent('roof_gravy.lead_create', () => LeadCreate, store, Provider);
  Navigation.registerComponent('roof_gravy.appointment_create', () => AppointmentCreate, store, Provider);
  Navigation.registerComponent('roof_gravy.messages', () => Messages, store, Provider);
  Navigation.registerComponent('roof_gravy.message', () => Message, store, Provider);
<<<<<<< Updated upstream
=======
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
  Navigation.registerComponent('roof_gravy.signup', () => SignUp, store, Provider);

  Navigation.registerComponent('roof_gravy.confirmation_modal', () => ConfirmationModal, store, Provider);
>>>>>>> Stashed changes
  Navigation.registerComponent('roof_gravy.error_view', () => ErrorView, store, Provider);
  Navigation.registerComponent('roof_gravy.settings', () => Settings, store, Provider);
  Navigation.registerComponent('roof_gravy.measurements', () => Measurements, store, Provider);
  Navigation.registerComponent('roof_gravy.measurement_inner', () => MeasurementInner, store, Provider);
  Navigation.registerComponent('roof_gravy.upload_xml', () => uploadXml, store, Provider);
  Navigation.registerComponent('roof_gravy.tasks', () => Tasks, store, Provider);
  Navigation.registerComponent('roof_gravy.new_task', () => NewTask, store, Provider);
  Navigation.registerComponent('roof_gravy.completed_task', () => completedTask, store, Provider);
  Navigation.registerComponent('roof_gravy.current_task', () => currentTask, store, Provider);
  Navigation.registerComponent('roof_gravy.estimate', () => Estimate, store, Provider);
  Navigation.registerComponent('roof_gravy.estimate_internal', () => EstimateInternal, store, Provider);
}
