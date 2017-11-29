import { Navigation } from 'react-native-navigation';
import SignIn from './sign-in/sign-in';
import Dashboard from './dashboard/dashboard';
import Calendar from './calendar/calendar';
import LeadCreate from './leads/lead-create/lead-create';
import AppointmentCreate from './appointments/appointment-create/appointment-create';
import Messages from './messages/messages';
import Message from './message/message';
import MessageCreate from './message-create/message-create';
import Tasks from './tasks/tasks';
import TaskCreate from './task-create/task-create';
import TaskEdit from './task-edit/task-edit';
import Payments from './payments/payments';
import Jobs from './jobs/jobs';
import { ErrorView } from './common';

export function registerScreens(store, Provider) {
  Navigation.registerComponent('roof_gravy.login_screen', () => SignIn, store, Provider);
  Navigation.registerComponent('roof_gravy.dashboard', () => Dashboard, store, Provider);
  Navigation.registerComponent('roof_gravy.calendar', () => Calendar, store, Provider);
  Navigation.registerComponent('roof_gravy.lead_create', () => LeadCreate, store, Provider);
  Navigation.registerComponent('roof_gravy.appointment_create', () => AppointmentCreate, store, Provider);
  Navigation.registerComponent('roof_gravy.messages', () => Messages, store, Provider);
  Navigation.registerComponent('roof_gravy.message', () => Message, store, Provider);
  Navigation.registerComponent('roof_gravy.message_create', () => MessageCreate, store, Provider);
  Navigation.registerComponent('roof_gravy.tasks', () => Tasks, store, Provider);
  Navigation.registerComponent('roof_gravy.task_create', () => TaskCreate, store, Provider);
  Navigation.registerComponent('roof_gravy.task_edit', () => TaskEdit, store, Provider);
  Navigation.registerComponent('roof_gravy.payments', () => Payments, store, Provider);
  Navigation.registerComponent('roof_gravy.jobs', () => Jobs, store, Provider);
  Navigation.registerComponent('roof_gravy.error_view', () => ErrorView, store, Provider);
}
