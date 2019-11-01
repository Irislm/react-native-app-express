import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Carousel } from '@ant-design/react-native';

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#fff',
  },
  containerHorizontal: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 150,
  },
  containerVertical: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 150,
  },
  text: {
    color: '#fff',
    fontSize: 36,
  },
});

export default class BasicCarouselExample extends React.Component {
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
    }, 3000);
  }

  onHorizontalSelectedIndexChange = (index) => {
    /* tslint:disable: no-console */
    console.log('horizontal change to', index);
  }

  onVerticalSelectedIndexChange = (index) => {
    /* tslint:disable: no-console */
    console.log('vertical change to', index);
  }

  render() {
    const {
      views,
    } = this.state;
    return (
      <View style={{ marginTop: 30 }}>
        <View style={{ paddingHorizontal: 15 }}>
          <Text>horizontal</Text>
          {views.length !== 0
          && (
          <Carousel
            style={styles.wrapper}
            // selectedIndex={2}
            autoplay
            infinite
            afterChange={this.onHorizontalSelectedIndexChange}
          >
            {views.map((v, idx) => (
              <View
                style={[styles.containerHorizontal, { backgroundColor: v.backgroundColor }]}
                key={idx}
              >
                <Text>{v.title}</Text>
              </View>
            ))}
          </Carousel>
          )
          }
          <Text>Carousel will adjust height based on content</Text>
          <Text>{React.Children.count(this.props.children)}</Text>
        </View>
        <View style={{ paddingHorizontal: 15 }}>
          <Text>vertical</Text>
          {/* <Carousel
            style={styles.wrapper}
            selectedIndex={2}
            autoplay
            infinite
            afterChange={this.onVerticalSelectedIndexChange}
            vertical
          >
            <View
              style={[styles.containerVertical, { backgroundColor: 'red' }]}
            >
              <Text>Carousel 1</Text>
            </View>
            <View
              style={[styles.containerVertical, { backgroundColor: 'blue' }]}
            >
              <Text>Carousel 2</Text>
            </View>
            <View
              style={[styles.containerVertical, { backgroundColor: 'yellow' }]}
            >
              <Text>Carousel 3</Text>
            </View>
            <View
              style={[styles.containerVertical, { backgroundColor: 'aqua' }]}
            >
              <Text>Carousel 4</Text>
            </View>
            <View
              style={[styles.containerVertical, { backgroundColor: 'fuchsia' }]}
            >
              <Text>Carousel 5</Text>
            </View>
          </Carousel> */}
          <Text>
            Use the height of the first child as the height of the Carousel
          </Text>
          <Text>{React.Children.count(this.props.children)}</Text>
        </View>
      </View>
    );
  }
}
