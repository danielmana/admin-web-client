import { take, call, put, cancel, takeLatest } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import request from 'utils/request';

import { GET_MIGRATION_INFO, GET_NEW_BUSINESS_INFO_SUCCESS } from './constants';
import { getMigrationInfoSuccess, getMigrationInfoError, getNewBusinessInfoSuccess } from './actions';

export function* getBusinessMigrationInfo({ routeParams }) {
  let endpoint = `/businesses/${routeParams.businessId}/migration`;
  let response;
  try {
    response = yield call(request, endpoint);
  } catch (err) {
    if (err.status !== 404) {
      console.error(err); // eslint-disable-line no-console
      return yield put(getMigrationInfoError(err));
    }
    response = {};
  }
  try {
    yield put(getMigrationInfoSuccess(response === null ? {} : response));
    const newBusinessId = response.newBusiness ? response.newBusiness.businessId : null;
    if (newBusinessId) {
      endpoint = `/businesses/${newBusinessId}/users`;
      response = yield call(request, endpoint);
      yield put(getNewBusinessInfoSuccess(response === null ? {} : response));
    }
  } catch (err) {
    console.error(err); // eslint-disable-line no-console
    yield put(getMigrationInfoError(err));
  }
}

export function* watchGetBusinessMigrationInfo() {
  const watcher = yield takeLatest(GET_MIGRATION_INFO, getBusinessMigrationInfo);

  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export function* watchNewBusinessInfoSuccess() {
  const watcher = yield takeLatest(GET_NEW_BUSINESS_INFO_SUCCESS, getNewBusinessInfoSuccess);

  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export default [watchGetBusinessMigrationInfo, watchNewBusinessInfoSuccess];
