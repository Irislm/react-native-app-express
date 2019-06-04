/*
 * @Author: lm
 * @Date: 2019-05-24 17:46:34
 * @Description: base on https://github.com/jeanregisser/react-native-popover top,right.left,auto的位置都没有调，太麻烦了！还有个问题：如果backgroundColor是透明，小箭头和popover content的样式不好调整为一体
 * @Last Modified by: lm
 * @Last Modified time: 2019-05-24 17:48:40
 */

import React from 'react';
import {
  StyleSheet,
  Dimensions,
  Animated,
  TouchableWithoutFeedback,
  View,
  Easing,
} from 'react-native';
import PropTypes from 'prop-types';

function Point(x, y) {
  this.x = x;
  this.y = y;
}

function Size(width, height) {
  this.width = width;
  this.height = height;
}

function Rect(x, y, width, height) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
}

const noop = () => {};
const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get('window');
const DEFAULT_ARROW_SIZE = new Size(8, 10);
const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFill,
  },
  containerVisible: {
    opacity: 1,
  },
  background: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  popover: {
    backgroundColor: 'transparent',
    position: 'absolute',
  },
  content: {
    borderRadius: 3,
    padding: 6,
    backgroundColor: '#fff',
  },
  arrow: {
    position: 'absolute',
    borderColor: '#fff',
  },
});

class Popover extends React.Component {
  state = {
    contentSize: {},
    anchorPoint: {},
    popoverOrigin: {},
    isTransitioning: false,
    animatedValues: {
      scale: new Animated.Value(0),
      translate: new Animated.ValueXY(),
      fade: new Animated.Value(0),
    },
  }

  componentWillReceiveProps = (nextProps) => {
    const willBeVisible = nextProps.isVisible;
    if (willBeVisible !== this.props.isVisible) {
      if (willBeVisible) {
        // We want to start the show animation only when contentSize is known
        // so that we can have some logic depending on the geometry
        this.setState({ contentSize: {}, isAwaitingShow: true });
      } else {
        this.startAnimation({ show: false });
      }
    }
  }

  measureContent = ({ nativeEvent: { layout } }) => {
    const { width, height } = layout;
    const geom = this.computeGeometry({ contentSize: { width, height } });

    const { isAwaitingShow } = this.state;
    this.setState({
      ...geom,
      contentSize: {
        width,
        height,
      },
      isAwaitingShow: undefined,
    }, () => {
      // Once state is set, call the showHandler so it can access all the geometry
      // from the state
      if (isAwaitingShow) {
        this.startAnimation({ show: true });
      }
    });
  }

  computeGeometry = ({ contentSize, placement }) => {
    const place = placement || this.props.placement;
    const options = {
      contentSize,
    };

    switch (place) {
      case 'top':
        return this.computeTopGeometry(options);
      case 'bottom':
        return this.computeBottomGeometry(options);
      case 'left':
        return this.computeLeftGeometry(options);
      case 'right':
        return this.computeRightGeometry(options);
      default:
        return this.computeAutoGeometry(options);
    }
  }

  computeTopGeometry = ({ contentSize }) => {
    const { displayArea, fromRect } = this.props;
    const arrowSize = this.getArrowSize('top');
    const popoverOrigin = new Point(
      Math.min(displayArea.x + displayArea.width - contentSize.width,
        Math.max(displayArea.x, fromRect.x + (fromRect.width - contentSize.width) / 2)),
      fromRect.y - contentSize.height - arrowSize.height,
    );
    const anchorPoint = new Point(fromRect.x + fromRect.width / 2.0, fromRect.y);

    return {
      popoverOrigin,
      anchorPoint,
      placement: 'top',
    };
  }

  computeBottomGeometry = () => {
    const { fromRect } = this.props;
    const arrowSize = this.getArrowSize('bottom');
    const popoverOrigin = new Point(
      fromRect.x,
      fromRect.y + fromRect.height + arrowSize.height,
    );
    const anchorPoint = new Point(fromRect.x, fromRect.y + fromRect.height);

    return {
      popoverOrigin,
      anchorPoint,
      placement: 'bottom',
    };
  }

  computeLeftGeometry = ({ contentSize }) => {
    const { displayArea, fromRect } = this.props;
    const arrowSize = this.getArrowSize('left');
    const popoverOrigin = new Point(fromRect.x - contentSize.width - arrowSize.width,
      Math.min(displayArea.y + displayArea.height - contentSize.height,
        Math.max(displayArea.y, fromRect.y + (fromRect.height - contentSize.height) / 2)));
    const anchorPoint = new Point(fromRect.x, fromRect.y + fromRect.height / 2.0);

    return {
      popoverOrigin,
      anchorPoint,
      placement: 'left',
    };
  }

  computeRightGeometry = ({ contentSize }) => {
    const { displayArea, fromRect } = this.props;
    const arrowSize = this.getArrowSize('right');
    const popoverOrigin = new Point(fromRect.x + fromRect.width + arrowSize.width,
      Math.min(displayArea.y + displayArea.height - contentSize.height,
        Math.max(displayArea.y, fromRect.y + (fromRect.height - contentSize.height) / 2)));
    const anchorPoint = new Point(fromRect.x + fromRect.width, fromRect.y + fromRect.height / 2.0);

    return {
      popoverOrigin,
      anchorPoint,
      placement: 'right',
    };
  }

