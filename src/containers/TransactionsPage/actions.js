import {
  LOAD_TRANSACTIONS,
  LOAD_TRANSACTIONS_SUCCESS,
  LOAD_TRANSACTIONS_ERROR,
  LOAD_TRANSACTION_HISTORY,
  LOAD_TRANSACTION_HISTORY_SUCCESS,
  LOAD_TRANSACTION_HISTORY_ERROR,
} from './constants';

export function loadTransactions(page, filters) {
  return {
    type: LOAD_TRANSACTIONS,
    page,
    filters,
  };
}

export function loadTransactionsSuccess(response) {
  return {
    type: LOAD_TRANSACTIONS_SUCCESS,
    response,
  };
}

export function loadTransactionsError(error) {
  return {
    type: LOAD_TRANSACTIONS_ERROR,
    error,
  };
}

export function loadTransactionHistory(id) {
  return {
    type: LOAD_TRANSACTION_HISTORY,
    id,
  };
}

export function loadTransactionHistorySuccess(id, response) {
  return {
    type: LOAD_TRANSACTION_HISTORY_SUCCESS,
    id,
    response,
  };
}

export function loadTransactionHistoryError(error) {
  return {
    type: LOAD_TRANSACTION_HISTORY_ERROR,
    error,
  };
}
