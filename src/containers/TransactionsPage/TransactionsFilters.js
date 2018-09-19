import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { reduxForm, Field } from 'redux-form/immutable';
import { GridList } from 'material-ui/GridList';
import { Card } from 'material-ui/Card';

import Filters from 'components/Filters';
import FormTextField from 'components/Form/FormTextField';
import FormSelectField from 'components/Form/FormSelectField';
import FormDatePicker from 'components/Form/FormDatePicker';
import { loadTransactions } from './actions';
import { makeSelectFilters } from './selectors';

import { TRANSACTION_STATUS, MCC_CATEGORY, TRANSACTION_TYPES } from './constants';

const styles = {
  gridDefault: {
    padding: '0px 16px',
    fontSize: '14px',
    color: 'rgb(14, 53, 81)',
  },
};

class TransactionsFilters extends React.PureComponent {
  // eslint-disable-line react/prefer-stateless-function

  constructor() {
    super();
    this.onFiltersSubmit = this.onFiltersSubmit.bind(this);
  }

  onFiltersSubmit(values) {
    const { dispatchLoadTransactions } = this.props;
    dispatchLoadTransactions(values.toJS());
  }

  render() {
    return (
      <Card>
        {this.renderSearchFields()}
        <Filters onSubmit={this.onFiltersSubmit} simpleSearch {...this.props} />
      </Card>
    );
  }

  renderSearchFields() {
    return (
      <div style={styles.gridDefault}>
        <GridList cellHeight={75} cols={5} rows={3}>
          {this.renderBusinessName()}
          {this.renderLegalBusinessName()}
          {this.renderBusinessID()}
          {this.renderNameOnCard()}
          {this.renderMerchantName()}
          {this.renderFirstName()}
          {this.renderLastName()}
          {this.renderUserID()}
          {this.renderMCC()}
          {this.renderTransactionStatus()}
          {this.renderMCCCategory()}
          {this.renderTransactionID()}
          {this.renderStartDate()}
          {this.renderEndDate()}
          {this.renderTransactionTypes()}
          {this.renderCardLastFour()}
        </GridList>
      </div>
    );
  }

  renderBusinessName() {
    return <Field autoFocus name="businessName" label="Business name" component={FormTextField} />;
  }

  renderLegalBusinessName() {
    return <Field name="legalBusinessName" label="Legal business name" component={FormTextField} />;
  }

  renderBusinessID() {
    return <Field name="businessId" label="Business ID" component={FormTextField} />;
  }

  renderNameOnCard() {
    return <Field name="nameOnCard" label="Name on card" component={FormTextField} />;
  }

  renderMerchantName() {
    return <Field name="merchantName" label="Merchant name" component={FormTextField} />;
  }

  renderFirstName() {
    return <Field name="firstName" label="First name" component={FormTextField} />;
  }

  renderLastName() {
    return <Field name="lastName" label="Last name" component={FormTextField} />;
  }

  renderUserID() {
    return <Field name="userId" label="User ID" component={FormTextField} />;
  }

  renderMCC() {
    return <Field name="mcc" label="MCC" component={FormTextField} />;
  }

  renderTransactionStatus() {
    return <Field name="status" label="Transaction status" options={TRANSACTION_STATUS} component={FormSelectField} />;
  }

  renderMCCCategory() {
    return (
      <Field name="mccCategory" label="MCC Category" options={MCC_CATEGORY} multiple component={FormSelectField} />
    );
  }

  renderTransactionID() {
    return <Field name="transactionId" label="Transaction ID" component={FormTextField} />;
  }

  renderStartDate() {
    return <Field name="startDate" label="Start Date" component={FormDatePicker} />;
  }

  renderEndDate() {
    return <Field name="endDate" label="End Date" component={FormDatePicker} />;
  }

  renderTransactionTypes() {
    return (
      <Field
        name="transactionType"
        label="Transaction type"
        options={TRANSACTION_TYPES}
        multiple
        component={FormSelectField}
      />
    );
  }

  renderCardLastFour() {
    return <Field name="lastFour" label="Card last 4" component={FormTextField} />;
  }
}

TransactionsFilters.propTypes = {
  dispatchLoadTransactions: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  filters: makeSelectFilters(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatchLoadTransactions: (filters) => {
      dispatch(loadTransactions(1, filters));
    },
  };
}

// Wrap the component to inject dispatch and state into it
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  reduxForm({
    form: 'TransactionsFiltersForm',
  })(TransactionsFilters)
);
