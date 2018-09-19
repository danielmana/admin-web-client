import { createSelector } from 'reselect';

const selectState = (state) => state.get('businessInfo');

const makeSelectLoadingBusinessInfo = () => createSelector(selectState, (state) => state.get('loadingBusinessInfo'));

const makeSelectBusinessInfo = () => createSelector(selectState, (state) => state.get('businessInfo'));

const makeSelectError = () => createSelector(selectState, (state) => state.get('error'));

export { selectState, makeSelectLoadingBusinessInfo, makeSelectBusinessInfo, makeSelectError };
