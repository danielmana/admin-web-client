import { fromJS } from 'immutable';

import { LOAD_ENROLLMENTS, LOAD_ENROLLMENTS_SUCCESS, LOAD_ENROLLMENTS_ERROR } from './constants';

const initialState = fromJS({
  loading: false,
  enrollments: false,
  error: false,
  filters: {},
});

function enrollmentReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_ENROLLMENTS:
      return state
        .set('loading', true)
        .set('error', false)
        .set('filters', action.filters);
    case LOAD_ENROLLMENTS_SUCCESS:
      return state.set('loading', false).set('enrollments', action.response);
    case LOAD_ENROLLMENTS_ERROR:
      return state.set('error', action.error).set('loading', false);
    default:
      return state;
  }
}

export default enrollmentReducer;
