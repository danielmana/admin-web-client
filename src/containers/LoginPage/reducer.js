import { fromJS } from 'immutable';
import {
  SIGN_IN,
  SIGN_IN_SUCCESS,
  SIGN_IN_ERROR,
} from './constants';

const initialState = fromJS({
  loading: false,
  loggedIn: false,
  error: false,
  data: {},
});

function loginPageReducer(state = initialState, action) {
  switch (action.type) {
    case SIGN_IN:
      return state
        .set('loading', true)
        .set('error', false)
        .set('data', action.data);
    case SIGN_IN_SUCCESS:
      return state
        .set('loading', false)
        .set('signedIn', action.response);
    case SIGN_IN_ERROR:
      return state
        .set('error', action.error)
        .set('loading', false);
    default:
      return state;
  }
}

export default loginPageReducer;
