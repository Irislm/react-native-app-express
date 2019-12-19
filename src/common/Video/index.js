/*
 * @Author: lm
 * @Date: 2019-12-18 13:52:55
 * @Description: 视频播放，可点击暂停or播放
 * @Last Modified by: lm
 * @Last Modified time: 2019-12-18 14:24:13
 */
import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Animated,
  Dimensions,
  TouchableOpacity,
  Image,
  PanResponder,
} from 'react-native';
import Video from 'react-native-video';

const { width } = Dimensions.get('window');
const VIDEO_WIDTH = width;
const VIDEO_HEIGHT = width * 0.56;
const styles = StyleSheet.create({
  pageView: {
    width: VIDEO_WIDTH,
    height: VIDEO_HEIGHT,
  },
  video: {
    width: VIDEO_WIDTH,
    height: VIDEO_HEIGHT,
  },
  slider: {
    flex: 1,
  },
});
const pauseStyles = StyleSheet.create({
  container: {
    width,
    height: (width - 20) * 0.56,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  img: {
    width: 12,
    height: 16,
  },
  imgContainer: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    width: 50,
    height: 50,
    borderColor: 'transparent',
    borderRadius: 99,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
const PAUSE_IMG = require('./pause.png');
const PLAY_IMG = require('./play.png');

const uCanDoIt = () => true;

export default class VideoComp extends Component {
  state = {
    isShowPause: false,
    paused: false,
  }

  opacityAnimVal = new Animated.Value(1)

  opacityAnim = Animated.timing(
    this.opacityAnimVal,
    {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    },
  );

  timer = 0;

  video = '';

  constructor(props) {
    super(props);
    this.pageViewPanResponder = PanResponder.create({
      onStartShouldSetPanResponder: uCanDoIt,
      onPanResponderGrant: this.handlePageViewResponderGrant,
    });
  }


  togglePressPause = () => {
    this.clearDisappear();
    this.setState(prev => ({
      paused: !prev.paused,
    }), () => {
      this.setTimeoutDisappear();
    });
  }

  clearDisappear = () => {
    clearTimeout(this.timer);
    this.opacityAnim.stop();
    this.opacityAnimVal.setValue(1);
  }

  setTimeoutDisappear = () => {
    if (!this.state.paused) {
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.opacityAnim.start(({ finished }) => {
          if (finished) {
            this.setState({
              isShowPause: false,
            });
            this.opacityAnimVal.setValue(1);
          }
        });
      }, 2000);
    }
  }

  onEnd = () => {
    this.clearDisappear();
    this.setState({
      paused: true,
      isShowPause: true,
    }, () => {
      this.video.seek(0);
    });
  }

  handlePageViewResponderGrant = () => {
    if (this.state.isShowPause) {
      return;
    }
    this.setState({
      isShowPause: true,
    });
    this.setTimeoutDisappear();
  }

  render() {
    const { source } = this.props;
    const {
      isShowPause,
      paused,
    } = this.state;
    return (
      <View {...this.pageViewPanResponder.panHandlers} style={styles.pageView}>
        <Video
          source={source}
          style={styles.video}
          resizeMode="stretch"
          ref={(ele) => { this.video = ele; }}
          paused={paused}
          onEnd={this.onEnd}
        />
        <Animated.View
          style={{
            ...pauseStyles.container,
            opacity: this.opacityAnimVal,
          }}
        >
          {isShowPause && (
          <TouchableOpacity
            onPress={this.togglePressPause}
          >
            <View style={pauseStyles.imgContainer}>
              <Image source={paused ? PAUSE_IMG : PLAY_IMG} style={pauseStyles.img} />
            </View>
          </TouchableOpacity>
          )}
        </Animated.View>
      </View>
    );
  }
}
