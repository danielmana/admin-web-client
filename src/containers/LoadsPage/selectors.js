import { createSelector } from 'reselect';

const selectState = (state) => state.get('loadsPage');

const makeSelectLoading = () => createSelector(selectState, (state) => state.get('loading'));

const makeSelectLoads = () => createSelector(selectState, (state) => state.get('loads'));

const makeSelectFilters = () => createSelector(selectState, (state) => state.get('filters'));

export default selectState;
export { makeSelectLoading, makeSelectLoads, makeSelectFilters };
