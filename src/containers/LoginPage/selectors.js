import { createSelector } from 'reselect';

const selectState = (state) => state.get('loginPage');

const makeSelectLoading = () => createSelector(
  selectState,
  (state) => state.get('loading')
);

const makeSelectSignedIn = () => createSelector(
  selectState,
  (state) => state.get('signedIn')
);

const makeSelectError = () => createSelector(
  selectState,
  (state) => state.get('error')
);

export {
  selectState,
  makeSelectLoading,
  makeSelectSignedIn,
  makeSelectError,
};
