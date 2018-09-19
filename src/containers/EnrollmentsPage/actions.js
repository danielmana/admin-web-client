import { LOAD_ENROLLMENTS, LOAD_ENROLLMENTS_SUCCESS, LOAD_ENROLLMENTS_ERROR } from './constants';

export function loadEnrollments(filters) {
  return {
    type: LOAD_ENROLLMENTS,
    filters,
  };
}

export function loadEnrollmentsSuccess(response) {
  return {
    type: LOAD_ENROLLMENTS_SUCCESS,
    response,
  };
}

export function loadEnrollmentsError(error) {
  return {
    type: LOAD_ENROLLMENTS_ERROR,
    error,
  };
}
