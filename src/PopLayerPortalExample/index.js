import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Dimensions } from 'react-native';
import Portal from '../common/Portal';
import PopLayer from '../common/PopLayer';

const styles = StyleSheet.create({
    content: {
        backgroundColor: '#ffffff',
        padding: 20,
    },
    button: {
        borderColor: 'grey',
        borderWidth: 1,
        padding: 4,
        margin: 10,
        alignItems: 'center',
        justifyContent: 'center',
    }
})

export default () => {
    let modalKey;
    const onShowPopLayer = () => {
        if (modalKey) {
            Portal.remove(modalKey);
        }
        modalKey = Portal.add(<PopLayer onCancel={onHide}>
            <View style={styles.content}>
                <Text>hello, 我被装在PopLayer中，我被赋予了向上弹出的功能</Text>
            </View>
        </PopLayer>)
    }

    const onHide = () => {
        Portal.remove(modalKey);
    }

    const onShowPopLayerSpecificH = () => {
        if (modalKey) {
            Portal.remove(modalKey);
        }
        modalKey = Portal.add(<PopLayer onCancel={onHide} bottomH={100}>
            <View style={styles.content}>
                <Text>hello, 我被装在PopLayer中，我被赋予了向上弹出的功能</Text>
            </View>
        </PopLayer>)
    }

    const onShowPopLayerMiddlePos = () => {
        if (modalKey) {
            Portal.remove(modalKey);
        }
        modalKey = Portal.add(<PopLayer onCancel={onHide}>
            {(hideAnim) => {
                return (
                    <View style={[{ height: Dimensions.get('window').height, alignItems: 'center', justifyContent: 'center' }]}>
                        <View style={styles.content}>
                            <Text>hello, 我被装在PopLayer中，我被赋予了向上弹出的功能</Text>
                            <TouchableOpacity onPress={() => {
                                hideAnim(onHide)
                            }}>
                                <Text>点击关闭（带动画）</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )
            }}
        </PopLayer>)
    }
    return (
        <Portal.Provider>
            <View style={styles.button}>
                <TouchableOpacity onPress={onShowPopLayer}>
                    <Text>点击我，组件从底部向上弹出</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.button}>
                <TouchableOpacity onPress={onShowPopLayerSpecificH}>
                    <Text>点击我，组件从底部向上弹出到指定高度</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.button}>
                <TouchableOpacity onPress={onShowPopLayerMiddlePos}>
                    <Text>点击我，组件从底部向上弹出到页面中部</Text>
                </TouchableOpacity>
            </View>
        </Portal.Provider>
    )
}