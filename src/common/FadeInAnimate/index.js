import React from 'react';
import { Animated } from 'react-native';

class FadeInAnim extends React.Component {
  // state = {
  //   fadeAnim: new Animated.Value(0.1),
  // }
  fadeAnim = new Animated.Value(0.1);

  componentDidMount() {
    Animated.timing(this.fadeAnim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();
  }

  render() {
    const { fadeAnim } = this;
    const {
      style,
      children,
    } = this.props;
    return (
      <Animated.View // 使用专门的可动画化的View组件
        style={{
          ...style,
          opacity: fadeAnim, // 将透明度指定为动画变量值
        }}
      >
        {children}
      </Animated.View>
    );
  }
}

export default FadeInAnim;
