import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Dimensions,
    TouchableWithoutFeedback,
    Animated,
    Easing,
} from 'react-native';

const { width, height } = Dimensions.get('screen');

export default class PopLayer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            slideUpAnim: new Animated.Value(0),
            fadeAnim: new Animated.Value(0),
            contentH: height,
        }
    }

    componentDidMount() {
        this.startAnim();
    }

    /**
     * 弹出动画
     */
    startAnim = () => {
        const animFunc = () => {
            Animated.parallel([
                Animated.timing(this.state.slideUpAnim, {
                    toValue: 1,
                    duration: this.props.animationDuration,
                    easing: this.props.isEaseInElastic ? Easing.elastic(0.8) : Easing.linear,
                    useNativeDriver: true,
                }),
                Animated.timing(this.state.fadeAnim, {
                    toValue: 1,
                    duration: this.props.animationDuration,
                    useNativeDriver: true
                }),
            ]).start(() => {
                this.props.runAfterAnimation()
            })
        }
        if (this.props.isRequestAnimationFrame) {
            requestAnimationFrame(animFunc)
        } else {
            animFunc();
        }
    }

    /**
     * 隐藏动画
     * @param {*} callback 
     */
    hideAnim = (callback) => {
        Animated.parallel([
            Animated.timing(this.state.slideUpAnim, {
                toValue: 0,
                duration: this.props.animationDuration,
                useNativeDriver: true,
            }),
            Animated.timing(this.state.fadeAnim, {
                toValue: 0,
                duration: this.props.animationDuration,
                useNativeDriver: true,
            })
        ]).start(() => {
            callback && callback()
        })
    }

    /**
     * 点击背景隐藏
     */
    onTabBackground = () => {
        if (this.props.enableTapBackground) {
            this.hideAnim(() => {
                if (this.props.onCancel) {
                    this.props.onCancel()
                }
            })
        }
    }

    /**
     * 测量children内容的高度
     */
    handleLayout = ({ nativeEvent: { layout: { height } } }) => {
        if (!this.state.contentH) {
            this.setState({
                contentH: height,
            })
        }
    }

    render() {
        const {
            contentH
        } = this.state;
        return (
            <View style={[styles.container]}>
                <TouchableWithoutFeedback onPress={this.onTabBackground}>
                    <Animated.View style={[styles.bg, { opacity: this.state.fadeAnim }]} />
                </TouchableWithoutFeedback>
                <Animated.View style={[
                    styles.innerContainer, 
                    this.props.innerContainerStyle,
                    {
                        bottom: -contentH,
                        // opacity: this.state.fadeAnim,
                        transform: [{
                            translateY: this.state.slideUpAnim.interpolate({
                                inputRange: [0, 1],
                                outputRange: [0, -contentH - this.props.bottomH]
                            })
                        }],
                    }]}
                    onLayout={this.handleLayout}
                >
                    {this.props.children instanceof Function ? this.props.children(this.hideAnim) : this.props.children}
                </Animated.View>
            </View>
        );
    }
}

PopLayer.propTypes = {
    // 内容
    children: PropTypes.any,
    // 内容容器的样式
    innerContainerStyle: PropTypes.shape({}),
    // 整个popLayer距离屏幕底部的距离
    bottomH: PropTypes.number,
    // 是否允许点击背景透明部分
    enableTapBackground: PropTypes.bool,
    // 点击背景后的回调
    onCancel: PropTypes.func,
    // 弹出的slide动画结束之后
    runAfterAnimation: PropTypes.func,
    // 动画时长
    animationDuration: PropTypes.number,
    // 长弹窗时，需要requestAnimationFrame
    isRequestAnimationFrame: PropTypes.bool,
    // 弹性动画
    isEaseInElastic: PropTypes.bool,
}

PopLayer.defaultProps = {
    innerContainerStyle: {},
    bottomH: 0,
    enableTapBackground: true,
    runAfterAnimation: () => {},
    onCancel: () => {},
    animationDuration: 300,
    isRequestAnimationFrame: false,
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 0,
        width,
        height,
        overflow: 'hidden',
        zIndex: 1001,
    },
    bg: {
        position: 'absolute',
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        width,
        height,
    },
    innerContainer: {
        position: 'absolute',
        width: width,
    },
    operate_wrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        paddingLeft: 12,
        paddingRight: 12,
        backgroundColor: 'rgba(40, 56, 71, 0.95)'
    }
});