import { all, call, put, takeLatest } from 'redux-saga/effects';
import queryString from 'query-string';

import request from 'utils/request';
import isString from 'lodash/isString';
import { LOAD_LOADS } from './constants';
import { loadLoadsSuccess, loadLoadsError } from './actions';

export function* onLoadLoads(action) {
  try {
    const { filters } = action;
    const filtersString = isString(filters)
      ? filters.substring(1)
      : queryString.stringify(filters && filters.toJS()); /* filters.substring(1) removes sign '?' from query */
    const endpoint = filtersString ? `/search/loads?${filtersString}` : '/search/loads';
    const response = yield call(request, endpoint);
    yield put(loadLoadsSuccess(response));
  } catch (err) {
    console.error(err); // eslint-disable-line no-console
    yield put(loadLoadsError(err));
  }
}

export function* watchLoadLoads() {
  yield takeLatest(LOAD_LOADS, onLoadLoads);
}

export default function* rootSaga() {
  yield all([
    watchLoadLoads(),
  ])
}
