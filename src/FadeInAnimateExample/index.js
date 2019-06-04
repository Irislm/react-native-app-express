import {
  StyleSheet, Text, View,
} from 'react-native';
import React, { Component } from 'react';
import FadeInAnim from '../common/FadeInAnimate';

const styles = StyleSheet.create({
  title: {
    fontSize: 25,
  },
});

export default class Movies extends Component {
  static navigationOptions = {
    title: 'Fade In Animate',
  };

  render() {
    return (
      <View>
        <FadeInAnim>
          <Text style={styles.title}>星星的未来在遥远的月球，时光荏苒，等待一光年意外的距离</Text>
        </FadeInAnim>
      </View>
    );
  }
}
