import React from 'react';
import {
  createSwitchNavigator,
} from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';

import FilmDetailsScreen from '../screens/FilmDetailsScreen';

export default createSwitchNavigator({
  // You could add another route here for authentication.
  // Read more at https://reactnavigation.org/docs/en/auth-flow.html
  Main: MainTabNavigator,
  Details: FilmDetailsScreen
});