export default {
  changePassenger(state, { payload = {} }) {
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
