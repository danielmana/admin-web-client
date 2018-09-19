import { fromJS } from 'immutable';
import map from 'lodash/map';

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

const initialState = fromJS({
  loading: true,
  loadingCards: false,
  user: false,
  error: false,
  routeParams: {},
  userCards: false,
  page: false,
});

function userPageDetailReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_USER:
      return state
        .set('loading', true)
        .set('error', false)
        .set('params', action.routeParams);
    case LOAD_USER_SUCCESS:
      return state.set('loading', false).set('user', action.response);
    case LOAD_USER_ERROR:
      return state.set('error', action.error).set('loading', false);
    // load user cards
    case LOAD_USER_CARDS:
      return state
        .set('loadingCards', true)
        .set('error', false)
        .set('page', action.page || state.get('page'))
        .set('params', action.routeParams);
    case LOAD_USER_CARDS_SUCCESS:
      return state.set('loadingCards', false).set('userCards', action.response);
    case LOAD_USER_CARDS_ERROR:
      return state.set('error', action.error).set('loadingCards', false);
    // load card history
    case LOAD_CARD_HISTORY:
      return state.set('page', action.page || state.get('page'));
    case LOAD_CARD_HISTORY_SUCCESS:
      return state.set('userCards', addCardHistory(state.get('userCards'), action.id, action.response));
    case LOAD_CARD_HISTORY_ERROR:
      return state.set('error', action.error);
    default:
      return state;
  }
}

function addCardHistory(oldResults, cardId, history) {
  const userCards = oldResults.results;
  const results = map(userCards, (card) => {
    if (card.cardId === cardId) {
      return {
        ...card,
        history,
      };
    }
    return card;
  });

  return {
    count: oldResults.count,
    ...userCards,
    results,
  };
}

export default userPageDetailReducer;
