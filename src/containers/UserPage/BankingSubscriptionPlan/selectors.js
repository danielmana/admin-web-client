import { createSelector } from 'reselect';

const selectState = (state) => state.get('bankingSubscriptionPlan');

const makeSelectLoadingBankingSubscriptionPlan = () =>
  createSelector(selectState, (state) => state.get('loadingBankingSubscriptionPlan'));

const makeSelectBankingSubscriptionPlan = () =>
  createSelector(selectState, (state) => state.get('bankingSubscriptionPlan'));

const makeSelectBankingSubscriptionPlanError = () =>
  createSelector(selectState, (state) => state.get('bankingSubscriptionPlanError'));

export {
  selectState,
  makeSelectLoadingBankingSubscriptionPlan,
  makeSelectBankingSubscriptionPlan,
  makeSelectBankingSubscriptionPlanError,
};
