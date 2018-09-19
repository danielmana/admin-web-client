import { fromJS } from 'immutable';
import map from 'lodash/map';

import {
  LOAD_TRANSACTIONS,
  LOAD_TRANSACTIONS_SUCCESS,
  LOAD_TRANSACTIONS_ERROR,
  LOAD_TRANSACTION_HISTORY,
  LOAD_TRANSACTION_HISTORY_SUCCESS,
  LOAD_TRANSACTION_HISTORY_ERROR,
} from './constants';

const initialState = fromJS({
  loading: false,
  error: false,
  transactions: false,
  page: false,
  filters: false,
});

function transactionsPageReducer(state = initialState, action) {
  switch (action.type) {
    // load transactions
    case LOAD_TRANSACTIONS:
      return state
        .set('loading', true)
        .set('error', false)
        .set('page', action.page || state.get('page'))
        .set('filters', action.filters || state.get('filters'));
    case LOAD_TRANSACTIONS_SUCCESS:
      return state.set('loading', false).set('transactions', action.response);
    case LOAD_TRANSACTIONS_ERROR:
      return state.set('error', action.error).set('loading', false);
    // load transaction history
    case LOAD_TRANSACTION_HISTORY:
      return state.set('page', action.page || state.get('page'));
    case LOAD_TRANSACTION_HISTORY_SUCCESS:
      return state.set('transactions', addTransactionHistory(state.get('transactions'), action.id, action.response));
    case LOAD_TRANSACTION_HISTORY_ERROR:
      return state.set('error', action.error);
    default:
      return state;
  }
}

function addTransactionHistory(oldResults, transactionId, history) {
  const transactions = oldResults.results;
  const results = map(transactions, (transaction) => {
    if (transaction.transactionId === transactionId) {
      return {
        ...transaction,
        history,
      };
    }
    return transaction;
  });

  return {
    count: oldResults.count,
    ...transactions,
    results,
  };
}

export default transactionsPageReducer;
