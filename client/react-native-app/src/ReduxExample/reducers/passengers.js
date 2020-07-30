import { CHANGE_PASSENGER } from '../actions/actionTypes';

export default {
  [CHANGE_PASSENGER](state, { payload = {} }) {
    const temp = [...state];
    return temp.map((v) => {
      if (v.id === payload.id) {
        return {
          ...v,
          selected: !v.selected,
        };
      }
      return v;
    });
  },
};
