import {
  LOAD_USER,
  LOAD_USER_SUCCESS,
  LOAD_USER_ERROR,
  LOAD_USER_CARDS,
  LOAD_USER_CARDS_SUCCESS,
  LOAD_USER_CARDS_ERROR,
  LOAD_CARD_HISTORY,
  LOAD_CARD_HISTORY_SUCCESS,
  LOAD_CARD_HISTORY_ERROR,
} from './constants';

export function loadUser(routeParams) {
  return {
    type: LOAD_USER,
    routeParams,
  };
}

export function loadUserSuccess(response) {
  return {
    type: LOAD_USER_SUCCESS,
    response,
  };
}

export function loadUserError(error) {
  return {
    type: LOAD_USER_ERROR,
    error,
  };
}

export function loadUserCards(routeParams, page) {
  return {
    type: LOAD_USER_CARDS,
    routeParams,
    page,
  };
}

export function loadUserCardsSuccess(response) {
  return {
    type: LOAD_USER_CARDS_SUCCESS,
    response,
  };
}

export function loadUserCardsError(error) {
  return {
    type: LOAD_USER_CARDS_ERROR,
    error,
  };
}

export function loadCardHistory(id) {
  return {
    type: LOAD_CARD_HISTORY,
    id,
  };
}

export function loadCardHistorySuccess(id, response) {
  return {
    type: LOAD_CARD_HISTORY_SUCCESS,
    id,
    response,
  };
}

export function loadCardHistoryError(error) {
  return {
    type: LOAD_CARD_HISTORY_ERROR,
    error,
  };
}
