import React from 'react';
import PropTypes from 'prop-types';
import { Snackbar } from 'material-ui';


const successMessage = ['Success', ''];

class SnackbarSuccess extends React.Component { // eslint-disable-line react/prefer-stateless-function

    render() {
        const { isSuccessSnackbarDisplayed, onRequestClose } = this.props;
        return (
            <Snackbar
                open={isSuccessSnackbarDisplayed}
                message={successMessage}
                autoHideDuration={6000}
                onRequestClose={onRequestClose}
            />
        );
    }
}

SnackbarSuccess.propTypes = {
    isSuccessSnackbarDisplayed: PropTypes.bool,
    onRequestClose: PropTypes.func,
};

export default SnackbarSuccess;
