import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import Portal from '../common/Portal';
import Message from './Message';

export default class PortalExample extends React.Component {
  render() {
    return (
      <Portal.Provider>
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <TouchableOpacity
            onPress={() => {
              Message.show({
                title: 'hello ha',
                description: 'take care of yourself!',
                okText: 'i know',
                cancelText: 'thanks',
              });
            }}
          >
            <Text>click me Open Portal</Text>
          </TouchableOpacity>
        </View>
      </Portal.Provider>
    );
  }
}

export const title = 'Portal';
export const description = 'Portal example';
