/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet, Text, View,
  TouchableOpacity,
} from 'react-native';
import TwitterLoadingAnimate from '../common/TwitterLoadingAnimate';

const styles = StyleSheet.create({
  menu: {
    backgroundColor: 'rgba(0,0,0,0.08)',
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.2)',
  },
});

export default class Home extends Component {
  static navigationOptions = {
    title: 'Welcome',
  };

  render() {
    const { navigation: { navigate } } = this.props;
    const menus = [{
      id: 0,
      routeName: 'springAnimateExample',
      title: 'Spring Animate Example',
    }, {
      id: 1,
      routeName: 'fadeInAnimateExample',
      title: 'Fade In Animate Example',
    }, {
      id: 2,
      routeName: 'popoverExample',
      title: 'Popover Example',
    }, {
      id: 3,
      routeName: 'alertExample',
      title: 'Alert Example',
    }, {
      id: 4,
      routeName: 'loadingAnimateExample',
      title: 'Loading Animate Example',
    }, {
      id: 5,
      routeName: 'videoExample',
      title: 'Video Example',
    }, {
      id: 6,
      routeName: 'swiperExample',
      title: 'Swiper Example',
    }];
    return (
      <TwitterLoadingAnimate>
        {menus.map(v => (
          <TouchableOpacity onPress={() => { navigate(v.routeName); }} key={v.id}>
            <View style={styles.menu}>
              <Text>{v.title}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </TwitterLoadingAnimate>
    );
  }
}
