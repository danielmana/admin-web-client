import { createSelector } from 'reselect';

const selectState = (state) => state.get('cardShippingAddressSuccess');

const makeSelectLoadingCardShippingAddress = () =>
  createSelector(selectState, (state) => state.get('loadingCardShippingAddress'));

const makeSelectCardShippingAddressSuccess = () =>
  createSelector(selectState, (state) => state.get('cardShippingAddressSuccess'));

const makeSelectCardShippingAddressError = () =>
  createSelector(selectState, (state) => state.get('cardShippingAddressError'));

export {
  selectState,
  makeSelectLoadingCardShippingAddress,
  makeSelectCardShippingAddressSuccess,
  makeSelectCardShippingAddressError,
};
