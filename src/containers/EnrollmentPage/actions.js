import {
  LOAD_ENROLLMENT,
  LOAD_ENROLLMENT_SUCCESS,
  LOAD_ENROLLMENT_ERROR,
  LOAD_ENROLLMENT_DETAILS_SUCCESS,
  UPLOAD_DOCUMENT,
  UPLOAD_DOCUMENT_SUCCESS,
  UPLOAD_DOCUMENT_ERROR,
  GET_DOCUMENT,
} from './constants';

export function loadEnrollment(id) {
  return {
    type: LOAD_ENROLLMENT,
    id,
  };
}

export function loadEnrollmentSuccess(response) {
  return {
    type: LOAD_ENROLLMENT_SUCCESS,
    response,
  };
}

export function loadEnrollmentError(error) {
  return {
    type: LOAD_ENROLLMENT_ERROR,
    error,
  };
}

export function loadEnrollmentDetailsSuccess(response) {
  return {
    type: LOAD_ENROLLMENT_DETAILS_SUCCESS,
    response,
  };
}

export function uploadDocument(data) {
  return {
    type: UPLOAD_DOCUMENT,
    data,
  };
}

export function uploadDocumentSuccess(response) {
  return {
    type: UPLOAD_DOCUMENT_SUCCESS,
    response,
  };
}

export function uploadDocumentError(error) {
  return {
    type: UPLOAD_DOCUMENT_ERROR,
    error,
  };
}

export function getDocument(data) {
  return {
    type: GET_DOCUMENT,
    data,
  };
}
