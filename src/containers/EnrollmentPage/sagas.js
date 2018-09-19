import { take, call, put, cancel, takeLatest } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import queryString from 'query-string';
import isString from 'lodash/isString';

import request from 'utils/request';
import { LOAD_ENROLLMENTS } from './constants';
import { loadEnrollmentsSuccess, loadEnrollmentsError } from './actions';

export function* onLoadEnrollment(action) {
  try {
    const { filters } = action;
    const filtersString = isString(filters) ? filters.substring(1) : queryString.stringify(filters && filters.toJS());
    const endpoint = filtersString ? `/search/enrollments?${filtersString}` : '/search/enrollments';
    const response = yield call(request, endpoint);
    yield put(loadEnrollmentsSuccess(response));
  } catch (err) {
    console.error(err); // eslint-disable-line no-console
    yield put(loadEnrollmentsError(err));
  }
}

export function* watchLoadEnrollment() {
  const watcher = yield takeLatest(LOAD_ENROLLMENTS, onLoadEnrollment);

  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export default [watchLoadEnrollment];
