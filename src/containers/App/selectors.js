/**
 * The global state selectors
 */

import { createSelector } from 'reselect';
import storage from 'utils/storage';


const selectGlobal = (state) => state.get('global');
const selectStateForm = (state) => state.get('form');

const makeSelectCurrentUser = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('currentUser') || storage.getUser()
);

const makeSelectLoading = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('loading')
);

const makeSelectError = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('error')
);

const makeSelectSuccess = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('isSuccessSnackbarDisplayed')
);

const makeSelectLocationState = () => {
  let prevRoutingState;
  let prevRoutingStateJS;

  return (state) => {
    const routingState = state.get('route'); // or state.route

    if (!routingState.equals(prevRoutingState)) {
      prevRoutingState = routingState;
      prevRoutingStateJS = routingState.toJS();
    }

    return prevRoutingStateJS;
  };
};

const makeSelectFormField = (formName, fieldName) => createSelector(
  selectStateForm,
  (state) => state.getIn([formName, 'values', fieldName])
);

const makeSelectFormFields = (formName) => createSelector(
  selectStateForm,
  (state) => state.getIn([formName, 'values']),
);

export {
  selectGlobal,
  makeSelectCurrentUser,
  makeSelectLoading,
  makeSelectError,
  makeSelectSuccess,
  makeSelectLocationState,
  makeSelectFormField,
  makeSelectFormFields,
};
