// /**
//  * Sample React Native App
//  * https://github.com/facebook/react-native
//  *
//  * @format
//  * @flow
//  */

// import {
//   createStackNavigator,
//   createAppContainer,
// } from 'react-navigation';
// import { Provider } from 'react-redux';
// import { createStore, combineReducers, applyMiddleware } from 'redux';
// import React from 'react';
// import thunk from 'redux-thunk';
// import Home from './src/Home';
// import AlertExample from './src/AlertExample';
// import PopoverExample from './src/PopoverExample';
// import SpringAnimateExample from './src/SprintAnimateExample';
// import FadeInAnimateExample from './src/FadeInAnimateExample';
// import LoadingAnimateExample from './src/LoadingAnimateExample';
// import VideoExample from './src/VideoExample';
// import VerticalSwiperExample from './src/VerticalSwiperExample';
// import HorizontalSwiperExample from './src/HorizontalSwiperExample';
// import ReduxExample from './src/ReduxExample';
// import reduxExample from './src/ReduxExample/reducers';
// import PortalExample from './src/PortalExample';
// import extraReducers from './src/SprintAnimateExample/reducers';
// import PopLayerPortalExample from './src/PopLayerPortalExample';

// const AppNavigator = createStackNavigator({
//   home: Home,
//   alertExample: AlertExample,
//   popoverExample: PopoverExample,
//   springAnimateExample: SpringAnimateExample,
//   fadeInAnimateExample: FadeInAnimateExample,
//   loadingAnimateExample: LoadingAnimateExample,
//   videoExample: VideoExample,
//   verticalSwiperExample: VerticalSwiperExample,
//   horizontalSwiperExample: HorizontalSwiperExample,
//   reduxExample: ReduxExample,
//   portalExample: PortalExample,
//   popLayerPortalExample: PopLayerPortalExample,
// });

// const AppContainer = createAppContainer(AppNavigator);

// const store = createStore(combineReducers({
//   reduxExample,
//   extraReducers,
// }), applyMiddleware(thunk));

// export default () => (
//   <Provider store={store}>
//     <AppContainer />
//   </Provider>
// );

/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
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
// import BindingXExample from './src/BindingXExample';

const Stack = createStackNavigator();

const store = createStore(combineReducers({
  reduxExample,
  extraReducers,
}), applyMiddleware(thunk));

export default () => (
  <Provider store={store}>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="home" component={Home} />
        <Stack.Screen name="alertExample" component={AlertExample} />
        <Stack.Screen name="popoverExample" component={PopoverExample} />
        <Stack.Screen name="springAnimateExample" component={SpringAnimateExample} />
        <Stack.Screen name="fadeInAnimateExample" component={FadeInAnimateExample} />
        <Stack.Screen name="loadingAnimateExample" component={LoadingAnimateExample} />
        <Stack.Screen name="videoExample" component={VideoExample} />
        <Stack.Screen name="verticalSwiperExample" component={VerticalSwiperExample} />
        <Stack.Screen name="horizontalSwiperExample" component={HorizontalSwiperExample} />
        <Stack.Screen name="reduxExample" component={ReduxExample} />
        <Stack.Screen name="portalExample" component={PortalExample} />
        <Stack.Screen name="popLayerPortalExample" component={PopLayerPortalExample} />
        {/* <Stack.Screen name="bindingXExample" component={BindingXExample} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  </Provider>
);
