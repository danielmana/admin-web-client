import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import assign from 'lodash/assign';

import { makeSelectEnrollment } from '../selectors';

import { UPDATE_CARD_SHIPPING_ADDRESS } from './constants';

import { updateCardShippingAddressSuccess, updateCardShippingAddressError } from './actions';

export function* updateCardShippingAddress(action) {
  try {
    const card = action.data;
    const originalData = yield select(makeSelectEnrollment());
    const data = {
      businessShippingAddress: {
        street: card.shippingAddressOne,
        addressAdditionals: card.shippingAddressTwo,
        city: card.shippingCity,
        zipCode: card.shippingZip,
        state: card.shippingState,
        addressType: card.shippingAddressType,
      },
    };
    const result = assign(originalData, data);
    const endpoint = `/enrollments/${result.enrollmentId}`;
    const response = yield call(request, endpoint, {
      method: 'PUT',
      body: result,
    });
    yield put(updateCardShippingAddressSuccess(response));
  } catch (err) {
    console.error(err); // eslint-disable-line no-console
    yield put(updateCardShippingAddressError(err));
  }
}

export function* watchLoadedCardShippingAddress() {
  yield takeLatest(UPDATE_CARD_SHIPPING_ADDRESS, updateCardShippingAddress);
}

export default function* rootSaga() {
  yield all([
    watchLoadedCardShippingAddress(),
  ])
}
