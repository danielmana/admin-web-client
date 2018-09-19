import { createSelector } from 'reselect';

const selectState = (state) => state.get('enrollmentsPage');

const makeSelectLoading = () => createSelector(selectState, (state) => state.get('loading'));

const makeSelectEnrollment = () => createSelector(selectState, (state) => state.get('enrollments'));

const makeSelectFilters = () => createSelector(selectState, (state) => state.get('filters'));

export { selectState, makeSelectLoading, makeSelectEnrollment, makeSelectFilters };
