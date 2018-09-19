import { take, call, put, cancel, takeLatest, select } from 'redux-saga/effects';
import { LOCATION_CHANGE, push } from 'react-router-redux';

import request from 'utils/request';
import {
  LOAD_CARD_DETAILS,
  UPDATE_CARD_INFORMATION,
  REISSUE_CARD,
  DELETE_CARD,
  LOAD_TRANSACTION_HISTORY,
} from './constants';
import {
  loadCardDetailsSuccess,
  loadCardDetailsError,
  updateCardInformationSuccess,
  updateCardInformationError,
  reissueCardSuccess,
  reissueCardError,
  deleteCardSuccess,
  deleteCardError,
  loadTransactionHistorySuccess,
  loadTransactionHistoryError,
} from './actions';
import { makeSelectCardDetails } from './selectors';

export function* onWatchLoadCardDetails(action) {
  try {
    const { id } = action;
    const [card, transactions] = yield [call(request, `/cards/${id}`), call(request, `/cards/${id}/transactions`)];
    const response = {
      ...card,
      transactions,
    };
    try {
      response.cardMigration = yield call(request, `/cards/${id}/migration`);
    } catch (err) {
      if (err.status !== 404) {
        console.error(err); // eslint-disable-line no-console
        yield put(loadCardDetailsError(err));
      }
      response.cardMigration = {};
    }
    yield put(loadCardDetailsSuccess(response));
  } catch (err) {
    console.error(err); // eslint-disable-line no-console
    yield put(loadCardDetailsError(err));
  }
}

export function* onWatchUpdateCardInformation(action) {
  try {
    const { data: { cardId, cardStatus } } = action;
    const data = {
      status: cardStatus,
    };
    // FIXME PUT returning 500
    const endpoint = `/cards/${cardId}`;
    const response = yield call(request, endpoint, {
      method: 'PUT',
      body: data,
    });
    yield put(updateCardInformationSuccess(response));
  } catch (err) {
    console.error(err); // eslint-disable-line no-console
    yield put(updateCardInformationError(err));
  }
}

export function* onWatchReissueCard(action) {
  try {
    const { card: { cardId } } = action;
    const endpoint = `/cards/${cardId}/reissue`;
    const response = yield call(request, endpoint, {
      method: 'POST',
    });
    const { transactions } = yield select(makeSelectCardDetails());
    yield put(
      reissueCardSuccess({
        ...response,
        transactions,
        // FIXME API is not changing the status on the response
        status: 'CANCELED',
      })
    );
  } catch (err) {
    console.error(err); // eslint-disable-line no-console
    yield put(reissueCardError(err));
  }
}

export function* onWatchDeleteCard(action) {
  try {
    const { card: { cardId } } = action;
    const endpoint = `/cards/${cardId}`;
    const response = yield call(request, endpoint, {
      method: 'delete',
    });
    yield put(deleteCardSuccess(response));
    yield put(push('/users'));
  } catch (err) {
    console.error(err); // eslint-disable-line no-console
    yield put(deleteCardError(err));
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

export function* watchLoadCardDetails() {
  const watcher = yield takeLatest(LOAD_CARD_DETAILS, onWatchLoadCardDetails);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export function* watchUpdateCardInformation() {
  const watcher = yield takeLatest(UPDATE_CARD_INFORMATION, onWatchUpdateCardInformation);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export function* watchReissueCard() {
  const watcher = yield takeLatest(REISSUE_CARD, onWatchReissueCard);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export function* watchDeleteCard() {
  const watcher = yield takeLatest(DELETE_CARD, onWatchDeleteCard);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export function* watchLoadTransactionHistory() {
  const watcher = yield takeLatest(LOAD_TRANSACTION_HISTORY, onWatchLoadTransactionHistory);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export default [
  watchLoadCardDetails,
  watchUpdateCardInformation,
  watchReissueCard,
  watchDeleteCard,
  watchLoadTransactionHistory,
];
