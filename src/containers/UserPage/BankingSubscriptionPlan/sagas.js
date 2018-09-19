import { take, call, put, cancel, takeLatest } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import request from 'utils/request';
import { dateToMilliseconds } from 'utils/helpers';

import { UPDATE_BANKING_SUBSCRIPTION_PLAN } from './constants';

import { updateBankingSubscriptionPlanSuccess, updateBankingSubscriptionPlanError } from './actions';

export function* updateBankingSubscriptionPlan(action) {
  try {
    const bankingSubscription = action.data;
    const data = {
      nextBillingDate: dateToMilliseconds(bankingSubscription.nextBillingDate),
    };
    const endpoint = `/subscriptions/${bankingSubscription.subscriptionId}`;
    const response = yield call(request, endpoint, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'PUT',
      body: data,
    });
    yield put(updateBankingSubscriptionPlanSuccess(response));
  } catch (err) {
    console.error(err); // eslint-disable-line no-console
    yield put(updateBankingSubscriptionPlanError(err));
  }
}

export function* watchLoadedBankingSubscriptionPlan() {
  const watcher = yield takeLatest(UPDATE_BANKING_SUBSCRIPTION_PLAN, updateBankingSubscriptionPlan);

  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export default [watchLoadedBankingSubscriptionPlan];
