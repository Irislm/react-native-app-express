import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Animated,
  ScrollView,
} from 'react-native';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
  },
  viewForItem: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  text: {
    fontSize: 11,
    lineHeight: 20,
  },
  animateView: {
    borderRadius: 4,
  },
  circle: {
    backgroundColor: '#E9E9E9',
    height: 5,
    width: 5,
    borderRadius: 99,
    marginRight: 5,
  },
  circleContainer: {
    flexDirection: 'row',
    marginTop: 7,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedCircle: {
    width: 10,
    borderRadius: 2.5,
    backgroundColor: '#cccccc',
  },
  scrollView: {
    borderRadius: 4,
  },
});

class HorizontalSwiper extends Component {
  constructor(props) {
    super(props);
    this.translateX = new Animated.Value(0);
    this.state = {
      dataSource: props.dataSource,
      index: 0, // pagination dot的index,0是第一个
      contentOffset: { x: props.colWidth, y: 0 }, // 从位置x=props.colWidth开始滚动
    };
    this.timer = 0;
    this.initialRender = true;
  }

  componentDidMount() {
    if (this.props.dataSource && this.props.dataSource.length !== 0) {
      this.autoPlay();
    }
  }

  componentWillReceiveProps(newProps) {
    if (newProps.dataSource && newProps.dataSource !== this.props.dataSource) {
      this.setState({
        dataSource: newProps.dataSource,
      }, () => {
        this.autoPlay();
      });
    }
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  getSelectedCircleIdx = (newIndex) => {
    if (newIndex === this.props.dataSource.length) {
      return 0;
    }
    return newIndex;
  }

  onMomentumScrollEnd = ({ nativeEvent: { contentOffset } }) => {
    this.setState({
      index: (contentOffset.x / this.props.colWidth) - 1,
      contentOffset,
    }, () => {
      this.autoPlay();
    });
  }

  onLayout = ({ nativeEvent: { layout: { width } } }) => {
    if (this.initialRender && this.props.dataSource.length > 1 && this.scrollRef) {
      this.scrollRef.scrollTo({ x: width, animated: true });
      this.initialRender = false;
    }
  }

  getRenderPages = () => {
    const {
      itemStyle,
      dataSource: propsDataSource,
    } = this.props;
    const {
      dataSource,
    } = this.state;
    let pages = [];
    const total = propsDataSource.length;
    if (total > 1) {
      // [0,1,2]
      pages = Object.keys(dataSource);
      // [2,0,1,2]
      pages.unshift(`${total - 1}`);
      // [2,0,1,2,0]
      pages.push('0');

      pages = pages.map((page, i) => {
        const item = dataSource[page];
        if (typeof item !== 'string') {
          return (
            <View style={[styles.viewForItem]} key={i}>
              {item}
            </View>
          );
        }
        return (
          <View
            style={[styles.viewForItem]}
            key={i}
          >
            <Text style={[styles.text, itemStyle || '']} numberOfLines={1} ellipsizeMode="tail">{item}</Text>
          </View>
        );
      });
    }
    return pages;
  }

  autoPlay() {
    if (this.timer) {
      clearTimeout(this.timer);
    }
    this.timer = setTimeout(() => {
      // pagination dot index [0,1,2,3,1,2,3...]
      // 对应page [0,1,2,0]
      const isFirstPage = this.state.index === this.props.dataSource.length;
      let index;
      let newContentOffset = this.state.contentOffset;
      if (isFirstPage) {
        index = 1;
        newContentOffset = {
          x: this.props.colWidth,
          y: 0,
        };
      } else {
        // pagination dot index正常+1
        index = this.state.index + 1;
      }
      const nextState = {
        index,
        contentOffset: newContentOffset,
        isPageUp: true,
      };
      // 往后翻一页
      const scrollTo = () => {
        if (this.scrollRef) {
          const x = this.props.colWidth * (this.state.index + 1);
          // scrollTo会改变contentOffset
          this.scrollRef.scrollTo({ x, animated: true });
        }
      };
      this.setState(nextState, () => {
        scrollTo();
      });
    }, 3000);
  }

  render() {
    const {
      dataSource,
      index,
      contentOffset,
    } = this.state;
    const {
      colWidth,
    } = this.props;
    return (
      <View style={[styles.container, { width: colWidth }]}>
        {dataSource && dataSource.length !== 0
        && (
        <React.Fragment>
          <ScrollView
            ref={(ele) => { this.scrollRef = ele; }}
            style={[styles.scrollView]}
            onScrollEndDrag={this.onScrollEndDrag}
            onScrollBeginDrag={this.onScrollBeginDrag}
            horizontal
            onMomentumScrollEnd={this.onMomentumScrollEnd}
            contentOffset={contentOffset}
            automaticallyAdjustContentInsets={false}
            bounces={false}
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onLayout={this.onLayout}
          >
            {this.getRenderPages()}
          </ScrollView>
          <View style={styles.circleContainer}>
            {this.props.dataSource.map((v, idx) => (
              <View
                key={idx}
                style={[styles.circle, this.getSelectedCircleIdx(index) === idx ? styles.selectedCircle : '']}
                collapsable={false}
              />
            ))}
          </View>
        </React.Fragment>
        )}
      </View>
    );
  }
}


HorizontalSwiper.defaultProps = {
  dataSource: [],
  colWidth: 0,
};

HorizontalSwiper.propTypes = {
  dataSource: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.node, PropTypes.string])).isRequired,
  itemStyle: PropTypes.any,
  colWidth: PropTypes.number.isRequired,
};

export default HorizontalSwiper;
