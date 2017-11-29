import { Navigation } from 'react-native-navigation';
import SignIn from './sign-in/sign-in';
import Dashboard from './dashboard/dashboard';
import Calendar from './calendar/calendar';
import LeadCreate from './leads/lead-create/lead-create';
import AppointmentCreate from './appointments/appointment-create/appointment-create';
import { ErrorView } from './common';

export function registerScreens(store, Provider) {
  Navigation.registerComponent('roof_gravy.login_screen', () => SignIn, store, Provider);
  Navigation.registerComponent('roof_gravy.dashboard', () => Dashboard, store, Provider);
  Navigation.registerComponent('roof_gravy.calendar', () => Calendar, store, Provider);
  Navigation.registerComponent('roof_gravy.lead_create', () => LeadCreate, store, Provider);
  Navigation.registerComponent('roof_gravy.appointment_create', () => AppointmentCreate, store, Provider);
  Navigation.registerComponent('roof_gravy.error_view', () => ErrorView, store, Provider);
}
