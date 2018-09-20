import { fromJS } from 'immutable';

import { LOAD_LOADS, LOAD_LOADS_SUCCESS, LOAD_LOADS_ERROR } from './constants';

const initialState = fromJS({
  loading: false,
  loads: false,
  error: false,
  filters: false,
});

function loadsPageReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_LOADS:
      return state
        .set('loading', true)
        .set('error', false)
        .set('filters', action.filters);
    case LOAD_LOADS_SUCCESS:
      return state.set('loading', false).set('loads', action.response);
    case LOAD_LOADS_ERROR:
      return state.set('error', action.error).set('loading', false);
    default:
      return state;
  }
}

export default loadsPageReducer;
