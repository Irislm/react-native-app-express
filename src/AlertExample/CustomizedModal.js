import React from 'react';
import {
  View,
  Text, StyleSheet,
  TouchableHighlight,
  Modal,
} from 'react-native';
import PropTypes from 'prop-types';

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
  render() {
    const { visible, onCancel } = this.props;
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
                onPress={onCancel}
              >
                <Text style={styles.footerText}>i know</Text>
              </TouchableHighlight>
              <TouchableHighlight
                style={styles.footerButton}
                onPress={onCancel}
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
  onCancel: PropTypes.func,
};

export default CustomizedModal;
