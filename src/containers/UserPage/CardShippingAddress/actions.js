import {
  UPDATE_CARD_SHIPPING_ADDRESS,
  UPDATE_CARD_SHIPPING_ADDRESS_SUCCESS,
  UPDATE_CARD_SHIPPING_ADDRESS_ERROR,
} from './constants';

export function updateCardShippingAddress(data) {
  return {
    type: UPDATE_CARD_SHIPPING_ADDRESS,
    data,
  };
}

export function updateCardShippingAddressSuccess(response) {
  return {
    type: UPDATE_CARD_SHIPPING_ADDRESS_SUCCESS,
    response,
    displaySuccessSnackbar: true,
  };
}

export function updateCardShippingAddressError(error) {
  return {
    type: UPDATE_CARD_SHIPPING_ADDRESS_ERROR,
    error,
  };
}
