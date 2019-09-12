import { RECEIVE_POSTS, REQUEST_POSTS } from '../actions/actionTypes';

export default {
  [RECEIVE_POSTS](state, { payload: { items, receivedAt } }) {
    return Object.assign({}, state, {
      isFetching: false,
      didInvalidate: false,
      items,
      receivedAt,
    });
  },
  [REQUEST_POSTS](state) {
    return Object.assign({}, state, {
      isFetching: true,
      didInvalidate: false,
    });
  },
};
