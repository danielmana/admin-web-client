import { fromJS } from 'immutable';
import map from 'lodash/map';

import {
  LOAD_CARD_DETAILS,
  LOAD_CARD_DETAILS_SUCCESS,
  LOAD_CARD_DETAILS_ERROR,
  UPDATE_CARD_INFORMATION,
  UPDATE_CARD_INFORMATION_SUCCESS,
  UPDATE_CARD_INFORMATION_ERROR,
  REISSUE_CARD,
  REISSUE_CARD_SUCCESS,
  REISSUE_CARD_ERROR,
  LOAD_TRANSACTION_HISTORY,
  LOAD_TRANSACTION_HISTORY_SUCCESS,
  LOAD_TRANSACTION_HISTORY_ERROR,
} from './constants';

const initialState = fromJS({
  loading: false,
  error: false,
  cardDetails: false,
  transactions: false,
  cardMigration: {},
});

function cardDetailsPageReducer(state = initialState, action) {
  switch (action.type) {
    // load
    case LOAD_CARD_DETAILS:
      return state
        .set('loading', true)
        .set('error', false)
        .set('cardDetails', false)
        .set('transactions', false)
        .set('cardMigration', false);
    case LOAD_CARD_DETAILS_SUCCESS:
      return state
        .set('loading', false)
        .set('cardDetails', action.response)
        .set('transactions', action.response.transactions)
        .set('cardMigration', action.response.cardMigration);
    case LOAD_CARD_DETAILS_ERROR:
      return state.set('loading', false).set('error', action.error);
    // update
    case UPDATE_CARD_INFORMATION:
      return state.set('loading', true).set('error', false);
    case UPDATE_CARD_INFORMATION_SUCCESS:
      return state
        .set('loading', false)
        .set('error', false)
        .set('cardDetails', action.response);
    case UPDATE_CARD_INFORMATION_ERROR:
      return state.set('loading', false).set('error', action.error);
    // reissue
    case REISSUE_CARD:
      return state.set('loading', true).set('error', false);
    case REISSUE_CARD_SUCCESS:
      return state
        .set('loading', false)
        .set('error', false)
        .set('cardDetails', action.response);
    case REISSUE_CARD_ERROR:
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

function addTransactionHistory(transactions, transactionId, history) {
  return map(transactions, (transaction) => {
    if (transaction.transactionId === transactionId) {
      return {
        ...transaction,
        history,
      };
    }
    return transaction;
  });
}

export default cardDetailsPageReducer;
