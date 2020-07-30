import React, { Component } from 'react';
import {
  StyleSheet, Text, View, Image,
  TouchableOpacity,
} from 'react-native';
import SpringAnimate from '../common/SpringAnimate';

const MOCKED_MOVIES_DATA = [
  {
    title: '借东西的小人',
    year: '2019',
    posters: { thumbnail: 'https://cn.bing.com/th?id=OIP.CPEEVQ9a8NxtZfC8DKyQ4wHaHT&pid=Api&rs=1&p=0' },
  },
];

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  thumbnail: {
    flex: 1,
  },
  thumbnailContainer: {
    flex: 1,
    height: 100,
  },
  rightContainer: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 25,
  },
  year: {
    marginTop: 10,
  },
});

function renderLoadingView() {
  return (
    <View style={styles.container}>
      <Text>Loading...</Text>
    </View>
  );
}


export default class SpringAnimateExample extends Component {
  static navigationOptions = {
    title: 'Spring Animate',
  };

  state = {
    movies: [],
  }

  springAnim = '';

  buttonRef = React.createRef();

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        movies: MOCKED_MOVIES_DATA,
      });
    }, 2000);
  }

  startAnimate = () => {
    if (this.springAnim) {
      this.springAnim.startAnimate();
    }
  }

  render() {
    const {
      movies,
    } = this.state;
    if (movies.length === 0) {
      return renderLoadingView();
    }
    const movie = movies[0];
    return (
      <View>
        <View>
          <View style={styles.container}>
            <SpringAnimate
              ref={(ele) => { this.springAnim = ele; }}
              style={styles.thumbnailContainer}
            >
              <Image source={{ uri: movie.posters.thumbnail }} style={styles.thumbnail} />
            </SpringAnimate>
            <View style={styles.rightContainer}>
              <Text style={styles.title}>{movie.title}</Text>
              <Text style={styles.year}>{movie.year}</Text>
            </View>
          </View>
        </View>
        <TouchableOpacity onPress={this.startAnimate}><Text>点击开始动画</Text></TouchableOpacity>
      </View>
    );
  }
}
