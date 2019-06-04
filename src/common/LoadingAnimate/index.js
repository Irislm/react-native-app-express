import React from 'react';
import {
  Animated, Easing, View, Text,
  StyleSheet,
} from 'react-native';

const loadingImg = require('../../Images/ic_monitor_status_circle_zx.png');

const WIDTH = 50;
const HEIGHT = 50;

const styles = StyleSheet.create({
  loadingIcon: (width = WIDTH, height = HEIGHT) => ({
    ...StyleSheet.absoluteFill,
    width,
    height,
    justifyContent: 'center',
    alignItems: 'center',
  }),
  container: (width = WIDTH, height = HEIGHT) => ({
    width,
    height,
  }),
});

class LoadingAnimate extends React.Component {
  animateVal = new Animated.Value(0);

  animate = Animated.timing(this.animateVal, {
    toValue: 1,
    duration: 1000,
    easing: Easing.linear,
  });

  componentDidMount() {
    this.startAnimate();
  }

  startAnimate = () => {
    this.animateVal.setValue(0);
    this.animate.start(() => {
      this.startAnimate();
    });
  }

  render() {
    const { animateVal } = this;
    const {
      style = {},
    } = this.props;
    return (
      <View style={styles.container()}>
        <Animated.Image
          style={{
            ...style,
            width: style.width || WIDTH,
            height: style.height || HEIGHT,
            transform: [{
              rotate: animateVal.interpolate({
                inputRange: [0, 1],
                outputRange: ['0deg', '360deg'],
              }),
            }],
          }}
          source={loadingImg}
        />
        <View style={styles.loadingIcon()}><Text>hh</Text></View>
      </View>
    );
  }
}

export default LoadingAnimate;
