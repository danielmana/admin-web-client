import { fromJS } from 'immutable';

import {
  UPDATE_CARD_SHIPPING_ADDRESS,
  UPDATE_CARD_SHIPPING_ADDRESS_SUCCESS,
  UPDATE_CARD_SHIPPING_ADDRESS_ERROR,
} from './constants';

const initialState = fromJS({
  loadingCardShippingAddress: false,
  cardShippingAddress: false,
  cardShippingAddressError: false,
  data: false,
});

function cardShippingAddressReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_CARD_SHIPPING_ADDRESS:
      return state
        .set('loadingCardShippingAddress', true)
        .set('cardShippingAddressError', false)
        .set('data', action.data);
    case UPDATE_CARD_SHIPPING_ADDRESS_SUCCESS:
      return state
        .set('loadingCardShippingAddress', true)
        .set('cardShippingAddress', action.response)
        .set('cardShippingAddressError', false);
    case UPDATE_CARD_SHIPPING_ADDRESS_ERROR:
      return state.set('cardShippingAddressError', action.error).set('loadingCardShippingAddress', false);
    default:
      return state;
  }
}

export default cardShippingAddressReducer;
