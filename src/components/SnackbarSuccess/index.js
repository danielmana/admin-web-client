import React from 'react';
import PropTypes from 'prop-types';
import { Snackbar } from 'material-ui';

const successMessage = ['Success', ''];

const SnackbarSuccess = (props) => {
  const { isSuccessSnackbarDisplayed, onRequestClose } = props;
  return (
    <Snackbar
      open={isSuccessSnackbarDisplayed}
      message={successMessage}
      autoHideDuration={6000}
      onRequestClose={onRequestClose}
    />
  );
};

SnackbarSuccess.propTypes = {
  isSuccessSnackbarDisplayed: PropTypes.bool,
  onRequestClose: PropTypes.func,
};

export default SnackbarSuccess;
