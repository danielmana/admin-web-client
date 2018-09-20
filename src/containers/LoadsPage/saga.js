import { all, call, put, takeLatest } from 'redux-saga/effects';
import queryString from 'query-string';

import request from 'utils/request';
import { LOAD_LOADS } from './constants';
import { loadLoadsSuccess, loadLoadsError } from './actions';

export function* onLoadLoads(action) {
  try {
    const { filters } = action;
    let endpoint = '/search/loads';
    if (filters) {
      const filtersObject = filters.toJS ? filters.toJS() : filters;
      const filtersString = queryString.stringify(filtersObject);
      if (filtersString) {
        endpoint += `?${filtersString}`;
      }
    }
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
