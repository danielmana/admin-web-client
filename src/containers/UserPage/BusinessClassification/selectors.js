import { createSelector } from 'reselect';

const selectState = (state) => state.get('businessClassification');

const makeSelectBusinessClassification = () =>
  createSelector(selectState, (state) => state.get('businessClassification'));

export { selectState, makeSelectBusinessClassification };
