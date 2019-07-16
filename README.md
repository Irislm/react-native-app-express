# Getting Started
Install dependencies.
```
$ npm install
```

Start server.
```
$ react-native run-ios
```
If success, app will be open in your default simulator.You will see a lot of examples using common react-native-components.

# react-native-components

- [FadeInAnimate](#fade-in-animate)
- [LoadingAnimate](#loading-animate)
- [ModalManager](#modal-manager)
- [Popover](#popover)
- [SpringAnimate](#spring-animate)
- [TwitterLoadingAnimate](#twitter-loading-animate)
- [Video](#video)
- [VerticalSwiper](#verticalSwiper)

## <div id="fade-in-animate">FadeInAnimate</div>

简单的透明度变化动画。https://reactnative.cn/docs/animations/

## <div id="loading-animate">LoadingAnimate</div>

loading旋转动画

## <div id="modal-manager">ModalManager</div>
起源于react的modal组件，以前写的时候每次都要setState控制modal visible，这段代码重复写了无数次之后，想到有什么办法去干掉它，
第一次想到的方法还是基于组件的提取，不太好，第二次灵感来自面试，面试官说可以学一学antd的Modal组件。同样的灵感移植到react-native，
react-native-root-siblings支持以插入节点的方式在根节点中插入modal，当然，以组件的方式呈现Modal也是可以的。

## <div id="popover">Popover</div>
这只是一个支持placement在 bottom位置的popover，没有做top/left/right/auto的适配，计算位置挺麻烦的。借鉴于https://github.com/jeanregisser/react-native-popover

## <div id="spring-animate">SpringAnimate</div>
主要是想看下Animated.spring的效果

## <div id="twitter-loading-animate">TwitterLoadingAnimate</div>
https://facebook.github.io/react-native/blog/2018/01/18/implementing-twitters-app-loading-animation-in-react-native.html

## <div id="video">Video</div>
react-native-video基础上封装了开始/停止/播放进度（即将支持）

## <div id="verticalSwiper">VerticalSwiper</div>
用动画自主完成的vertical方向的轮播
