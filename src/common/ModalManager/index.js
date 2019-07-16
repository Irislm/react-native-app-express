/*
 * @Author: lm
 * @Date: 2019-05-17 17:00:45
 * @Description: 支持React native element的写法和 js class反射调用
 * @Last Modified by: lm
 * @Last Modified time: 2019-07-05 10:10:37
 */

import React from 'react';
import RootSiblings from 'react-native-root-siblings';
import {
  View,
  Text, StyleSheet,
  TouchableHighlight,
  Modal,
} from 'react-native';
import PropTypes from 'prop-types';

let element;
const ModalManager = {
  show: () => {
    element = new RootSiblings(<CustomizedModal />);
  },
  destroy: () => {
    if (element instanceof RootSiblings) {
      element.destroy();
    }
  },
};
ModalManager.modal = element;

const styles = StyleSheet.create({
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

class CustomizedModal extends React.Component {
  hideModal = () => {
    const { onHideModal } = this.props;
    if (element) {
      ModalManager.destroy();
    } else if (onHideModal) {
      onHideModal();
    }
  }

  render() {
    const { visible } = this.props;
    return (
      <Modal
        animationType="none"
        transparent
        visible={visible}
      >
        <View style={styles.modal}>
          <View style={styles.modalBody}>
            <Text>Hello I am modal!</Text>
            <View style={styles.footer}>
              <TouchableHighlight
                style={styles.footerButton}
                onPress={this.hideModal}
              >
                <Text style={styles.footerText}>i know</Text>
              </TouchableHighlight>
              <TouchableHighlight
                style={styles.footerButton}
                onPress={this.hideModal}
              >
                <Text style={styles.footerText}>go away</Text>
              </TouchableHighlight>
            </View>
          </View>
        </View>
      </Modal>
    );
  }
}

CustomizedModal.propTypes = {
  visible: PropTypes.bool,
  onHideModal: PropTypes.func,
};

ModalManager.CustomizedModal = CustomizedModal;

export default ModalManager;
