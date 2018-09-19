import { all, call, put, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';

import { LOAD_USER, LOAD_USER_CARDS, LOAD_CARD_HISTORY } from './constants';
import {
  loadUserSuccess,
  loadUserError,
  loadUserCardsSuccess,
  loadUserCardsError,
  loadCardHistorySuccess,
  loadCardHistoryError,
} from './actions';

export function* onLoadUser({ routeParams }) {
  try {
    const endpoints = [
      call(request, `/businesses/${routeParams.businessId}`),
      call(request, `/users/${routeParams.userId}`),
      call(request, `/businesses/${routeParams.businessId}/fundingSources`),
      call(request, `/businesses/${routeParams.businessId}/subscriptions`),
      call(request, `/businesses/${routeParams.businessId}/notes`),
    ];
    const response = yield endpoints;
    yield put(loadUserSuccess(response));
  } catch (err) {
    console.error(err); // eslint-disable-line no-console
    yield put(loadUserError(err));
  }
}

export function* onLoadUserCards({ routeParams, page }) {
  try {
    const endpoint = `/businesses/${routeParams.businessId}/users/${routeParams.userId}/cards?page=${page}`;
    const response = yield call(request, endpoint);
    yield put(loadUserCardsSuccess(response));
  } catch (err) {
    console.error(err); // eslint-disable-line no-console
    yield put(loadUserCardsError(err));
  }
}

export function* onWatchLoadCardHistory(action) {
  try {
    const { id } = action;
    const { result } = yield call(request, `/cards/${id}/history`);
    yield put(loadCardHistorySuccess(id, result));
  } catch (err) {
    console.error(err); // eslint-disable-line no-console
    yield put(loadCardHistoryError(err));
  }
}

export function* watchLoadUser() {
  yield takeLatest(LOAD_USER, onLoadUser);
}

export function* watchLoadUserCards() {
  yield takeLatest(LOAD_USER_CARDS, onLoadUserCards);
}

export function* watchLoadCardHistory() {
  yield takeLatest(LOAD_CARD_HISTORY, onWatchLoadCardHistory);
}

export default function* rootSaga() {
  yield all([
    watchLoadUser(),
    watchLoadUserCards(),
    watchLoadCardHistory(),
  ])
}
