import { fromJS } from 'immutable';

import {
  UPDATE_BANKING_SUBSCRIPTION_PLAN,
  UPDATE_BANKING_SUBSCRIPTION_PLAN_SUCCESS,
  UPDATE_BANKING_SUBSCRIPTION_PLAN_ERROR,
} from './constants';

const initialState = fromJS({
  loadingBankingSubscriptionPlan: false,
  bankingSubscriptionPlan: false,
  bankingSubscriptionPlanError: false,
  data: {},
});

function bankingSubscriptionPlanReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_BANKING_SUBSCRIPTION_PLAN:
      return state
        .set('loadingBankingSubscriptionPlan', true)
        .set('bankingSubscriptionPlanError', false)
        .set('data', action.data);
    case UPDATE_BANKING_SUBSCRIPTION_PLAN_SUCCESS:
      return state
        .set('loadingBankingSubscriptionPlan', true)
        .set('bankingSubscriptionPlan', action.response)
        .set('bankingSubscriptionPlanError', false);
    case UPDATE_BANKING_SUBSCRIPTION_PLAN_ERROR:
      return state.set('bankingSubscriptionPlanError', action.error).set('loadingBankingSubscriptionPlan', false);
    default:
      return state;
  }
}

export default bankingSubscriptionPlanReducer;
