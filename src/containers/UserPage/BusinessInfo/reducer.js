import { fromJS } from 'immutable';

import { UPDATE_BUSINESS_INFO, UPDATE_BUSINESS_INFO_SUCCESS, UPDATE_BUSINESS_INFO_ERROR } from './constants';

const initialState = fromJS({
  loadingBusinessInfo: false,
  userInfo: false,
  error: false,
  data: {},
});

function businessInfoReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_BUSINESS_INFO:
      return state
        .set('loadingBusinessInfo', true)
        .set('error', false)
        .set('data', action.data);
    case UPDATE_BUSINESS_INFO_SUCCESS:
      return state
        .set('loadingBusinessInfo', true)
        .set('businessInfo', action.response)
        .set('error', false);
    case UPDATE_BUSINESS_INFO_ERROR:
      return state.set('error', action.error).set('loadingBusinessInfo', false);
    default:
      return state;
  }
}

export default businessInfoReducer;
