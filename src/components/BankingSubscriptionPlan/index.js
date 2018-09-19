import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import AppBar from 'material-ui/AppBar';
import { Card } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import { Field, reduxForm } from 'redux-form/immutable';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import moment from 'moment';
import numeral from 'numeral';
import head from 'lodash/head';
import find from 'lodash/find';

import { createValidator, required } from 'utils/validation';
import { toDate } from 'utils/helpers';

import ActionButtons from 'components/ActionButtons';
import FormTextField from 'components/Form/FormTextField';
import FormSelectField from 'components/Form/FormSelectField';
import FormDatePicker from 'components/Form/FormDatePicker';
import DialogConfirm from 'components/Dialogs/DialogConfirm';

import { makeSelectFormFields } from 'containers/App/selectors';

import { ACCOUNT_PLAN, TIME_INTERVAL_DICTIONARY, PERIODIC_RELOAD, LOW_BALANCE_RELOAD } from './constants';

const styles = {
  row: {
    display: 'flex',
  },
  button: {
    height: 'auto',
    width: '100%',
  },
};

const validate = createValidator({
  nextBillingDate: [required],
});

class BankingSubscriptionPlan extends React.PureComponent {
  constructor(props) {
    super(props);
    this.handleEditableState = this.handleEditableState.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.goToLoads = this.goToLoads.bind(this);
    this.onDialogCancel = this.onDialogCancel.bind(this);
    this.state = {
      disabled: true,
      open: false,
    };
  }

  componentDidMount() {
    const { bankingInfo, subscriptionInfo } = this.props;
    const subscription = head(subscriptionInfo) || '';
    const fundingSource = bankingInfo ? head(bankingInfo) : '';
    const bLinked = bankingInfo ? 'YES' : 'NO';
    this.handleInitialization(fundingSource, subscription, bLinked);
  }

  handleInitialization(fundingSource, subscription, bLinked) {
    const periodicReload = find(fundingSource.autoReloads, (autoReload) =>
      autoReload.bentoType.includes(PERIODIC_RELOAD)
    );
    const lowBalanceReload = find(fundingSource.autoReloads, (autoReload) =>
      autoReload.bentoType.includes(LOW_BALANCE_RELOAD)
    );

    this.props.initialize({
      ...fundingSource,
      bankedAddedOn: toDate(fundingSource.createdDate),
      bankVerifiedOn: toDate(fundingSource.changeStatusDate),
      bankLinked: bLinked,
      lowBalanceReload: lowBalanceReload
        ? `${lowBalanceReload.active ? 'ON' : 'OFF'} (set on ${moment(lowBalanceReload.updatedDate).format(
          'MM/DD/YYYY'
        )}) - trigger: ${numeral(lowBalanceReload.threshold).format('$0,0.00')}`
        : 'N/A',
      periodicReload: periodicReload
        ? `${periodicReload.active ? 'ON' : 'OFF'} (Set on ${moment(periodicReload.updatedDate).format('MM/DD/YYYY')})`
        : 'N/A',
      lowBalanceAmount: lowBalanceReload ? `${numeral(lowBalanceReload.amount).format('$0,0.00')}` : 'N/A',
      periodicReloadAmount: periodicReload
        ? `${numeral(periodicReload.amount).format('$0,0.00')} / ${periodicReload.period} / ${
        TIME_INTERVAL_DICTIONARY[periodicReload.period][periodicReload.timeInterval]
        }`
        : 'N/A',
      nextBillingDate: toDate(subscription.nextBillingDate),
      accountPlan: subscription.plan.name,
      billableUnits: subscription.billableUnits,
      businessId: fundingSource.business.businessId,
      subscriptionId: subscription.subscriptionId,
    });
  }

  handleEditableState() {
    this.setState({ disabled: !this.state.disabled });
  }

  renderActionButtons() {
    return <ActionButtons handleEditableState={this.handleEditableState} disabled={this.state.disabled} />;
  }

  onDialogCancel() {
    this.setState({
      open: false,
    });
  }

  renderConfirmDialog() {
    const { update, formValues } = this.props;
    return (
      <DialogConfirm visible={this.state.open} onCancel={this.onDialogCancel} onSubmit={update} data={formValues} />
    );
  }

  handleSubmit() {
    this.handleEditableState();
    this.setState({
      open: true,
    });
  }

