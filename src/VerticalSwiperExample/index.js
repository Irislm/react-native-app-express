import React, { Component } from 'react';
import {
  View,
} from 'react-native';
import VerticalSwiper from '../common/VerticalSwiper';

class HorizontalSwiper extends Component {
  render() {
    return (
      <View style={{ height: 30, backgroundColor: '#FFF8E7' }}>
        {/* 写死的数据，如果是异步请求的数据请使用HorizontalSwiper */}
        <VerticalSwiper
          dataSource={['Hello Swiper', 'i am vertical', 'good job']}
          rowHeight={30}
          textStyle={{
            lineHeight: 30,
          }}
        />
      </View>
    );
  }
}

export default HorizontalSwiper;
