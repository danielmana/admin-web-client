import {
  GET_MIGRATION_INFO,
  GET_MIGRATION_INFO_SUCCESS,
  GET_NEW_BUSINESS_INFO_SUCCESS,
  GET_MIGRATION_INFO_ERROR,
} from './constants';

export function getMigrationInfo(routeParams) {
  return {
    type: GET_MIGRATION_INFO,
    routeParams,
  };
}

export function getMigrationInfoSuccess(response) {
  return {
    type: GET_MIGRATION_INFO_SUCCESS,
    response,
  };
}

export function getMigrationInfoError(error) {
  return {
    type: GET_MIGRATION_INFO_ERROR,
    error,
  };
}

export function getNewBusinessInfoSuccess(response) {
  return {
    type: GET_NEW_BUSINESS_INFO_SUCCESS,
    response,
  };
}
