import { fromJS } from 'immutable';

import { LOAD_USERS, LOAD_USERS_SUCCESS, LOAD_USERS_ERROR } from './constants';

const initialState = fromJS({
  loading: false,
  error: false,
  users: false,
  filters: {},
});

function usersReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_USERS:
      // load users
      return state
        .set('loading', true)
        .set('error', false)
        .set('filters', action.filters);
    case LOAD_USERS_SUCCESS:
      return state.set('loading', false).set('users', action.response);
    case LOAD_USERS_ERROR:
      return state.set('error', action.error).set('loading', false);
    default:
      return state;
  }
}

export default usersReducer;
