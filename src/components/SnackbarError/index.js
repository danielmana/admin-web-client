import React from 'react';
import PropTypes from 'prop-types';
import { Snackbar } from 'material-ui';
import isBoolean from 'lodash/isBoolean';


const styles = {
    bodyStyle: {
        backgroundColor: '#b00e22',
    },
};

// WORKAROUND use array to skip reopening
// https://github.com/callemall/material-ui/issues/3186
const message = ['', ''];

class SnackbarError extends React.Component { // eslint-disable-line react/prefer-stateless-function

    render() {
        const { error, onRequestClose } = this.props;
        const open = !!error && !isBoolean(error);
        return (
            <Snackbar
                bodyStyle={styles.bodyStyle}
                open={open}
                message={this.renderMessage()}
                autoHideDuration={6000}
                onRequestClose={onRequestClose}
            />
        );
    }

    renderMessage() {
        const { error } = this.props;
        if (!error) {
            return '';
        }
        message[0] = error.statusText || 'Unknown server error, try again or create an asana task. ';
        message[1] = error.url || '';
        return message;
    }
}

SnackbarError.propTypes = {
    error: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.bool,
    ]),
    onRequestClose: PropTypes.func,
};

export default SnackbarError;
