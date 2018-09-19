import { all, call, put, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';

import { GET_BUSINESS_CLASSIFICATION, UPDATE_BUSINESS_CLASSIFICATION } from './constants';

import {
  getBusinessClassificationSuccess,
  getBusinessClassificationError,
  updateBusinessClassificationSuccess,
  updateBusinessClassificationError,
} from './actions';

export function* getBusinessClassification({ routeParams }) {
  try {
    const endpoint = `/businesses/${routeParams.businessId}/classification`;
    const response = yield call(request, endpoint);
    yield put(getBusinessClassificationSuccess(response === null ? {} : response));
  } catch (err) {
    console.error(err); // eslint-disable-line no-console
    yield put(getBusinessClassificationError(err));
  }
}

export function* updateBusinessClassification({ data }) {
  try {
    const endpoint = `/businesses/${data.businessId}/classification`;
    const response = yield call(request, endpoint, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'PUT',
      body: data,
    });
    yield put(updateBusinessClassificationSuccess(response));
  } catch (err) {
    console.error(err); // eslint-disable-line no-console
    yield put(updateBusinessClassificationError(err));
  }
}

export function* watchGetBusinessClassification() {
  yield takeLatest(GET_BUSINESS_CLASSIFICATION, getBusinessClassification);
}

export function* watchUpdateBusinessClassification() {
  yield takeLatest(UPDATE_BUSINESS_CLASSIFICATION, updateBusinessClassification);
}

export default function* rootSaga() {
  yield all([
    watchGetBusinessClassification(),
    watchUpdateBusinessClassification(),
  ])
}
