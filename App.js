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
import { createStore, combineReducers, applyMiddleware } from 'redux';
import React from 'react';
import thunk from 'redux-thunk';
import Home from './src/Home';
import AlertExample from './src/AlertExample';
import PopoverExample from './src/PopoverExample';
import SpringAnimateExample from './src/SprintAnimateExample';
import FadeInAnimateExample from './src/FadeInAnimateExample';
import LoadingAnimateExample from './src/LoadingAnimateExample';
import VideoExample from './src/VideoExample';
import VerticalSwiperExample from './src/VerticalSwiperExample';
import HorizontalSwiperExample from './src/HorizontalSwiperExample';
import ReduxExample from './src/ReduxExample';
import reduxExample from './src/ReduxExample/reducers';
import PortalExample from './src/PortalExample';
import extraReducers from './src/SprintAnimateExample/reducers';
import PopLayerPortalExample from './src/PopLayerPortalExample';

const AppNavigator = createStackNavigator({
  home: Home,
  alertExample: AlertExample,
  popoverExample: PopoverExample,
  springAnimateExample: SpringAnimateExample,
  fadeInAnimateExample: FadeInAnimateExample,
  loadingAnimateExample: LoadingAnimateExample,
  videoExample: VideoExample,
  verticalSwiperExample: VerticalSwiperExample,
  horizontalSwiperExample: HorizontalSwiperExample,
  reduxExample: ReduxExample,
  portalExample: PortalExample,
  popLayerPortalExample: PopLayerPortalExample,
});

const AppContainer = createAppContainer(AppNavigator);

const store = createStore(combineReducers({
  reduxExample,
  extraReducers,
}), applyMiddleware(thunk));

export default () => (
  <Provider store={store}>
    <AppContainer />
  </Provider>
);
