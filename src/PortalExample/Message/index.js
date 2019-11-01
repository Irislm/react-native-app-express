import React from 'react';
import {
  Modal,
  View,
  Text,
  TouchableWithoutFeedback,
  StyleSheet,
} from 'react-native';
import Portal from '../../common/Portal';

const styles = StyleSheet.create({
  bg: {
    backgroundColor: 'rgba(0,0,0,0.7)',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    backgroundColor: '#fff',
    width: 300,
    borderRadius: 24,
    padding: 20,
  },
  titleStyle: {
    textAlign: 'center',
    fontWeight: '500',
    marginBottom: 15,
  },
  paragraph: {
    lineHeight: 19,
    marginHorizontal: 5,
  },
  btnStyle: {
    borderRadius: 6,
    flex: 1,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'cyan',
  },
  sureText: {
    fontWeight: '500',
    lineHeight: 22,
    textAlign: 'center',
  },
  btnContainer: {
    width: 260,
    height: 64,
    paddingTop: 20,
    flexDirection: 'row',
  },
  cancelBtn: {
    marginRight: 10,
  },
  cancelTextStyle: {
    fontWeight: '400',
  },
});

class Message extends React.PureComponent {
    state = {
      visible: true,
    }

    show = () => {
      this.setState({
        visible: true,
      });
    }

    close = () => {
      this.setState({
        visible: false,
      });
    }

    handleOk = () => {
      this.setState({
        visible: false,
      }, () => {
        if (this.props.onOk) {
          this.props.onOk();
        }
      });
    }

    handleCancel = () => {
      this.setState({
        visible: false,
      }, () => {
        if (this.props.onCancel) {
          this.props.onCancel();
        }
      });
    }

    render() {
      const {
        title,
        description,
        okText,
        cancelText,
        onRequestClose,
      } = this.props;
      const {
        visible,
      } = this.state;
      return (
        <Modal transparent animationType="fade" visible={visible} onDismiss={onRequestClose}>
          <View style={styles.bg}>
            <View style={[styles.content]}>
              <Text style={styles.titleStyle}>{title}</Text>
              <Text style={styles.paragraph}>{description}</Text>
              <View style={[styles.btnContainer]}>
                <TouchableWithoutFeedback onPress={this.handleCancel}>
                  <View style={[styles.btnStyle, styles.cancelBtn]}>
                    <Text style={[styles.sureText, styles.cancelTextStyle]}>{cancelText}</Text>
                  </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={this.handleOk}>
                  <View style={styles.btnStyle}>
                    <Text style={styles.sureText}>{okText}</Text>
                  </View>
                </TouchableWithoutFeedback>
              </View>
            </View>
          </View>
        </Modal>
      );
    }
}

Message.show = ({
  title,
  description,
  okText,
  cancelText,
  onOk,
  onCancel,
}) => {
  const key = Portal.add(
    <Message
      title={title}
      description={description}
      okText={okText}
      cancelText={cancelText}
      onOk={onOk}
      onCancel={onCancel}
      onRequestClose={() => {
        Portal.remove(key);
      }}
    />,
  );
  return key;
};

export default Message;
