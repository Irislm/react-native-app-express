import { combineReducers } from 'redux';

function pageHeader(state = {}) {
  return state;
}

function passenger(state = {}) {
  return state;
}

const extraReducers = combineReducers({
  passenger,
  pageHeader,
});

export default extraReducers;
