import React from 'react';
import {
  DeviceEventEmitter, NativeEventEmitter, StyleSheet, View,
} from 'react-native';
import PortalManager from './Manager';

const TopViewEventEmitter = DeviceEventEmitter || new NativeEventEmitter();
const addType = 'ADD_PORTAL';
const removeType = 'REMOVE_PORTAL';
const PortalContext = React.createContext();

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export class PortalGuard {
    nextKey = 10000;

    add = (node) => {
      // 手动生成key
      const key = this.nextKey++;
      TopViewEventEmitter.emit(addType, node, key);
      return key;
    };

    remove = key => TopViewEventEmitter.emit(removeType, key);
}

export class PortalHost extends React.Component {
    _nextKey = 0;

    _queue = [];

    _manager;

    componentDidMount() {
      const manager = this._manager;
      const queue = this._queue;

      TopViewEventEmitter.addListener(addType, this._mount);
      TopViewEventEmitter.addListener(removeType, this._unmount);

      while (queue.length && manager) {
        const action = queue.pop();
        if (action) {
          switch (action.type) {
            case 'mount':
              manager.mount(action.key, action.children);
              break;
            case 'update':
              manager.update(action.key, action.children);
              break;
            case 'unmount':
              manager.unmount(action.key);
              break;
            default:
              break;
          }
        }
      }
    }

    componentWillUnmount() {
      TopViewEventEmitter.removeListener(addType, this._mount);
      TopViewEventEmitter.removeListener(removeType, this._unmount);
    }

    _setManager = (manager) => {
      this._manager = manager;
    };

    /**
     * 手动添加children到PortalManager的渲染内容中，用key标记此children
     * queue记录已装载的children
     */
    _mount = (children, _key) => {
      const key = _key || this._nextKey++;
      if (this._manager) {
        this._manager.mount(key, children);
      } else {
        this._queue.push({ type: 'mount', key, children });
      }

      return key;
    };

    _update = (key, children) => {
      if (this._manager) {
        this._manager.update(key, children);
      } else {
        const op = { type: 'mount', key, children };
        const index = this._queue.findIndex(
          o => o.type === 'mount' || (o.type === 'update' && o.key === key),
        );

        if (index > -1) {
          this._queue[index] = op;
        } else {
          this._queue.push(op);
        }
      }
    };

    /**
     * 手动卸载key对应的children
     * queue记录已卸载的children
     */
    _unmount = (key) => {
      if (this._manager) {
        this._manager.unmount(key);
      } else {
        this._queue.push({ type: 'unmount', key });
      }
    };

    render() {
      return (
        <PortalContext.Provider
          value={{
            mount: this._mount,
            update: this._update,
            unmount: this._unmount,
          }}
        >
          {/* Need collapsable=false here to clip the elevations, otherwise they appear above Portal components */}
          <View style={styles.container} collapsable={false}>
            {this.props.children}
          </View>
          <PortalManager ref={this._setManager} />
        </PortalContext.Provider>
      );
    }
}
