import { fromJS } from 'immutable';

import {
  SET_INITIATE_CREDIT_DEBIT,
  SET_INITIATE_CREDIT_DEBIT_SUCCESS,
  SET_INITIATE_CREDIT_DEBIT_ERROR,
} from './constants';

const initialState = fromJS({
  loadingInitiateCreditDebit: false,
  initiateCreditDebit: false,
  initiateCreditDebitError: false,
  data: {},
});

function initiateCreditDebitReducer(state = initialState, action) {
  switch (action.type) {
    case SET_INITIATE_CREDIT_DEBIT:
      return state
        .set('loadingInitiateCreditDebit', true)
        .set('initiateCreditDebitError', false)
        .set('data', action.data);
    case SET_INITIATE_CREDIT_DEBIT_SUCCESS:
      return state
        .set('loadingInitiateCreditDebit', true)
        .set('initiateCreditDebit', action.response)
        .set('initiateCreditError', false);
    case SET_INITIATE_CREDIT_DEBIT_ERROR:
      return state.set('initiateCreditError', action.error).set('loadingInitiateCreditDebit', false);
    default:
      return state;
  }
}

export default initiateCreditDebitReducer;
