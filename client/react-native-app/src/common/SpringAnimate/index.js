import React from 'react';
import { Animated } from 'react-native';

class SpringAnimate extends React.Component {
  state = {
    animateVal: new Animated.Value(0),
  }

  springAnimate = Animated.spring(this.state.animateVal, {
    toValue: 1,
    useNativeDriver: true,
  });

  componentDidMount() {
    if (this.props.startOnMount) {
      this.startAnimate();
    } else {
      this.state.animateVal.setValue(1);
    }
  }

  startAnimate = () => {
    this.state.animateVal.setValue(0);
    this.springAnimate.start();
  }

  render() {
    const { animateVal } = this.state;
    const {
      style,
      children,
    } = this.props;
    return (
      <Animated.View // 使用专门的可动画化的View组件
        style={{
          ...style,
          transform: [{ scale: animateVal }], // 将透明度指定为动画变量值
        }}
      >
        {children}
      </Animated.View>
    );
  }
}

export default SpringAnimate;
