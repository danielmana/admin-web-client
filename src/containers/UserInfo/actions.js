import { UPDATE_USER_INFO, UPDATE_USER_INFO_SUCCESS, UPDATE_USER_INFO_ERROR } from './constants';

export function updateUserInfo(data) {
  return {
    type: UPDATE_USER_INFO,
    data,
  };
}

export function updateUserInfoSuccess(response) {
  return {
    type: UPDATE_USER_INFO_SUCCESS,
    response,
    displaySuccessSnackbar: true,
  };
}

export function updateUserInfoError(error) {
  return {
    type: UPDATE_USER_INFO_ERROR,
    error,
  };
}
