import { all, call, put, takeLatest } from 'redux-saga/effects';
import { dateToMilliseconds } from 'utils/helpers';
import request from 'utils/request';

import { UPDATE_USER_INFO } from './constants';

import { updateUserInfoSuccess, updateUserInfoError } from './actions';

export function* updateUserInfo(action) {
  try {
    const user = action.data;
    const data = {
      ssnLast4Digits: user.ssn,
      approvalStatus: user.accountStatus,
      mobileAccess: Boolean(user.mobileEnabled),
      userId: user.userId,
      firstName: user.firstName,
      lastName: user.lastName,
      phone: user.phoneNumber,
      birthDate: dateToMilliseconds(user.dob),
      email: user.userEmail,
    };
    const endpoint = `/users/${data.userId}`;
    const response = yield call(request, endpoint, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'PUT',
      body: data,
    });
    yield put(updateUserInfoSuccess(response));
  } catch (err) {
    console.error(err); // eslint-disable-line no-console
    yield put(updateUserInfoError(err));
  }
}

export function* watchLoadedUserInfo() {
  yield takeLatest(UPDATE_USER_INFO, updateUserInfo);
}

export default function* rootSaga() {
  yield all([
    watchLoadedUserInfo(),
  ])
}
