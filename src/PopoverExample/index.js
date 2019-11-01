import React, { Component } from 'react';
import {
  StyleSheet, Text, View,
  TouchableWithoutFeedback,
} from 'react-native';
import Popover from '../common/Popover';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  popoverBtn: {
    margin: 10,
  },
});


export default class PopoverExample extends Component {
  // static navigationOptions = {
  //   title: 'Popover',
  // };

  state = {
    isVisible: false,
    buttonRect: {},
  }

  buttonRef = React.createRef();

  closePopover = () => {
    this.setState({
      isVisible: false,
    });
  }


  showPopover = () => {
    if (this.buttonRef) {
      this.buttonRef.measure((ox, oy, width, height) => {
        this.setState({
          isVisible: true,
          buttonRect: {
            x: ox, y: oy, width, height,
          },
        });
      });
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View ref={(ele) => { this.buttonRef = ele; }} style={styles.popoverBtn}>
          <TouchableWithoutFeedback onPress={this.showPopover}>
            <Text>Press me</Text>
          </TouchableWithoutFeedback>
        </View>
        <Popover
          isVisible={this.state.isVisible}
          fromRect={this.state.buttonRect}
          onClose={this.closePopover}
        >
          <Text>I am the content of this popover!</Text>
        </Popover>
      </View>
    );
  }
}
