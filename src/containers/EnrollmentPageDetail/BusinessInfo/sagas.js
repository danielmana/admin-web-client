import { take, call, put, cancel, select, takeLatest } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import request from 'utils/request';
import assign from 'lodash/assign';

import { makeSelectEnrollment } from '../selectors';

import { UPDATE_BUSINESS_INFO } from './constants';

import { updateBusinessInfoSuccess, updateBusinessInfoError } from './actions';

export function* updateBusinessInfo(action) {
  try {
    const business = action.data;
    const originalData = yield select(makeSelectEnrollment());
    const data = {
      companyName: business.companyName,
      nameOnCard: business.nameOnCard,
      businessPhone: business.phoneNumber,
      businessStructure: business.businessStructure,
      businessAddress: {
        street: business.addressOne,
        addressAdditionals: business.addressTwo,
        city: business.city,
        zipCode: business.zip,
        state: business.state,
        addressType: business.addressType,
      },
      phoneNumber: business.phoneNumber,
      taxId: business.ein,
      employeeQty: business.employees /* commended cos looks like it has to be fixed on backend */,
      /* industry: {
        majorIndustryNaicsCode: business.majorIndustry,
        minorIndustryNaicsCode: business.minorIndustry,
      }, */
    };
    const result = assign(originalData, data);
    const endpoint = `/enrollments/${result.enrollmentId}`;
    const response = yield call(request, endpoint, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'PUT',
      body: result,
    });
    yield put(updateBusinessInfoSuccess(response));
  } catch (err) {
    console.error(err); // eslint-disable-line no-console
    yield put(updateBusinessInfoError(err));
  }
}

export function* watchLoadedBusinessInfo() {
  const watcher = yield takeLatest(UPDATE_BUSINESS_INFO, updateBusinessInfo);

  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export default [watchLoadedBusinessInfo];