  goToLoads() {
    const { history, bankingInfo } = this.props;
    const fundingSource = bankingInfo ? head(bankingInfo) : '';
    const businessId = fundingSource.business.businessId;
    history.push(`/loads?businessId=${businessId}`);
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <div>
        <form onSubmit={handleSubmit(this.handleSubmit)}>
          <AppBar
            title="Banking & Subscription Plan"
            showMenuIconButton={false}
            iconElementRight={this.renderActionButtons()}
          />
          <Card>
            <div style={styles.row}>
              {this.renderViewLoads()}
              {this.renderLowBalanceReload()}
            </div>
            <div style={styles.row}>
              {this.renderBankLinked()}
              {this.renderLowBalanceAmount()}
            </div>
            <div style={styles.row}>
              {this.renderBankAddedOn()}
              {this.renderPeriodicReload()}
            </div>
            <div style={styles.row}>
              {this.renderBankVerifiedOn()}
              {this.renderPeriodicReloadAmount()}
            </div>
            <div style={styles.row}>
              {this.renderValidationMethod()}
              {this.renderNextBillingDate()}
            </div>
            <div style={styles.row}>
              {this.renderAccountNo()}
              {this.renderAccountPlan()}
            </div>
            <div style={styles.row}>
              {this.renderRoutingNo()}
              {this.renderBillableUnits()}
            </div>
            <div style={styles.row}>{this.renderPseudoAccountNo()}</div>
          </Card>
        </form>
        {this.renderConfirmDialog()}
      </div>
    );
  }

  renderViewLoads() {
    return <FlatButton label="Loads" onClick={this.goToLoads} style={styles.button} />;
  }

  renderLowBalanceReload() {
    return <Field name="lowBalanceReload" label="Low balance reload" component={FormTextField} disabled />;
  }

  renderBankLinked() {
    return <Field name="bankLinked" label="Bank Linked" component={FormTextField} disabled />;
  }

  renderLowBalanceAmount() {
    return <Field name="lowBalanceAmount" label="Low balance amount" component={FormTextField} disabled />;
  }

  renderBankAddedOn() {
    return <Field name="bankedAddedOn" label="Bank added on" component={FormDatePicker} disabled />;
  }

  renderBankVerifiedOn() {
    // show only if verified/active
    const { formValues } = this.props;
    if (!formValues || formValues.toJS().status !== 'ACTIVE') {
      return;
    }
    return <Field name="bankVerifiedOn" label="Bank verified on" component={FormDatePicker} disabled />;
  }

  renderPeriodicReload() {
    return <Field name="periodicReload" label="Periodic reload" component={FormTextField} disabled />;
  }

  renderValidationMethod() {
    return <Field name="validationMethod" label="Validation Method" component={FormTextField} disabled />;
  }

  renderPeriodicReloadAmount() {
    return <Field name="periodicReloadAmount" label="Periodic reload amount" component={FormTextField} disabled />;
  }

  renderAccountNo() {
    return <Field name="accountNo" label="Account no" component={FormTextField} disabled />;
  }

  renderNextBillingDate() {
    return (
      <Field
        name="nextBillingDate"
        label="Next billing date"
        component={FormDatePicker}
        disabled={this.state.disabled}
      />
    );
  }

  renderRoutingNo() {
    return <Field name="routingNo" label="Routing no" component={FormTextField} disabled />;
  }

  renderAccountPlan() {
    return (
      <Field name="accountPlan" label="Account plan" options={ACCOUNT_PLAN} component={FormSelectField} disabled />
    );
  }

  renderBillableUnits() {
    return <Field name="billableUnits" label="Billable units" component={FormTextField} disabled />;
  }

  renderPseudoAccountNo() {
    return <Field name="pseudoAccountNo" label="Pseudo account no" component={FormTextField} disabled />;
  }
}

BankingSubscriptionPlan.propTypes = {
  bankingInfo: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  subscriptionInfo: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  initialize: PropTypes.func,
  update: PropTypes.func.isRequired,
  formValues: PropTypes.object,
  handleSubmit: PropTypes.func,
};

BankingSubscriptionPlan.contextTypes = {
  router: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  formValues: makeSelectFormFields('BankingSubscriptionPlan'),
});

export default connect(mapStateToProps)(
  reduxForm({
    form: 'BankingSubscriptionPlan',
    validate,
  })(withRouter(BankingSubscriptionPlan))
);
