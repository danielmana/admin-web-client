import { fromJS } from 'immutable';

import { UPDATE_BUSINESS_INFO, UPDATE_BUSINESS_INFO_SUCCESS, UPDATE_BUSINESS_INFO_ERROR } from './constants';

const initialState = fromJS({
  loading: false,
  businessInfo: false,
  error: false,
  data: {},
});

function businessInfoReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_BUSINESS_INFO:
      return state
        .set('loading', true)
        .set('error', false)
        .set('data', action.data);
    case UPDATE_BUSINESS_INFO_SUCCESS:
      return state
        .set('loading', true)
        .set('businessInfo', action.response)
        .set('error', false);
    case UPDATE_BUSINESS_INFO_ERROR:
      return state.set('error', action.error).set('loading', false);
    default:
      return state;
  }
}

export default businessInfoReducer;
