import { fromJS } from 'immutable';

import {
  GET_BUSINESS_CLASSIFICATION_SUCCESS,
  GET_BUSINESS_CLASSIFICATION_ERROR,
  UPDATE_BUSINESS_CLASSIFICATION,
  UPDATE_BUSINESS_CLASSIFICATION_SUCCESS,
  UPDATE_BUSINESS_CLASSIFICATION_ERROR,
} from './constants';

const initialState = fromJS({
  businessClassification: {},
  getAndUpdateBusinessClassificationLoading: false,
  getAndUpdateBusinessClassificationError: false,
});

function businessClassificationReducer(state = initialState, action) {
  switch (action.type) {
    case GET_BUSINESS_CLASSIFICATION_SUCCESS:
      return state
        .set('businessClassification', action.response)
        .set('getAndUpdateBusinessClassificationLoading', false)
        .set('getAndUpdateBusinessClassificationError', false);
    case GET_BUSINESS_CLASSIFICATION_ERROR:
      return state
        .set('getAndUpdateBusinessClassificationLoading', false)
        .set('getAndUpdateBusinessClassificationError', action.error);
    case UPDATE_BUSINESS_CLASSIFICATION:
      return state
        .set('getAndUpdateBusinessClassificationLoading', true)
        .set('getAndUpdateBusinessClassificationError', false);
    case UPDATE_BUSINESS_CLASSIFICATION_SUCCESS:
      return state
        .set('businessClassification', action.response)
        .set('getAndUpdateBusinessClassificationLoading', false)
        .set('getAndUpdateBusinessClassificationError', false);
    case UPDATE_BUSINESS_CLASSIFICATION_ERROR:
      return state
        .set('getAndUpdateBusinessClassificationLoading', false)
        .set('getAndUpdateBusinessClassificationError', action.error);
    default:
      return state;
  }
}

export default businessClassificationReducer;
