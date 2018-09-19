import { take, call, put, cancel, takeLatest } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import request from 'utils/request';

import { UPDATE_CARD_SHIPPING_ADDRESS } from './constants';

import { updateCardShippingAddressSuccess, updateCardShippingAddressError } from './actions';

export function* updateCardShippingAddress(action) {
  try {
    const card = action.data;
    const data = {
      businessId: card.businessID,
      addresses: [
        {
          street: card.businessAddressOne,
          city: card.businessCity,
          addressAdditionals: card.businessAddressTwo,
          zipCode: card.businessZip,
          state: card.businessState,
          addressType: card.businessAddressType,
        },
        {
          street: card.shippingAddressOne,
          city: card.shippingCity,
          addressAdditionals: card.shippingAddressTwo,
          zipCode: card.shippingZip,
          state: card.shippingState,
          addressType: card.shippingAddressType,
        },
      ],
    };
    const endpoint = `/businesses/${data.businessId}`;
    const response = yield call(request, endpoint, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'PUT',
      body: data,
    });
    yield put(updateCardShippingAddressSuccess(response));
  } catch (err) {
    console.error(err); // eslint-disable-line no-console
    yield put(updateCardShippingAddressError(err));
  }
}

export function* watchLoadedCardShippingAddress() {
  const watcher = yield takeLatest(UPDATE_CARD_SHIPPING_ADDRESS, updateCardShippingAddress);

  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export default [watchLoadedCardShippingAddress];
