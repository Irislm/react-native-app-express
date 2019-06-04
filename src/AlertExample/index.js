import {
  View, Text, Alert, StyleSheet,
  TouchableOpacity,
  TouchableHighlight,
} from 'react-native';
import React, { Component } from 'react';
import ModalManager from '../common/ModalManager';

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#eeeeee',
    padding: 10,
    width: 200,
    margin: 10,
  },
  button: {
    fontSize: 16,
  },
  alertBtn: {
    color: 'red',
  },
  modal: {
    backgroundColor: '#0000008c',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBody: {
    width: 300,
    height: 400,
    backgroundColor: '#fff',
  },
  footer: {
    width: 300,
    position: 'absolute',
    bottom: 0,
    borderTopWidth: 1,
    borderColor: '#eeeeee',
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexDirection: 'row',
  },
  footerButton: {
    padding: 10,
    flex: 1,
  },
  footerText: {
    textAlign: 'center',
  },
});

const alertMsg = '正文';
const alertTitle = '标题';

class SimpleAlertExampleBlock extends Component {
  handlePress = () => {
    Alert.alert(alertTitle, alertMsg);
  }

  handlePressHighlight = () => Alert.alert(
    null,
    alertMsg,
    [{ text: '点错了', onPress: () => console.log('cancel Pressed!'), style: 'destructive' },
      { text: '确认', onPress: () => console.log('OK Pressed!') }],
  )

  toggleShowModal = () => {
    ModalManager.show();
  }

  render() {
    return (
      <View>
        <TouchableOpacity onPress={this.handlePress} style={styles.wrapper}>
          <Text style={styles.button}>Alert message button</Text>
        </TouchableOpacity>
        <TouchableHighlight
          style={styles.wrapper}
          onPress={this.handlePressHighlight}
        >
          <Text style={styles.button}>Alert with one button</Text>
        </TouchableHighlight>
        <TouchableOpacity
          style={styles.wrapper}
          onPress={this.toggleShowModal}
        >
          <Text style={styles.button}>show modal</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default SimpleAlertExampleBlock;
