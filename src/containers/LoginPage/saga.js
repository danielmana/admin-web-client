import { call, put, takeLatest } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import request from 'utils/request';

import {
  SIGN_IN,
} from './constants';
import {
  signInSuccess,
  signInError,
} from './actions';

export function* onWatchLogin(action) {
  try {
    const { data: { username, password } } = action;
    const data = {
      loginName: username,
      password,
    };
    const endpoint = '/sessions';
    const response = yield call(request, endpoint, {
      method: 'POST',
      body: data,
    });
    yield put(signInSuccess(response));
    yield put(push('/users'));
  } catch (err) {
    console.error(err); // eslint-disable-line no-console
    yield put(signInError(err));
  }
}

export default function* watchLogin() {
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest(SIGN_IN, onWatchLogin);
}
