import { LOAD_USERS, LOAD_USERS_SUCCESS, LOAD_USERS_ERROR } from './constants';

export function loadUsers(filters) {
  return {
    type: LOAD_USERS,
    filters,
  };
}

export function loadUsersSuccess(response) {
  return {
    type: LOAD_USERS_SUCCESS,
    response,
  };
}

export function loadUsersError(error) {
  return {
    type: LOAD_USERS_ERROR,
    error,
  };
}
