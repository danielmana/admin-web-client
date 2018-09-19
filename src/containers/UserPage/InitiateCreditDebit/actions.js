import {
  SET_INITIATE_CREDIT_DEBIT,
  SET_INITIATE_CREDIT_DEBIT_SUCCESS,
  SET_INITIATE_CREDIT_DEBIT_ERROR,
} from './constants';

export function setInitiateCreditDebit(data) {
  return {
    type: SET_INITIATE_CREDIT_DEBIT,
    data,
  };
}

export function setInitiateCreditDebitSuccess(response) {
  return {
    type: SET_INITIATE_CREDIT_DEBIT_SUCCESS,
    response,
    displaySuccessSnackbar: true,
  };
}

export function setInitiateCreditDebitError(error) {
  return {
    type: SET_INITIATE_CREDIT_DEBIT_ERROR,
    error,
  };
}
