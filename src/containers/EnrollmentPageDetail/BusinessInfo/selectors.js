import { createSelector } from 'reselect';

const selectState = (state) => state.get('businessInfo');

const makeSelectLoadingBusinessInfo = () => createSelector(selectState, (state) => state.get('loadingBusinessInfo'));

const makeSelectBusinessInfo = () => createSelector(selectState, (state) => state.get('businessInfo'));

const makeSelectErrorBusinessInfo = () => createSelector(selectState, (state) => state.get('errorBusinessInfo'));

export { selectState, makeSelectLoadingBusinessInfo, makeSelectBusinessInfo, makeSelectErrorBusinessInfo };
