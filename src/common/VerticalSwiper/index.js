/*
 * @Author: lm
 * @Date: 2019-12-18 15:00:59
 * @Description: 纵向轮播
 * @Last Modified by: lm
 * @Last Modified time: 2019-12-18 15:01:25
 */
import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Animated,
  Easing,
} from 'react-native';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
  container: {
    borderRadius: 4,
    paddingLeft: 5,
    flexDirection: 'row',
    alignItems: 'flex-start',
    position: 'relative',
    overflow: 'hidden',
    paddingRight: 8,
  },
  viewForText: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  text: {
    fontFamily: 'PingFangSC-Regular',
    fontSize: 11,
    lineHeight: 20,
  },
});

class VerticalSwiper extends Component {
  constructor(props) {
    super(props);
    this.translateY = new Animated.Value(0);
    this.index = 1;
    this.state = {
      dataSource: props.dataSource,
    };
  }

  componentDidMount() {
    this.startAnimation();
  }

  startAnimation() {
    Animated.timing(this.translateY, {
      toValue: -(this.props.rowHeight) * this.index, // 20为文本View的高度
      duration: 300, // 动画时间
      Easing: Easing.linear,
      delay: 3000, // 文字停留时间
    }).start(({ finished }) => {
      if (finished) {
        this.setState((prev) => {
          const newData = [...prev.dataSource];
          newData.push(prev.dataSource[this.index - 1]);
          return {
            dataSource: newData,
          };
        }, () => {
          this.index++;
          this.startAnimation();
        });
      }
    });
  }

  render() {
    const {
      textStyle,
      rowHeight,
    } = this.props;
    const {
      dataSource,
    } = this.state;
    return (
      <View style={[styles.container, { height: rowHeight }]}>
        <Animated.View
          style={{
            transform: [
              {
                translateY: this.translateY,
              },
            ],
          }}
        >
          {dataSource && dataSource.length !== 0 && dataSource.map((item, index) => {
            if (typeof item !== 'string') {
              return (
                <View style={[styles.viewForText]} key={index}>
                  {item}
                </View>
              );
            }
            return (
              <View
                style={[
                  styles.viewForText,
                ]}
                key={index}
              >
                <Text style={[styles.text, textStyle]} numberOfLines={1} ellipsizeMode="tail">{item}</Text>
              </View>
            );
          })}
        </Animated.View>
      </View>
    );
  }
}

VerticalSwiper.propTypes = {
  dataSource: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.node, PropTypes.string, PropTypes.func])),
  textStyle: PropTypes.any,
  rowHeight: PropTypes.number,
  count: PropTypes.number,
};

VerticalSwiper.defaultProps = {
  rowHeight: 20,
  count: 3,
  textStyle: '',
};

export default VerticalSwiper;
