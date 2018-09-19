import { createSelector } from 'reselect';

const selectState = (state) => state.get('businessMigrationInfo');

const makeSelectBusinessMigrationInfo = () =>
  createSelector(selectState, (state) => state.get('businessMigrationInfo'));

const makeSelectNewBusinessUsers = () => createSelector(selectState, (state) => state.get('newBusinessUsers'));

export { selectState, makeSelectBusinessMigrationInfo, makeSelectNewBusinessUsers };
