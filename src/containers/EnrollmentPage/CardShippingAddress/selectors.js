import { createSelector } from 'reselect';

const selectState = (state) => state.get('cardShippingAddress');

const makeSelectLoadingCardShippingAddress = () =>
  createSelector(selectState, (state) => state.get('loadingCardShippingAddress'));

const makeSelectCardShippingAddress = () => createSelector(selectState, (state) => state.get('cardShippingAddress'));

const makeSelectCardShippingAddressError = () =>
  createSelector(selectState, (state) => state.get('cardShippingAddressError'));

export {
  selectState,
  makeSelectLoadingCardShippingAddress,
  makeSelectCardShippingAddress,
  makeSelectCardShippingAddressError,
};
