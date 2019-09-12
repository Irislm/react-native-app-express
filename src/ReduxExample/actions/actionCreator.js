import fetch from 'cross-fetch';
import {
  CHANGE_PASSENGER,
  RECEIVE_POSTS,
  REQUEST_POSTS,
} from './actionTypes';

export function changePassenger(payload) {
  return {
    type: CHANGE_PASSENGER,
    payload,
  };
}

export function receivePosts(payload) {
  return {
    type: RECEIVE_POSTS,
    payload: {
      items: payload.data.children.map(child => child.data),
      receivedAt: Date.now(),
    },
  };
}

export function requestPosts(payload) {
  return {
    type: REQUEST_POSTS,
    payload,
  };
}

export function fetchPosts(payload) {
  return (dispatch) => {
    dispatch(requestPosts(payload));
    return fetch(`http://www.reddit.com/r/${payload}.json`)
      .then(response => response.json())
      .then(json => dispatch(receivePosts(json)));
  };
}