  computeAutoGeometry = ({ contentSize }) => {
    const { displayArea } = this.props;
    const placementsToTry = ['left', 'right', 'bottom', 'top'];

    let geom;
    for (let i = 0; i < placementsToTry.length; i++) {
      const placement = placementsToTry[i];
      geom = this.computeGeometry({ contentSize, placement });
      const { popoverOrigin } = geom;

      if (popoverOrigin.x >= displayArea.x
          && popoverOrigin.x <= displayArea.x + displayArea.width - contentSize.width
          && popoverOrigin.y >= displayArea.y
          && popoverOrigin.y <= displayArea.y + displayArea.height - contentSize.height) {
        break;
      }
    }

    return geom;
  }

  getArrowSize = (placement) => {
    const size = this.props.arrowSize;
    switch (placement) {
      case 'left':
      case 'right':
        return new Size(size.height, size.width);
      default:
        return size;
    }
  }

  getArrowColorStyle = color => ({ borderTopColor: color })

  getArrowRotation = () => {
    switch (this.props.placement) {
      case 'bottom':
        return '45deg';
      case 'left':
        return '-90deg';
      case 'right':
        return '90deg';
      default:
        return '0deg';
    }
  }

  getArrowDynamicStyle = () => {
    const { anchorPoint } = this.state;
    const { arrowSize } = this.props;
    return {
      left: anchorPoint.x,
      top: -(arrowSize.height / 2),
      width: arrowSize.width,
      height: arrowSize.height,
      borderTopWidth: arrowSize.height / 2,
      borderRightWidth: arrowSize.width / 2,
      borderBottomWidth: arrowSize.height / 2,
      borderLeftWidth: arrowSize.width / 2,
    };
  }

  getTranslateOrigin = () => {
    const { contentSize, popoverOrigin, anchorPoint } = this.state;
    const popoverCenter = new Point(popoverOrigin.x + contentSize.width / 2, popoverOrigin.y + contentSize.height / 2);
    return new Point(anchorPoint.x - popoverCenter.x, anchorPoint.y - popoverCenter.y);
  }

  startAnimation = ({ show }) => {
    const handler = this.props.startCustomAnimation || this.startDefaultAnimation;
    handler({ show, doneCallback: () => this.setState({ isTransitioning: false }) });
    this.setState({ isTransitioning: true });
  }

  startDefaultAnimation = ({ show, doneCallback }) => {
    const animDuration = 300;
    const values = this.state.animatedValues;
    const translateOrigin = this.getTranslateOrigin();

    if (show) {
      values.translate.setValue(translateOrigin);
    }

    const commonConfig = {
      duration: animDuration,
      easing: show ? Easing.out(Easing.back()) : Easing.inOut(Easing.quad),
    };

    Animated.parallel([
      Animated.timing(values.fade, {
        toValue: show ? 1 : 0,
        ...commonConfig,
      }),
      Animated.timing(values.translate, {
        toValue: show ? new Point(0, 0) : translateOrigin,
        ...commonConfig,
      }),
      Animated.timing(values.scale, {
        toValue: show ? 1 : 0,
        ...commonConfig,
      }),
    ]).start(doneCallback);
  }

  render() {
    const {
      isVisible,
      backgroundStyle: defaultBackgroundStyle = {},
      popoverStyle: defaultPopoverStyle = {},
      contentStyle: defaultContentStyle = {},
      contentMarginRight = 0,
      children,
    } = this.props;
    const {
      animatedValues,
      isTransitioning,
      popoverOrigin,
    } = this.state;
    if (!isVisible && !isTransitioning) {
      return null;
    }

    const backgroundAnimStyle = {
      opacity: animatedValues.fade,
    };

    const arrowAnimStyle = {
      transform: [{
        scale: animatedValues.scale,
      }, {
        rotate: this.getArrowRotation(),
      }],
    };

    const popoverAnimStyle = {
      top: popoverOrigin.y,
      left: popoverOrigin.x ? popoverOrigin.x - contentMarginRight : 0,
    };

    const contentAnimStyle = {
      transform: [
        { translateX: animatedValues.translate.x },
        { translateY: animatedValues.translate.y },
        { scale: animatedValues.scale },
      ],
    };

    const arrowDynamicStyle = this.getArrowDynamicStyle();
    return (
      <TouchableWithoutFeedback onPress={this.props.onClose}>
        <View style={[styles.container]}>
          <Animated.View style={[styles.background, defaultBackgroundStyle, backgroundAnimStyle]} />
          <Animated.View style={[styles.popover, defaultPopoverStyle, popoverAnimStyle]}>
            <Animated.View style={[styles.arrow, arrowDynamicStyle, arrowAnimStyle, backgroundAnimStyle]} />
            <Animated.View style={[styles.content, defaultContentStyle, contentAnimStyle]} onLayout={this.measureContent}>
              {children}
            </Animated.View>
          </Animated.View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

Popover.propTypes = {
  isVisible: PropTypes.bool,
  onClose: PropTypes.func,
  contentStyle: PropTypes.object,
  displayArea: PropTypes.object,
  arrowSize: PropTypes.object,
  placement: PropTypes.string,
};

Popover.defaultProps = {
  isVisible: true,
  displayArea: new Rect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT),
  arrowSize: DEFAULT_ARROW_SIZE,
  placement: 'bottom',
  onClose: noop,
};

export default Popover;
