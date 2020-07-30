export default {
  init(state) {
    return {
      ...state,
      title: '开心',
    };
  },
  changePassenger(state) {
    return {
      ...state,
      title: '选择中',
    };
  },
};
