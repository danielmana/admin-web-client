import { take, call, put, cancel, takeLatest, select } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import queryString from 'query-string';
import map from 'lodash/map';

import request from 'utils/request';
import { LOAD_TRANSACTIONS, LOAD_TRANSACTION_HISTORY } from './constants';
import {
  loadTransactionsSuccess,
  loadTransactionsError,
  loadTransactionHistorySuccess,
  loadTransactionHistoryError,
} from './actions';
import { makeSelectPage, makeSelectFilters } from './selectors';

export function* onWatchLoadTransactions() {
  try {
    const page = yield select(makeSelectPage());
    const filters = yield select(makeSelectFilters());
    const filtersString = queryString.stringify({
      ...filters,
      page,
    });
    const endpoint = filtersString ? `/search/transactions?${filtersString}` : '/search/transactions';
    const transactions = yield call(request, endpoint);
    const response = {
      ...transactions,
      results: map(transactions.results, (transaction) => ({
        ...transaction,
        // WORKADOUND API is returning string instead of number
        amount: parseFloat(transaction.amount),
      })),
    };
    yield put(loadTransactionsSuccess(response));
  } catch (err) {
    console.error(err); // eslint-disable-line no-console
    yield put(loadTransactionsError(err));
  }
}

export function* onWatchLoadTransactionHistory(action) {
  try {
    const { id } = action;
    const response = yield call(request, `/transactions/${id}/history`);
    yield put(loadTransactionHistorySuccess(id, response));
  } catch (err) {
    console.error(err); // eslint-disable-line no-console
    yield put(loadTransactionHistoryError(err));
  }
}

export function* watchLoadTransactions() {
  const watcher = yield takeLatest(LOAD_TRANSACTIONS, onWatchLoadTransactions);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export function* watchLoadTransactionHistory() {
  const watcher = yield takeLatest(LOAD_TRANSACTION_HISTORY, onWatchLoadTransactionHistory);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export default [watchLoadTransactions, watchLoadTransactionHistory];
