import { all, call, put, takeLatest } from 'redux-saga/effects';
import queryString from 'query-string';

import request from 'utils/request';
import { LOAD_USERS } from './constants';
import { loadUsersSuccess, loadUsersError } from './actions';

/**
 * Users request/response handler
 */
export function* onLoadUsers(action) {
  try {
    const { filters } = action;
    const filtersString = queryString.stringify(filters.toJS());
    const endpoint = filtersString ? `/search/users?${filtersString}` : '/search/users';
    const response = yield call(request, endpoint);
    yield put(loadUsersSuccess(response));
  } catch (err) {
    console.error(err); // eslint-disable-line no-console
    yield put(loadUsersError(err));
  }
}

export function* watchLoadUsers() {
  yield takeLatest(LOAD_USERS, onLoadUsers);
}

export default function* rootSaga() {
  yield all([
    watchLoadUsers(),
  ])
}
