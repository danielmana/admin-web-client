import { fork, takeLatest } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';


export function* onLocationChange() {
  // TODO replace by proper sagas
}

export function* watchLocationChange() {
  yield takeLatest(LOCATION_CHANGE, onLocationChange);
}

export default function* appSaga() {
  yield fork(watchLocationChange);
}
