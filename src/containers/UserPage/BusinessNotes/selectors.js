import { createSelector } from 'reselect';

const selectState = (state) => state.get('businessNotes');

const makeSelectBusinessNotes = () => createSelector(selectState, (state) => state.get('businessNotes'));

const makeSelectSelectedBusinessNoteToEdit = () =>
  createSelector(selectState, (state) => state.get('selectedBusinessNoteToEdit'));

export { selectState, makeSelectBusinessNotes, makeSelectSelectedBusinessNoteToEdit };
