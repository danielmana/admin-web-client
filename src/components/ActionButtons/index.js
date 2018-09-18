import React from 'react';
import PropTypes from 'prop-types';
import FlatButton from 'material-ui/FlatButton';

const styles = {
    btnContainer: {
        marginTop: 5,
        btnSaveCancelStyle: {
            backgroundColor: 'transparent',
            color: 'white',
            textDecoration: 'underline',
        },
        btnEditStyle: {
            backgroundColor: 'transparent',
            color: 'white',
            marginTop: 5,
        },
    },
};

class ActionButtons extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

    renderActions() {
        const { disabled, handleEditableState } = this.props;

        if (disabled) {
            return (
                <FlatButton
                    label="Edit"
                    onClick={handleEditableState}
                    style={styles.btnContainer.btnEditStyle}
                />
            );
        }

        return (
            <div style={styles.btnContainer}>
                <FlatButton
                    label="Cancel"
                    onClick={handleEditableState}
                    style={styles.btnContainer.btnSaveCancelStyle}
                />
                <FlatButton
                    label="Save"
                    type="submit"
                    style={styles.btnContainer.btnSaveCancelStyle}
                />
            </div>
        );
    }

    render() {
        return (
            <div>
                {this.renderActions()}
            </div>
        );
    }
}


ActionButtons.propTypes = {
    disabled: PropTypes.bool,
    handleEditableState: PropTypes.func.isRequired,
};

export default ActionButtons;
