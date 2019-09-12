export const SELECT_SUBREDDIT = 'SELECT_SUBREDDIT';

export default {
  [SELECT_SUBREDDIT](state, action) {
    return action.subreddit;
  },
};
