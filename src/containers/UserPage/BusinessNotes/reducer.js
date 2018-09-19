import { fromJS } from 'immutable';

import { LOAD_USER_SUCCESS } from 'containers/UserPage/constants';

import {
  NO_NOTE_SELECTED,
  CREATE_NEW_BUSINESS_NOTE,
  CREATE_NEW_BUSINESS_NOTE_SUCCESS,
  CREATE_NEW_BUSINESS_NOTE_ERROR,
  DELETE_BUSINESS_NOTE,
  DELETE_BUSINESS_NOTE_SUCCESS,
  DELETE_BUSINESS_NOTE_ERROR,
  EDIT_BUSINESS_NOTE,
  EDIT_BUSINESS_NOTE_SUCCESS,
  EDIT_BUSINESS_NOTE_ERROR,
  EDIT_BUSINESS_SELECTED_NOTE_TO_EDIT,
} from './constants';

const initialState = fromJS({
  businessNotes: [],
  createNewBusinessNotesLoading: false,
  createNewBusinessNotesError: false,
  deleteAndEditBusinessNotesLoading: false,
  deleteAndEditBusinessNoteError: false,
  selectedBusinessNoteToEdit: NO_NOTE_SELECTED,
});

function getBusinessNotes(notes) {
  const notesFound = notes && Array.isArray(notes) ? notes : [];
  return notesFound.sort((note1, note2) => note2.createdOn - note1.createdOn);
}

function getNewBusinessNotesWithNewlyCreatedNote(state, newlyAddedNote) {
  return state.get('businessNotes').reduce(
    (notes, note) => {
      notes.push(note);
      return notes;
    },
    [newlyAddedNote]
  );
}

function getNewBusinessNotesWithNewlyEditedNote(state, newlyAddedNote) {
  return state.get('businessNotes').map((note) => (note.id === newlyAddedNote.id ? newlyAddedNote : note));
}

function getNewBusinessNotesWithoutDeletedNote(state, noteId) {
  return state.get('businessNotes').filter((note) => noteId !== note.id);
}

function businessNotesReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_USER_SUCCESS:
      return state.set('businessNotes', getBusinessNotes(action.response[4]));
    case CREATE_NEW_BUSINESS_NOTE:
      return state.set('createNewBusinessNotesError', false).set('createData', action.data);
    case CREATE_NEW_BUSINESS_NOTE_SUCCESS:
      return state
        .set('businessNotes', getNewBusinessNotesWithNewlyCreatedNote(state, action.response))
        .set('createNewBusinessNotesError', false);
    case CREATE_NEW_BUSINESS_NOTE_ERROR:
      return state.set('createNewBusinessNotesError', action.error);
    case DELETE_BUSINESS_NOTE:
      return state.set('deleteAndEditBusinessNotesLoading', true).set('deleteAndEditBusinessNoteError', false);
    case DELETE_BUSINESS_NOTE_SUCCESS:
      return state
        .set('deleteAndEditBusinessNotesLoading', false)
        .set('businessNotes', getNewBusinessNotesWithoutDeletedNote(state, action.data.noteId))
        .set('deleteAndEditBusinessNoteError', false);
    case DELETE_BUSINESS_NOTE_ERROR:
      return state.set('deleteAndEditBusinessNoteError', action.error).set('deleteAndEditBusinessNotesLoading', false);
    case EDIT_BUSINESS_NOTE:
      return state.set('deleteAndEditBusinessNoteError', false).set('deleteAndEditBusinessNotesLoading', true);
    case EDIT_BUSINESS_NOTE_SUCCESS:
      return state
        .set('businessNotes', getNewBusinessNotesWithNewlyEditedNote(state, action.response))
        .set('deleteAndEditBusinessNoteError', false)
        .set('deleteAndEditBusinessNotesLoading', true)
        .set('selectedBusinessNoteToEdit', NO_NOTE_SELECTED);
    case EDIT_BUSINESS_NOTE_ERROR:
      return state.set('deleteAndEditBusinessNoteError', action.error).set('deleteAndEditBusinessNotesLoading', false);
    case EDIT_BUSINESS_SELECTED_NOTE_TO_EDIT:
      return state.set('selectedBusinessNoteToEdit', action.noteId);
    default:
      return state;
  }
}

export default businessNotesReducer;
