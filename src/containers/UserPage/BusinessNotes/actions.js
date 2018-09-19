import {
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

export function createNewBusinessNotes(data) {
  return {
    type: CREATE_NEW_BUSINESS_NOTE,
    data,
  };
}

export function createNewBusinessNotesSuccess(response) {
  return {
    type: CREATE_NEW_BUSINESS_NOTE_SUCCESS,
    response,
    displaySuccessSnackbar: true,
  };
}

export function createNewBusinessNotesError(error) {
  return {
    type: CREATE_NEW_BUSINESS_NOTE_ERROR,
    error,
  };
}

export function deleteBusinessNote(data) {
  return {
    type: DELETE_BUSINESS_NOTE,
    data,
  };
}

export function deleteBusinessNoteSuccess(data) {
  return {
    type: DELETE_BUSINESS_NOTE_SUCCESS,
    data,
    displaySuccessSnackbar: true,
  };
}

export function deleteBusinessNoteError(error) {
  return {
    type: DELETE_BUSINESS_NOTE_ERROR,
    error,
  };
}

export function editBusinessNotes(data) {
  return {
    type: EDIT_BUSINESS_NOTE,
    data,
  };
}

export function editBusinessNotesSuccess(response) {
  return {
    type: EDIT_BUSINESS_NOTE_SUCCESS,
    response,
    displaySuccessSnackbar: true,
  };
}

export function editBusinessNotesError(error) {
  return {
    type: EDIT_BUSINESS_NOTE_ERROR,
    error,
  };
}

export function selectBusinessNoteToEdit(noteId) {
  return {
    type: EDIT_BUSINESS_SELECTED_NOTE_TO_EDIT,
    noteId,
  };
}
