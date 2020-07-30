import React from 'react';
import {
  View, Animated, StyleSheet,
} from 'react-native';
import MaskedView from '@react-native-community/masked-view';

const maskImg = require('../../Images/twitter.png');

const styles = StyleSheet.create({
  fullScreen: {
    flex: 1,
    backgroundColor: 'white',
  },
  fullScreenBlueLayer: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'blue',
  },
  fullScreenWhiteLayer: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'white',
  },
  centeredFullScreen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  maskImageStyle: {
    height: 100,
    width: 100,
    backgroundColor: 'transparent',
  },
});
class TwitterLoadingAnimate extends React.Component {
  state = {
    loadingProgress: new Animated.Value(0),
    isAnimationDone: false,
  };

  componentDidMount() {
    Animated.timing(this.state.loadingProgress, {
      toValue: 100,
      duration: 1000,
      useNativeDriver: true,
    }).start(() => {
      this.setState({
        isAnimationDone: true,
      });
    });
  }

  render() {
    const { loadingProgress, isAnimationDone } = this.state;

    const appOpacity = {
      opacity: loadingProgress.interpolate({
        inputRange: [0, 15, 30],
        outputRange: [0, 0, 1],
        extrapolate: 'clamp',
        // clamp means when the input is 30-100, output should stay at 1
      }),
    };

    const imageScale = {
      transform: [
        {
          scale: loadingProgress.interpolate({
            inputRange: [0, 30, 100],
            outputRange: [1, 0.5, 100],
          }),
        },
      ],
    };

    const appScale = {
      transform: [
        {
          scale: loadingProgress.interpolate({
            inputRange: [0, 100],
            outputRange: [1.1, 1],
          }),
        },
      ],
    };
    return (
      <View style={styles.fullScreen}>
        {!isAnimationDone && <View style={styles.fullScreenBlueLayer} /> }
        <MaskedView
          style={{ ...StyleSheet.absoluteFill }}
          maskElement={(
            <View style={styles.centeredFullScreen}>
              <Animated.Image
                style={[styles.maskImageStyle, imageScale]}
                source={maskImg}
              />
            </View>
          )}
        >
          {!isAnimationDone && <View style={styles.fullScreenWhiteLayer} />}
          <Animated.View style={[appOpacity, appScale, { flex: 1 }]}>
            {this.props.children}
          </Animated.View>
        </MaskedView>
      </View>
    );
  }
}

export default TwitterLoadingAnimate;
