import { createSelector } from 'reselect';

const selectState = (state) => state.get('userPageDetail');

const makeSelectLoading = () => createSelector(selectState, (state) => state.get('loading'));

const makeSelectUser = () => createSelector(selectState, (state) => state.get('user'));

const makeSelectLoadingCards = () => createSelector(selectState, (state) => state.get('loadingCards'));

const makeSelectUserCards = () => createSelector(selectState, (state) => state.get('userCards'));

const makeSelectPage = () => createSelector(selectState, (state) => state.get('page'));

export { selectState, makeSelectLoading, makeSelectUser, makeSelectLoadingCards, makeSelectUserCards, makeSelectPage };
