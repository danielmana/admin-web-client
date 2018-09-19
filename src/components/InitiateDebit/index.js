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

import { DEBIT_OPTIONS } from './constants';

class InitiateDebit extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      openDebitDialog: false,
      openConfirmDialog: false,
    };
  }

  render() {
    return (
      <div>
        <AppBar title="Initiate Debit" showMenuIconButton={false} iconElementRight={this.renderDebitButton()} />
        <Card>
          {this.renderInitiateDebitOptions()}
          {this.renderInitiateDebitDialog()}
          {this.renderConfirmDialog()}
        </Card>
      </div>
    );
  }

  handleOpenDebitDialog = () => {
    this.setState({
      openDebitDialog: true,
    });
  };

  handleCloseDebitDialog = () => {
    this.setState({
      openDebitDialog: false,
    });
  };

  handleOpenConfirmDialog = () => {
    this.handleCloseDebitDialog();
    this.setState({
      openConfirmDialog: true,
    });
  };

  handleCloseConfirmDialog = () => {
    this.setState({
      openConfirmDialog: false,
    });
    this.handleOpenDebitDialog();
  };

  handleSubmit = (data) => {
    if (!this.props.submitting) {
      this.props.setInitiateCreditDebit(data);
    }
  };

  renderConfirmDialog = () => {
    const { amount, initiateDebit, description, businessId } = this.props;
    const data = {
      businessId,
      amount: amount || '',
      transferType: 'debit',
      transferSubType: initiateDebit,
      description: description || '',
    };
    return (
      <DialogConfirm
        visible={this.state.openConfirmDialog}
        onCancel={this.handleCloseConfirmDialog}
        onCancelNext={this.handleCloseDebitDialog}
        onSubmit={this.handleSubmit}
        data={data}
      />
    );
  };

  renderDebitButton = () => <FlatButton label="Debit" onClick={this.handleOpenDebitDialog} />;

  renderInitiateDebitOptions = () => (
    <Field name="initiateDebit" label="Initiate Debit" options={DEBIT_OPTIONS} component={FormSelectField} />
  );

  renderInitiateDebitDialog = () => {
    const { initiateDebit } = this.props;
    const actions = [
      <FlatButton label="Cancel" onClick={this.handleCloseDebitDialog} />,
      <FlatButton label="Confirm" onClick={this.handleOpenConfirmDialog} />,
    ];

    if (initiateDebit === 'expedite_fee' || initiateDebit === 'unload' || initiateDebit === 'refund_check_fee') {
      return (
        <div>
          <Dialog
            title="Initiate Debit"
            actions={actions}
            modal={false}
            open={this.state.openDebitDialog}
            onRequestClose={this.handleCloseDebitDialog}
          >
            <form>{this.renderAmount()}</form>
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
          open={this.state.openDebitDialog}
          onRequestClose={this.handleCloseDebitDialog}
        >
          <form>
            {this.renderAmount()}
            {this.renderDescription()}
          </form>
        </Dialog>
      </div>
    );
  };

  renderAmount = () => <Field name="amount" label="Amount" component={FormTextField} />;

  renderDescription = () => <Field name="description" label="Description" component={FormTextField} />;
}

InitiateDebit.propTypes = {
  setInitiateCreditDebit: PropTypes.func.isRequired,
  initiateDebit: PropTypes.string,
  amount: PropTypes.string,
  description: PropTypes.string,
  businessId: PropTypes.number,
  submitting: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  initiateDebit: makeSelectFormField('InitiateDebit', 'initiateDebit'),
  amount: makeSelectFormField('InitiateDebit', 'amount'),
  courtesyReasons: makeSelectFormField('InitiateDebit', 'courtesyReasons'),
  description: makeSelectFormField('InitiateDebit', 'description'),
});

export default connect(mapStateToProps)(
  reduxForm({
    form: 'InitiateDebit',
  })(InitiateDebit)
);
