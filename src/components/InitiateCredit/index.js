import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Card } from 'material-ui/Card';
import { Field, reduxForm } from 'redux-form/immutable';
import { createStructuredSelector } from 'reselect';
import AppBar from 'material-ui/AppBar';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

import { makeSelectFormField } from 'containers/App/selectors';

import DialogConfirm from 'components/Dialogs/DialogConfirm';
import FormTextField from 'components/Form/FormTextField';
import FormSelectField from 'components/Form/FormSelectField';

import { CREDIT_OPTIONS, COURTESY_CREDIT_REASONS } from './constants';


class InitiateCredit extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

    constructor() {
        super();
        this.renderInitiateCreditOptions = this.renderInitiateCreditOptions.bind(this);
        this.renderInitiateCreditDialog = this.renderInitiateCreditDialog.bind(this);
        this.state = {
            openCreditDialog: false,
            openConfirmDialog: false,
        };
    }

    render() {
        return (
            <div>
                <AppBar
                    title="Initiate Credit"
                    showMenuIconButton={false}
                    iconElementRight={this.renderCreditButton()}
                />
                <Card>
                    {this.renderInitiateCreditOptions()}
                    {this.renderInitiateCreditDialog()}
                    {this.renderConfirmDialog()}
                </Card>
            </div>
        );
    }

    handleOpenCreditDialog = () => {
        this.setState({
            openCreditDialog: true,
        });
    };

    handleCloseCreditDialog = () => {
        this.setState({
            openCreditDialog: false,
        });
    };

    handleOpenConfirmDialog = () => {
        this.handleCloseCreditDialog();
        this.setState({
            openConfirmDialog: true,
        });
    };

    handleCloseConfirmDialog = () => {
        this.setState({
            openConfirmDialog: false,
        });
        this.handleOpenCreditDialog();
    };

    renderConfirmDialog() {
        const { setInitiateCreditDebit, amount, initiateCredit, reason, description, userId } = this.props;
        const data = {
            userId,
            amount,
            reason,
            description,
            transferType: 'credit',
            transferSubType: initiateCredit,
        };
        return (
            <DialogConfirm
                visible={this.state.openConfirmDialog}
                onCancel={this.handleCloseConfirmDialog}
                onCancelNext={this.handleCloseCreditDialog}
                onSubmit={setInitiateCreditDebit}
                data={data}
            />
        );
    }

    renderCreditButton() {
        return (
            <FlatButton
                label="Credit"
                onClick={this.handleOpenCreditDialog}
            />
        );
    }

    renderInitiateCreditOptions() {
        return (
            <Field
                name="initiateCredit"
                label="Initiate Credit"
                options={CREDIT_OPTIONS}
                component={FormSelectField}
            />
        );
    }

    renderInitiateCreditDialog() {
        const { initiateCredit } = this.props;
        const actions = [
            <FlatButton
                label="Cancel"
                onClick={this.handleCloseCreditDialog}
            />,
            <FlatButton
                label="Confirm"
                onClick={this.handleOpenConfirmDialog}
            />,
        ];

        if (initiateCredit === 'courtesy_credit') {
            return (
                <div>
                    <Dialog
                        title={'Initiate Credit'}
                        actions={actions}
                        modal={false}
                        open={this.state.openCreditDialog}
                        onRequestClose={this.handleCloseCreditDialog}
                    >

                        <form>
                            {this.renderAmount()}
                            {this.renderCourtesyReasons()}
                            {this.renderDescription()}
                        </form>

                    </Dialog>
                </div>
            );
        }

        return (
            <div>
                <Dialog
                    title="Initiate"
                    actions={actions}
                    modal={false}
                    open={this.state.openCreditDialog}
                    onRequestClose={this.handleCloseCreditDialog}
                >
                    <form>
                        {this.renderAmount()}
                    </form>
                </Dialog>
            </div>
        );
    }

    renderAmount() {
        return (
            <Field
                name="amount"
                label="Amount"
                component={FormTextField}
            />
        );
    }

    renderCourtesyReasons() {
        return (
            <Field
                name="reason"
                label="Enter reason"
                options={COURTESY_CREDIT_REASONS}
                component={FormSelectField}
            />
        );
    }

    renderDescription() {
        return (
            <Field
                name="description"
                label="Description"
                component={FormTextField}
            />
        );
    }
}

InitiateCredit.propTypes = {
    setInitiateCreditDebit: PropTypes.func.isRequired,
    initiateCredit: PropTypes.string,
    amount: PropTypes.string,
    description: PropTypes.string,
    userId: PropTypes.number,
    reason: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
    initiateCredit: makeSelectFormField('InitiateCredit', 'initiateCredit'),
    amount: makeSelectFormField('InitiateCredit', 'amount'),
    description: makeSelectFormField('InitiateCredit', 'description'),
});

export default connect(mapStateToProps)(reduxForm({
    form: 'InitiateCredit',
})(InitiateCredit));
