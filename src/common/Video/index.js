import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  // Slider,
} from 'react-native';
import Video from 'react-native-video';

const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
  video: {
    width,
    height: width * 0.56,
  },
  slider: {
    flex: 1,
  },
});
export default class VideoComp extends Component {
  state = {
    // currentTime: 0,
    duration: 0,
  }

  onLoad = ({ duration }) => {
    this.setState({
      duration,
    });
  }

  render() {
    const { source } = this.props;
    return (
      <View>
        <Video
          source={source}
          style={styles.video}
          resizeMode="stretch"
          onLoad={this.onLoad}
        />
        {/* <Slider
          style={styles.slider}
          value={this.state.currentTime}
          minimumValue={0}
          maximumValue={this.state.duration}
          minimumTrackTintColor="orange"
          maximumTrackTintColor="#fff"
          step={1}
          onValueChange={(value) => {
            console.log(value);
            this.setState({ currentTime: value });
          }}
          onSlidingComplete={value => this.player.seek(value)}
        /> */}

      </View>
    );
  }
}
