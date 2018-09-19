import React from 'react';
import PropTypes from 'prop-types';
import AppBar from 'material-ui/AppBar';
import { Card } from 'material-ui/Card';
import { Field, reduxForm } from 'redux-form/immutable';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import filter from 'lodash/filter';
import head from 'lodash/head';
import last from 'lodash/last';
import split from 'lodash/split';
import reduce from 'lodash/map';

import ActionButtons from 'components/ActionButtons';
import FormTextField from 'components/Form/FormTextField';
import FormSelectField from 'components/Form/FormSelectField';
import DialogConfirm from 'components/Dialogs/DialogConfirm';
import FormFieldBusinessStatus from 'components/Form/FormFieldBusinessStatus';

import { createValidator, minLength, maxLength } from 'utils/validation';
import { toMoney } from 'utils/helpers';

import { makeSelectFormFields } from 'containers/App/selectors';
import { STATES } from 'containers/UserPage/constants';
import { EMPLOYEES, BUSINESS_STRUCTURE, MAJOR_MINOR_INDUSTRY, INDUSTRY_SPLIT_SIGN, PROGRAM } from './constants';

const styles = {
  row: {
    display: 'flex',
  },
};

const validate = createValidator({
  companyName: [minLength(3), maxLength(60)],
  phoneNumber: maxLength(10),
  businessNameOnCard: maxLength(21),
  promoCode: maxLength(30),
});

class BusinessInformation extends React.PureComponent {
  constructor(props) {
    super(props);
    this.handleEditableState = this.handleEditableState.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onDialogCancel = this.onDialogCancel.bind(this);
    this.handleMajorIndustryChange = this.handleMajorIndustryChange.bind(this);
    this.minorIndustry = [];
    this.state = {
      disabled: true,
      open: false,
    };
  }

  componentDidMount() {
    const { businessInfo } = this.props;
    this.handleInitialization(businessInfo);
  }

  handleInitialization(businessInfo) {
    this.props.initialize({
      ...businessInfo,
      businessID: businessInfo.businessId,
      businessStatus: businessInfo.status,
      businessOwner: `${businessInfo.ownerFirstName} ${businessInfo.ownerLastName}`,
      businessNameOnCard: businessInfo.nameOnCard,
      addressOne: businessInfo.addresses[0].street,
      addressTwo: businessInfo.addresses[0].addressAdditionals,
      city: businessInfo.addresses[0].city,
      state: businessInfo.addresses[0].state,
      zip: businessInfo.addresses[0].zipCode,
      addressType: businessInfo.addresses[0].addressType,
      phoneNumber: businessInfo.phone,
      majorIndustry: head(split(businessInfo.industry, INDUSTRY_SPLIT_SIGN)),
      ein: businessInfo.taxId,
      minorIndustry: last(split(businessInfo.industry, INDUSTRY_SPLIT_SIGN)),
      employees: isNaN(businessInfo.additionalInfo.employeeQty) ? 'N/A' : businessInfo.additionalInfo.employeeQty,
      timezone: businessInfo.timeZone ? businessInfo.timeZone : 'N/A',
      accountBalance: isNaN(businessInfo.balance) ? 'N/A' : toMoney(businessInfo.balance),
      promoCode: businessInfo.additionalInfo.promoCode,
      brand: businessInfo.brand,
      program: businessInfo.program,
      accountNumber: businessInfo.accountNumber,
    });
    this.handleMajorIndustryChange(
      head(split(businessInfo.industry, INDUSTRY_SPLIT_SIGN))
    ); /* call to update minor industry according to major industry */
  }

  handleEditableState() {
    this.setState({ disabled: !this.state.disabled });
  }

