import {
  GET_BUSINESS_CLASSIFICATION,
  GET_BUSINESS_CLASSIFICATION_SUCCESS,
  GET_BUSINESS_CLASSIFICATION_ERROR,
  UPDATE_BUSINESS_CLASSIFICATION,
  UPDATE_BUSINESS_CLASSIFICATION_SUCCESS,
  UPDATE_BUSINESS_CLASSIFICATION_ERROR,
} from './constants';

export function getBusinessClassification(routeParams) {
  return {
    type: GET_BUSINESS_CLASSIFICATION,
    routeParams,
  };
}

export function getBusinessClassificationSuccess(response) {
  return {
    type: GET_BUSINESS_CLASSIFICATION_SUCCESS,
    response,
  };
}

export function getBusinessClassificationError(error) {
  return {
    type: GET_BUSINESS_CLASSIFICATION_ERROR,
    error,
  };
}

export function updateBusinessClassification(data) {
  return {
    type: UPDATE_BUSINESS_CLASSIFICATION,
    data,
  };
}

export function updateBusinessClassificationSuccess(data) {
  return {
    type: UPDATE_BUSINESS_CLASSIFICATION_SUCCESS,
    data,
    displaySuccessSnackbar: true,
  };
}

export function updateBusinessClassificationError(error) {
  return {
    type: UPDATE_BUSINESS_CLASSIFICATION_ERROR,
    error,
  };
}
