import { createSelector } from 'reselect';

const selectState = (state) => state.get('enrollmentPageDetail');

const makeSelectEnrollmentLoading = () => createSelector(selectState, (state) => state.get('loading'));

const makeSelectEnrollment = () => createSelector(selectState, (state) => state.get('enrollment'));

const makeSelectEnrollmentError = () => createSelector(selectState, (state) => state.get('error'));

const makeSelectEnrollmentDetails = () => createSelector(selectState, (state) => state.get('enrollmentDetails'));

export {
  selectState,
  makeSelectEnrollmentLoading,
  makeSelectEnrollment,
  makeSelectEnrollmentError,
  makeSelectEnrollmentDetails,
};
