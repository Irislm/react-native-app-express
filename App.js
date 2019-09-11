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
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import React from 'react';
import Home from './src/Home';
import AlertExample from './src/AlertExample';
import PopoverExample from './src/PopoverExample';
import SpringAnimateExample from './src/SprintAnimateExample';
import FadeInAnimateExample from './src/FadeInAnimateExample';
import LoadingAnimateExample from './src/LoadingAnimateExample';
import VideoExample from './src/VideoExample';
import SwiperExample from './src/VerticalSwiperExample';
import HorizontalSwiperExample from './src/HorizontalSwiperExample';
import ReduxExample from './src/ReduxExample';
import reduxExample from './src/ReduxExample/reducers';
import extraReducers from './src/SprintAnimateExample/reducers';

const AppNavigator = createStackNavigator({
  home: Home,
  alertExample: AlertExample,
  popoverExample: PopoverExample,
  springAnimateExample: SpringAnimateExample,
  fadeInAnimateExample: FadeInAnimateExample,
  loadingAnimateExample: LoadingAnimateExample,
  videoExample: VideoExample,
  swiperExample: SwiperExample,
  horizontalSwiperExample: HorizontalSwiperExample,
  reduxExample: ReduxExample,
});

const AppContainer = createAppContainer(AppNavigator);

const store = createStore(combineReducers({
  reduxExample,
  extraReducers,
}));
export default () => (
  <Provider store={store}>
    <AppContainer />
  </Provider>
);
