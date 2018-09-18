import React from 'react';
import PropTypes from 'prop-types';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

class DialogConfirm extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

    constructor(props) {
        super(props);
        this.handleConfirm = this.handleConfirm.bind(this);
    }

    render() {
        const { visible } = this.props;
        return (
            <Dialog
                title="Confirm changes?"
                actions={this.renderDialogActions()}
                modal={false}
                open={visible}
            >
            </Dialog>
        );
    }

    handleConfirm() {
        const { data, onCancel, onCancelNext, onSubmit } = this.props;
        onSubmit(data);
        onCancel();
        if (onCancelNext) {
            onCancelNext();
        }
    }

    renderDialogActions() {
        const { onCancel } = this.props;

        return [
            <FlatButton
                label="Cancel"
                onClick={onCancel}
            />,
            <FlatButton
                style={{ marginLeft: 20 }}
                labelStyle={{ color: '#F44336' }}
                label="Confirm"
                keyboardFocused
                onClick={this.handleConfirm}
            />,
        ];
    }
}

DialogConfirm.propTypes = {
    data: PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.object,
    ]),
    visible: PropTypes.bool.isRequired,
    onSubmit: PropTypes.func.isRequired,
    onCancel: PropTypes.func,
    onCancelNext: PropTypes.func,
};

export default DialogConfirm;
