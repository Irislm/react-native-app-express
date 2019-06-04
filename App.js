/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import {
  createStackNavigator,
  createAppContainer,
} from 'react-navigation';
import Home from './src/Home';
import AlertExample from './src/AlertExample';
import PopoverExample from './src/PopoverExample';
import SpringAnimateExample from './src/SprintAnimateExample';
import FadeInAnimateExample from './src/FadeInAnimateExample';
import LoadingAnimateExample from './src/LoadingAnimateExample';
import VideoExample from './src/VideoExample';

const AppNavigator = createStackNavigator({
  home: Home,
  alertExample: AlertExample,
  popoverExample: PopoverExample,
  springAnimateExample: SpringAnimateExample,
  fadeInAnimateExample: FadeInAnimateExample,
  loadingAnimateExample: LoadingAnimateExample,
  videoExample: VideoExample,
});

export default createAppContainer(AppNavigator);
