/*
 * @Author: lm
 * @Date: 2019-05-17 17:00:45
 * @Description: 使用react-native-root-siblings对React node进行命令式调用，不同于setState visible true or false的传统写法
 * @Last Modified by: lm
 * @Last Modified time: 2019-12-18 13:46:05
 */
import RootSiblings from 'react-native-root-siblings';

let element;
const ModalManager = {
  show: (node) => {
    element = new RootSiblings(node);
  },
  destroy: () => {
    if (element instanceof RootSiblings) {
      element.destroy();
    }
  },
};

export default ModalManager;
