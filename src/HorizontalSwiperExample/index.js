import React from 'react';
import {
  View,
  Text,
} from 'react-native';
import HorizontalSwiper from '../common/HorizontalSwiper';

class HorizontalSwiperExample extends React.PureComponent {
  render() {
    return (
      <HorizontalSwiper
        dataSource={[{
          text: '123',
          color: 'yellow',
        }, {
          text: '223',
          color: 'blue',
        }, {
          text: '323',
          color: 'red',
        }].map(v => (
          <View style={{ width: 100, height: 100, backgroundColor: v.color }}>
            <Text>{v.text}</Text>
          </View>
        ))}
        colWidth={100}
      />
    );
  }
}

export default HorizontalSwiperExample;
