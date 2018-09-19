import { createSelector } from 'reselect';

const selectState = (state) => state.get('usersPage');

const makeSelectLoading = () => createSelector(selectState, (state) => state.get('loading'));

const makeSelectUsers = () => createSelector(selectState, (state) => state.get('users'));

const makeSelectFilters = () => createSelector(selectState, (state) => state.get('filters'));

export { selectState, makeSelectLoading, makeSelectUsers, makeSelectFilters };
