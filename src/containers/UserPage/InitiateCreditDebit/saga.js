import { all, call, put, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';

import { SET_INITIATE_CREDIT_DEBIT } from './constants';

import { setInitiateCreditDebitSuccess, setInitiateCreditDebitError } from './actions';

export function* setInitiateCreditDebit(action) {
  try {
    const { data } = action;
    const endpoint = `/businesses/${data.businessId}/transfers`;
    const response = yield call(request, endpoint, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: data,
    });
    yield put(setInitiateCreditDebitSuccess(response));
  } catch (err) {
    console.error(err); // eslint-disable-line no-console
    yield put(setInitiateCreditDebitError(err));
  }
}

export function* watchLoadedInitiateCreditDebit() {
  yield takeLatest(SET_INITIATE_CREDIT_DEBIT, setInitiateCreditDebit);
}

export default function* rootSaga() {
  yield all([
    watchLoadedInitiateCreditDebit(),
  ])
}
