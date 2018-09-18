/*
 * AppReducer
 *
 * The reducer takes care of our data. Using actions, we can change our
 * application state.
 * To add a new action, add it to the switch statement in the reducer function
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return state.set('yourStateVariable', true);
 */

import { fromJS } from 'immutable';

import {
  RESET_ERROR,
  RESET_SUCCESS,
} from './constants';


// The initial state of the App
const initialState = fromJS({
  loading: false,
  error: false,
  currentUser: false,
  isSuccessSnackbarDisplayed: false,
});

function appReducer(state = initialState, action) {
  // errors
  if (action.error) {
    return state
      .set('error', action.error)
      .set('loading', false);
  }
  // loading
  if (action.loading) {
    return state
      .set('loading', action.loading);
  }
  // successfull POST and PUT network calls
  if (action.displaySuccessSnackbar) {
    return state
      .set('isSuccessSnackbarDisplayed', true);
  }

  switch (action.type) {
    case RESET_ERROR:
      return state
        .set('error', false)
        .set('loading', false);
    case RESET_SUCCESS:
      return state
        .set('isSuccessSnackbarDisplayed', false)
        .set('loading', false);
    default:
      return state
        .set('loading', false);
  }
}

export default appReducer;
