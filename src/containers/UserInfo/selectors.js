import { createSelector } from 'reselect';

const selectState = (state) => state.get('userInfo');

const makeSelectLoadingUserInfo = () => createSelector(selectState, (state) => state.get('loadingUserInfo'));

const makeSelectUserInfo = () => createSelector(selectState, (state) => state.get('userInfo'));

const makeSelectError = () => createSelector(selectState, (state) => state.get('error'));

export { selectState, makeSelectLoadingUserInfo, makeSelectUserInfo, makeSelectError };
