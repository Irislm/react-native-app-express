import React from 'react';
import {
  View,
  Text,
} from 'react-native';
import HorizontalSwiper from '../common/HorizontalSwiper/index2';

class HorizontalSwiperExample extends React.PureComponent {
  state = {
    views: [],
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        views: [{
          backgroundColor: 'red',
          title: 'Carousel 1',
        }, {
          backgroundColor: 'blue',
          title: 'Carousel 2',
        }, {
          backgroundColor: 'yellow',
          title: 'Carousel 3',
        }, {
          backgroundColor: 'aqua',
          title: 'Carousel 4',
        }],
      });
    }, 1000);
  }

  render() {
    const { views } = this.state;
    return (
      <HorizontalSwiper
        dataSource={views.map(v => (
          <View style={{ width: 100, height: 100, backgroundColor: v.backgroundColor }}>
            <Text>{v.title}</Text>
          </View>
        ))}
        colWidth={100}
      />
    );
  }
}

export default HorizontalSwiperExample;
