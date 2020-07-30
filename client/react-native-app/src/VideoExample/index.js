import React, { Component } from 'react';
import Video from '../common/Video';

const videoSource = require('./example.mp4');

export default class VideoExample extends Component {
  render() {
    return <Video source={videoSource} />;
  }
}
