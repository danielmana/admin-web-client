import { fromJS } from 'immutable';
import { GET_MIGRATION_INFO_SUCCESS, GET_MIGRATION_INFO_ERROR, GET_NEW_BUSINESS_INFO_SUCCESS } from './constants';

const initialState = fromJS({
  businessMigrationInfo: {},
  newBusinessUsers: {},
  getAndUpdateMigrationInformationLoading: false,
  getAndUpdateMigrationInformationError: false,
});

function migrationInformationReducer(state = initialState, action) {
  switch (action.type) {
    case GET_MIGRATION_INFO_SUCCESS:
      return state
        .set('businessMigrationInfo', action.response)
        .set('getAndUpdateMigrationInformationLoading', false)
        .set('getAndUpdateMigrationInformationError', false);
    case GET_MIGRATION_INFO_ERROR:
      return state
        .set('businessMigrationInfo', {})
        .set('getAndUpdateMigrationInformationLoading', false)
        .set('getAndUpdateMigrationInformationError', true);
    case GET_NEW_BUSINESS_INFO_SUCCESS:
      return state.set('newBusinessUsers', action.response);
    default:
      return state;
  }
}

export default migrationInformationReducer;
