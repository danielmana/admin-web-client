import { UPDATE_BUSINESS_INFO, UPDATE_BUSINESS_INFO_SUCCESS, UPDATE_BUSINESS_INFO_ERROR } from './constants';

export function updateBusinessInfo(data) {
  return {
    type: UPDATE_BUSINESS_INFO,
    data,
  };
}

export function updateBusinessInfoSuccess(response) {
  return {
    type: UPDATE_BUSINESS_INFO_SUCCESS,
    response,
    displaySuccessSnackbar: true,
  };
}

export function updateBusinessInfoError(error) {
  return {
    type: UPDATE_BUSINESS_INFO_ERROR,
    error,
  };
}
