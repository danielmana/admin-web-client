import { fromJS } from 'immutable';

import {
  LOAD_ENROLLMENT,
  LOAD_ENROLLMENT_SUCCESS,
  LOAD_ENROLLMENT_ERROR,
  LOAD_ENROLLMENT_DETAILS_SUCCESS,
} from './constants';

const initialState = fromJS({
  loading: false,
  enrollment: false,
  error: false,
  enrollmentDetails: false,
  routeParams: false,
});

function enrollmentPageDetailReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_ENROLLMENT:
      return state
        .set('loading', true)
        .set('error', false)
        .set('params', action.routeParams);
    case LOAD_ENROLLMENT_SUCCESS:
      return state.set('loading', false).set('enrollment', action.response);
    case LOAD_ENROLLMENT_ERROR:
      return state.set('error', action.error).set('loading', false);
    case LOAD_ENROLLMENT_DETAILS_SUCCESS:
      return state.set('enrollmentDetails', action.response);
    default:
      return state;
  }
}

export default enrollmentPageDetailReducer;
