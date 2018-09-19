import { fromJS } from 'immutable';

import { UPDATE_USER_INFO, UPDATE_USER_INFO_SUCCESS, UPDATE_USER_INFO_ERROR } from './constants';

const initialState = fromJS({
  loadingUserInfo: false,
  userInfo: false,
  error: false,
  data: {},
});

function userInfoReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_USER_INFO:
      return state
        .set('loadingUserInfo', true)
        .set('error', false)
        .set('data', action.data);
    case UPDATE_USER_INFO_SUCCESS:
      return state
        .set('loadingUserInfo', true)
        .set('userInfo', action.response)
        .set('error', false);
    case UPDATE_USER_INFO_ERROR:
      return state.set('error', action.error).set('loadingUserInfo', false);
    default:
      return state;
  }
}

export default userInfoReducer;
