import { LOAD_LOADS, LOAD_LOADS_SUCCESS, LOAD_LOADS_ERROR } from './constants';

export function loadLoads(filters) {
  return {
    type: LOAD_LOADS,
    filters,
  };
}

export function loadLoadsSuccess(response) {
  return {
    type: LOAD_LOADS_SUCCESS,
    response,
  };
}

export function loadLoadsError(error) {
  return {
    type: LOAD_LOADS_ERROR,
    error,
  };
}
