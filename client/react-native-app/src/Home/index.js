/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
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
      routeName: 'verticalSwiperExample',
      title: 'Vertical Swiper Example',
    }, {
      id: 7,
      routeName: 'horizontalSwiperExample',
      title: 'Horizontal Swiper Example',
    }, {
      id: 8,
      routeName: 'reduxExample',
      title: 'Redux Example',
    }, {
      id: 9,
      routeName: 'portalExample',
      title: 'Portal Example（命令式装载组件）',
    }, {
      id: 10,
      routeName: 'popLayerPortalExample',
      title: 'PopLayer + Portal Example',
    // }, {
    //   id: 11,
    //   routeName: 'bindingXExample',
    //   title: 'Alibaba bindingx Example',
    }, {
      id: 12,
      routeName: 'localServer',
      title: 'Local server start（本地启动服务，发起请求）',
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
