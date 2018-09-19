import { take, call, put, cancel, takeLatest } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import request from 'utils/request';

import { UPDATE_BUSINESS_INFO, COUNTRY } from './constants';

import { updateBusinessInfoSuccess, updateBusinessInfoError } from './actions';

export function* updateBusinessInfo(action) {
  try {
    const business = action.data;
    const industry = `${business.majorIndustry}:${business.minorIndustry}`;
    const data = {
      businessId: business.businessID,
      status: business.businessStatus,
      companyName: business.companyName,
      nameOnCard: business.businessNameOnCard,
      taxId: business.ein,
      phone: business.phoneNumber,
      businessStructure: business.businessStructure,
      addresses: [
        {
          street: business.addressOne,
          city: business.city,
          addressAdditionals: business.addressTwo,
          zipCode: business.zip,
          state: business.state,
          addressType: business.addressType,
          country: COUNTRY,
        },
      ],
      timeZone: business.timezone,
      additionalInfo: {
        employeeQty: business.employees,
        promoCode: business.promoCode,
      },
      industry,
    };
    const endpoint = `/businesses/${data.businessId}`;
    const response = yield call(request, endpoint, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'PUT',
      body: data,
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
