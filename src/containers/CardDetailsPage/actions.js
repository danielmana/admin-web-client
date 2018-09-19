import {
  LOAD_CARD_DETAILS,
  LOAD_CARD_DETAILS_SUCCESS,
  LOAD_CARD_DETAILS_ERROR,
  UPDATE_CARD_INFORMATION,
  UPDATE_CARD_INFORMATION_SUCCESS,
  UPDATE_CARD_INFORMATION_ERROR,
  REISSUE_CARD,
  REISSUE_CARD_SUCCESS,
  REISSUE_CARD_ERROR,
  DELETE_CARD,
  DELETE_CARD_SUCCESS,
  DELETE_CARD_ERROR,
  LOAD_TRANSACTION_HISTORY,
  LOAD_TRANSACTION_HISTORY_SUCCESS,
  LOAD_TRANSACTION_HISTORY_ERROR,
} from './constants';

export function loadCardDetails(id) {
  return {
    type: LOAD_CARD_DETAILS,
    id,
  };
}

export function loadCardDetailsSuccess(response) {
  return {
    type: LOAD_CARD_DETAILS_SUCCESS,
    response,
  };
}

export function loadCardDetailsError(error) {
  return {
    type: LOAD_CARD_DETAILS_ERROR,
    error,
  };
}

export function updateCardInformation(data) {
  return {
    type: UPDATE_CARD_INFORMATION,
    data,
  };
}

export function updateCardInformationSuccess(response) {
  return {
    type: UPDATE_CARD_INFORMATION_SUCCESS,
    response,
    displaySuccessSnackbar: true,
  };
}

export function updateCardInformationError(error) {
  return {
    type: UPDATE_CARD_INFORMATION_ERROR,
    error,
  };
}

export function reissueCard(card) {
  return {
    type: REISSUE_CARD,
    card,
  };
}

export function reissueCardSuccess(response) {
  return {
    type: REISSUE_CARD_SUCCESS,
    response,
    displaySuccessSnackbar: true,
  };
}

export function reissueCardError(error) {
  return {
    type: REISSUE_CARD_ERROR,
    error,
  };
}

export function deleteCard(card) {
  return {
    type: DELETE_CARD,
    card,
  };
}

export function deleteCardSuccess(response) {
  return {
    type: DELETE_CARD_SUCCESS,
    response,
    displaySuccessSnackbar: true,
  };
}

export function deleteCardError(error) {
  return {
    type: DELETE_CARD_ERROR,
    error,
  };
}

export function loadTransactionHistory(id) {
  return {
    type: LOAD_TRANSACTION_HISTORY,
    id,
  };
}

export function loadTransactionHistorySuccess(id, response) {
  return {
    type: LOAD_TRANSACTION_HISTORY_SUCCESS,
    id,
    response,
  };
}

export function loadTransactionHistoryError(error) {
  return {
    type: LOAD_TRANSACTION_HISTORY_ERROR,
    error,
  };
}
