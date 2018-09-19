import { take, call, put, cancel, takeLatest, select } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';

import request from 'utils/request';
import { LOAD_ENROLLMENT, UPLOAD_DOCUMENT } from './constants';
import {
  loadEnrollment,
  loadEnrollmentSuccess,
  loadEnrollmentError,
  loadEnrollmentDetailsSuccess,
  uploadDocumentSuccess,
  uploadDocumentError,
} from './actions';
import { makeSelectEnrollment } from './selectors';

export function* onLoadEnrollment(action) {
  try {
    const { id } = action;
    const enrollmentEndpoint = `/enrollments/${id}`;
    const enrollmentResponse = yield call(request, enrollmentEndpoint);
    yield put(loadEnrollmentSuccess(enrollmentResponse));

    const enrollmentDetailsEndpoint = [
      call(request, `/businesses/${enrollmentResponse.businessId}/verification`),
      call(request, `/businesses/${enrollmentResponse.businessId}/documents`),
    ];
    const enrollmentDetailsResponse = yield enrollmentDetailsEndpoint;
    yield put(loadEnrollmentDetailsSuccess(enrollmentDetailsResponse));
  } catch (err) {
    console.error(err); // eslint-disable-line no-console
    yield put(loadEnrollmentError(err));
  }
}

export function* onWatchUploadDocument(action) {
  try {
    const formData = new FormData();
    formData.append('file', action.data.file);
    formData.append('type', action.data.type);
    const enrollment = yield select(makeSelectEnrollment());
    const endpoint = `/businesses/${enrollment.businessId}/documents`;
    const response = yield call(request, endpoint, {
      method: 'POST',
      body: formData,
    });
    yield put(uploadDocumentSuccess(response));
    // TODO split calls to refresh documents only
    yield put(loadEnrollment(enrollment.enrollmentId));
  } catch (err) {
    console.error(err); // eslint-disable-line no-console
    yield put(uploadDocumentError(err));
  }
}

export function* watchLoadEnrollment() {
  const watcher = yield takeLatest(LOAD_ENROLLMENT, onLoadEnrollment);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export function* watchUploadDocument() {
  const watcher = yield takeLatest(UPLOAD_DOCUMENT, onWatchUploadDocument);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export default [watchLoadEnrollment, watchUploadDocument];
