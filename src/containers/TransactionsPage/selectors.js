import { createSelector } from 'reselect';

const selectState = (state) => state.get('transactionsPage');

const makeSelectLoading = () => createSelector(selectState, (state) => state.get('loading'));

const makeSelectTransactions = () => createSelector(selectState, (state) => state.get('transactions'));

const makeSelectError = () => createSelector(selectState, (state) => state.get('error'));

const makeSelectPage = () => createSelector(selectState, (state) => state.get('page'));

const makeSelectFilters = () => createSelector(selectState, (state) => state.get('filters'));

export { selectState, makeSelectLoading, makeSelectTransactions, makeSelectError, makeSelectPage, makeSelectFilters };