  handleMajorIndustryChange(value) {
    let id = '';
    reduce(value, (val, key) => {
      if (key !== 'preventDefault') {
        id += val;
      }
    });
    if (id && id !== 'undefined') {
      this.minorIndustry = head(filter(MAJOR_MINOR_INDUSTRY, { id })).subcategories; // it says we have need to have space after {}, but same time we cant have space in ()
    }
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

  render() {
    const { handleSubmit } = this.props;
    return (
      <div>
        <form onSubmit={handleSubmit(this.handleSubmit)}>
          <AppBar
            title="Business Information"
            showMenuIconButton={false}
            iconElementRight={this.renderActionButtons()}
          />
          <Card style={{ paddingBottom: 20 }}>
            <div style={styles.row}>
              {this.renderBusinessId()}
              {this.renderBusinessApprovalStatus()}
              {this.renderBusinessStatus()}
            </div>
            <div style={styles.row}>
              {this.renderBusinessName()}
              {this.renderBusinessOwner()}
            </div>
            <div style={styles.row}>
              {this.renderBusinessNameOnCard()}
              {this.renderOwnerSSN()}
            </div>
            <div style={styles.row}>
              {this.renderBusinessStructure()}
              {this.renderAddressOne()}
            </div>
            <div style={styles.row}>
              {this.renderAddressTwo()}
              {this.renderCity()}
            </div>
            <div style={styles.row}>
              {this.renderState()}
              {this.renderZip()}
            </div>
            <div style={styles.row}>
              {this.renderPhoneNumber()}
              {this.renderMajorIndustry()}
            </div>
            <div style={styles.row}>
              {this.renderEIN()}
              {this.renderMinorIndustry()}
            </div>
            <div style={styles.row}>
              {this.renderEmployees()}
              {this.renderTimeZone()}
            </div>
            <div style={styles.row}>
              {this.renderAccountBalance()}
              {this.renderPromoCode()}
            </div>
            <div style={styles.row}>
              {this.renderProgram()}
              {this.props.renderEnrollment && this.renderEnrollmentEmail()}
            </div>
            <div style={styles.row}>{this.renderAccountNumber()}</div>
          </Card>
        </form>
        {this.renderConfirmDialog()}
      </div>
    );
  }

  renderBusinessId() {
    return <Field name="businessID" label="Business Id" component={FormTextField} disabled />;
  }

  renderBusinessApprovalStatus() {
    return <Field name="approvalStatus" label="Approval Status" component={FormTextField} disabled />;
  }

  renderBusinessStatus() {
    const { formValues } = this.props;
    return (
      <FormFieldBusinessStatus value={formValues && formValues.toJS().businessStatus} disabled={this.state.disabled} />
    );
  }

  renderBusinessName() {
    return <Field name="companyName" label="Business name" component={FormTextField} disabled={this.state.disabled} />;
  }

  renderBusinessOwner() {
    return <Field name="businessOwner" label="Business owner" component={FormTextField} disabled />;
  }

  renderBusinessNameOnCard() {
    return (
      <Field
        name="businessNameOnCard"
        label="Business name on card"
        component={FormTextField}
        disabled={this.state.disabled}
      />
    );
  }

  renderOwnerSSN() {
    return <Field name="ownerSSN" label="Owner SSN" component={FormTextField} disabled={this.state.disabled} />;
  }

  renderBusinessStructure() {
    return (
      <Field
        name="businessStructure"
        label="Business Structure"
        options={BUSINESS_STRUCTURE}
        component={FormSelectField}
        disabled={this.state.disabled}
      />
    );
  }

  renderAddressOne() {
    return <Field name="addressOne" label="Address 1" component={FormTextField} disabled={this.state.disabled} />;
  }

  renderAddressTwo() {
    return <Field name="addressTwo" label="Address 2" component={FormTextField} disabled={this.state.disabled} />;
  }

  renderCity() {
    return <Field name="city" label="City" component={FormTextField} disabled={this.state.disabled} />;
  }

  renderState() {
    return (
      <Field name="state" label="State" options={STATES} component={FormSelectField} disabled={this.state.disabled} />
    );
  }

  renderZip() {
    return <Field name="zip" label="Zip" component={FormTextField} disabled={this.state.disabled} />;
  }

  renderPhoneNumber() {
    return <Field name="phoneNumber" label="Phone Number" component={FormTextField} disabled={this.state.disabled} />;
  }

  renderMajorIndustry() {
    return (
      <Field
        name="majorIndustry"
        label="Major industry"
        options={MAJOR_MINOR_INDUSTRY}
        component={FormSelectField}
        onChange={this.handleMajorIndustryChange}
        disabled={this.state.disabled}
      />
    );
  }

  renderEIN() {
    return <Field name="ein" label="EIN" component={FormTextField} disabled={this.state.disabled} />;
  }

  renderMinorIndustry() {
    return (
      <Field
        name="minorIndustry"
        label="Minor industry"
        options={this.minorIndustry}
        component={FormSelectField}
        disabled={this.state.disabled}
      />
    );
  }

  renderEmployees() {
    return (
      <Field
        name="employees"
        label="Employees"
        options={EMPLOYEES}
        component={FormSelectField}
        disabled={this.state.disabled}
      />
    );
  }

  renderTimeZone() {
    return <Field name="timezone" label="Time Zone" component={FormTextField} disabled />;
  }

  renderAccountBalance() {
    return <Field name="accountBalance" label="Account Balance" component={FormTextField} disabled />;
  }

  renderPromoCode() {
    return <Field name="promoCode" label="Promo Code" component={FormTextField} disabled={this.state.disabled} />;
  }

  renderProgram() {
    return <Field name="program" label="Program" options={PROGRAM} component={FormSelectField} disabled />;
  }

  renderEnrollmentEmail() {
    return <Field name="email" label="Enrollment Email" component={FormTextField} disabled />;
  }

  renderAccountNumber() {
    return <Field name="accountNumber" label="Account Number" component={FormTextField} disabled />;
  }
}

BusinessInformation.propTypes = {
  businessInfo: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  initialize: PropTypes.func,
  update: PropTypes.func.isRequired,
  formValues: PropTypes.object,
  handleSubmit: PropTypes.func,
  renderEnrollment: PropTypes.bool,
};

BusinessInformation.defaultProps = {
  renderEnrollment: false,
};

const mapStateToProps = createStructuredSelector({
  formValues: makeSelectFormFields('BusinessInformation'),
});

export default connect(mapStateToProps)(
  reduxForm({
    form: 'BusinessInformation',
    validate,
  })(BusinessInformation)
);
