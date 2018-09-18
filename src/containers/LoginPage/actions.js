import {
  SIGN_IN,
  SIGN_IN_SUCCESS,
  SIGN_IN_ERROR,
} from './constants';

export function signIn(data) {
  return {
    type: SIGN_IN,
    data,
  };
}

export function signInSuccess(response) {
  return {
    type: SIGN_IN_SUCCESS,
    response,
  };
}

export function signInError(error) {
  return {
    type: SIGN_IN_ERROR,
    error,
  };
}
