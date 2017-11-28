import { Navigation } from 'react-native-navigation';
import SignIn from './sign-in/sign-in';
import Dashboard from './dashboard/dashboard';
import LeadCreate from './leads/lead-create/lead-create';
import { ErrorView } from './common';

export function registerScreens(store, Provider) {
  Navigation.registerComponent('roof_gravy.login_screen', () => SignIn, store, Provider);
  Navigation.registerComponent('roof_gravy.dashboard', () => Dashboard, store, Provider);
  Navigation.registerComponent('roof_gravy.lead_create', () => LeadCreate, store, Provider);
  Navigation.registerComponent('roof_gravy.error_view', () => ErrorView, store, Provider);
}
