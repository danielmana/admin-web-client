import {
  UPDATE_BANKING_SUBSCRIPTION_PLAN,
  UPDATE_BANKING_SUBSCRIPTION_PLAN_SUCCESS,
  UPDATE_BANKING_SUBSCRIPTION_PLAN_ERROR,
} from './constants';

export function updateBankingSubscriptionPlan(data) {
  return {
    type: UPDATE_BANKING_SUBSCRIPTION_PLAN,
    data,
  };
}

export function updateBankingSubscriptionPlanSuccess(response) {
  return {
    type: UPDATE_BANKING_SUBSCRIPTION_PLAN_SUCCESS,
    response,
    displaySuccessSnackbar: true,
  };
}

export function updateBankingSubscriptionPlanError(error) {
  return {
    type: UPDATE_BANKING_SUBSCRIPTION_PLAN_ERROR,
    error,
  };
}
