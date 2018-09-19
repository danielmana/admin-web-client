import { take, call, put, cancel, takeLatest } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import request from 'utils/request';

import { CREATE_NEW_BUSINESS_NOTE, DELETE_BUSINESS_NOTE, EDIT_BUSINESS_NOTE } from './constants';

import {
  createNewBusinessNotesSuccess,
  createNewBusinessNotesError,
  deleteBusinessNoteSuccess,
  deleteBusinessNoteError,
  editBusinessNotesSuccess,
  editBusinessNotesError,
} from './actions';

export function* editBusinessNotes(action) {
  try {
    const { data } = action;
    const endpoint = `/notes/${data.note.id}`;
    const response = yield call(request, endpoint, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'PUT',
      body: data.mappedBusinessNote,
    });
    yield put(editBusinessNotesSuccess(response));
  } catch (err) {
    console.error(err); // eslint-disable-line no-console
    yield put(editBusinessNotesError(err));
  }
}

export function* createNewBusinessNotes(action) {
  try {
    const { data } = action;
    const endpoint = `/businesses/${data.businessId}/notes`;
    const response = yield call(request, endpoint, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: data.note,
    });
    yield put(createNewBusinessNotesSuccess(response));
  } catch (err) {
    console.error(err); // eslint-disable-line no-console
    yield put(createNewBusinessNotesError(err));
  }
}

export function* deleteBusinessNote(action) {
  try {
    const { data } = action;
    // const endpoint = `/businesses/${data.businessId}/notes/${data.note.id}`;
    const endpoint = `/notes/${data.noteId}`;
    yield call(request, endpoint, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'DELETE',
    });
    yield put(deleteBusinessNoteSuccess(data));
  } catch (err) {
    console.error(err); // eslint-disable-line no-console
    yield put(deleteBusinessNoteError(err));
  }
}

export function* watchLoadedEditBusinessNotes() {
  const watcher = yield takeLatest(EDIT_BUSINESS_NOTE, editBusinessNotes);

  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export function* watchLoadedcreateNewBusinessNotes() {
  const watcher = yield takeLatest(CREATE_NEW_BUSINESS_NOTE, createNewBusinessNotes);

  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export function* watchLoadedDeleteBusinessNotes() {
  const watcher = yield takeLatest(DELETE_BUSINESS_NOTE, deleteBusinessNote);

  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export default [watchLoadedcreateNewBusinessNotes, watchLoadedDeleteBusinessNotes, watchLoadedEditBusinessNotes];
