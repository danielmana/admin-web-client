import { createSelector } from 'reselect';

const selectState = (state) => state.get('cardDetailsPage');

const makeSelectLoading = () => createSelector(selectState, (state) => state.get('loading'));

const makeSelectError = () => createSelector(selectState, (state) => state.get('error'));

const makeSelectCardDetails = () => createSelector(selectState, (state) => state.get('cardDetails'));

const makeSelectTransactions = () => createSelector(selectState, (state) => state.get('transactions'));

const makeSelectCardMigration = () => createSelector(selectState, (state) => state.get('cardMigration'));

export {
  selectState,
  makeSelectLoading,
  makeSelectError,
  makeSelectCardDetails,
  makeSelectTransactions,
  makeSelectCardMigration,
};
