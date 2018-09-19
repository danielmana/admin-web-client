import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { reduxForm, Field } from 'redux-form/immutable';
import Paper from 'material-ui/Paper';
import { GridList } from 'material-ui/GridList';
import { Card, CardText } from 'material-ui/Card';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { ContentWrapper } from 'containers/App/index';
import Filters from 'components/Filters';
import FormTextField from 'components/Form/FormTextField';
import FormSelectField from 'components/Form/FormSelectField';
import FormDatePicker from 'components/Form/FormDatePicker';
import FormFieldBusinessStatus from 'components/Form/FormFieldBusinessStatus';
import EnhancedTable from 'components/EnhancedTable';
import Pagination from 'components/Pagination';
import PageField from 'components/PageField';

import { loadUsers } from './actions';
import { makeSelectLoading, makeSelectUsers, makeSelectFilters } from './selectors';
import reducer from './reducer';
import saga from './saga';

import { ROLES, PROGRAM, SUBSCRIPTION_PLAN, CLASSIFICATION, STATES, DEFAULT_PAGE_SIZE } from './constants';

const columnData = [
  { id: 'businessId', label: 'Business ID' },
  { id: 'businessName', label: 'Business Name' },
  { id: 'firstName', label: 'First Name' },
  { id: 'lastName', label: 'Last Name' },
  { id: 'role', label: 'Role' },
  { id: 'city', label: 'City' },
  { id: 'state', label: 'State' },
  { id: 'phone', label: 'Phone' },
  { id: 'status', label: 'Status' },
];

const styles = {
  gridStyles: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  gridDefault: {
    padding: '0px 16px',
    fontSize: '14px',
    color: 'rgb(14, 53, 81)',
  },
  gridList: {
    display: 'flex',
    flexWrap: 'nowrap',
    overflowX: 'auto',
  },
  actions: {
    paddingLeft: 16,
    paddingBottom: 32,
  },
  pagination: {
    width: '134px',
    marginLeft: 5,
  },
  pageSelect: {
    width: 120,
    margin: '0 10px',
    verticalAlign: 'bottom',
  },
};

class UsersPage extends React.PureComponent {
  constructor() {
    super();
    this.onFiltersSubmit = this.onFiltersSubmit.bind(this);
    this.handleUserDetailClick = this.handleUserDetailClick.bind(this);
    this.state = {
      page: 1,
    };
  }

  componentDidMount() {
    const { dispatchLoadUsers, filters } = this.props;
    dispatchLoadUsers(filters);
  }

  onFiltersSubmit(values) {
    const { dispatchLoadUsers } = this.props;
    dispatchLoadUsers(values);
  }

  render() {
    return (
      <ContentWrapper>
        <Card>{this.renderFilters()}</Card>
        {this.renderTable()}
        <div style={styles.pagination}>{this.renderPagination()}</div>
      </ContentWrapper>
    );
  }

  renderFilters = () => (
    <div>
      {this.renderDefaultContent()}
      <Filters onSubmit={this.onFiltersSubmit} {...this.props}>
        {this.renderFiltersContent()}
      </Filters>
    </div>
  );

  renderDefaultContent = () => (
    <div style={styles.gridDefault}>
      <GridList cellHeight={75} cols={5} rows={2}>
        {this.renderBusinessName()}
        {this.renderLegalBusinessName()}
        {this.renderBusinessID()}
        {this.renderUserEmail()}
        {this.renderRole()}
        {this.renderFirstName()}
        {this.renderLastName()}
        {this.renderEnrollmentStatus()}
        {this.renderSignUpDate()}
        {this.renderSubscriptionPlan()}
      </GridList>
    </div>
  );

  renderFiltersContent = () => (
    <div style={styles.gridStyles}>
      <GridList cellHeight={75} cols={5} rows={4}>
        {this.renderBusinessAddressOne()}
        {this.renderBusinessAddressTwo()}
        {this.renderBusinessAddressCity()}
        {this.renderBusinessAddressState()}
        {this.renderBusinessAddressZIP()}

        {this.renderShippingAddressOne()}
        {this.renderShippingAddressTwo()}
        {this.renderShippingAddressCity()}
        {this.renderShippingAddressState()}
        {this.renderShippingAddressZIP()}

        {this.renderPhoneNumber()}
        {this.renderCardNumber()}
        {this.renderAccountNumber()}
        {this.renderAccountCreationDate()}

        {this.renderProgram()}
        {this.renderClassification()}
      </GridList>
    </div>
  );

  renderBusinessName = () => <Field autoFocus name="businessName" label="Business name" component={FormTextField} />;

  renderLegalBusinessName = () => (
    <Field name="legalBusinessName" label="Legal business name" component={FormTextField} />
  );

  renderBusinessID = () => <Field name="businessId" label="Business ID" component={FormTextField} />;

  renderUserEmail = () => <Field name="userEmail" label="User email" component={FormTextField} />;

  renderRole = () => <Field name="userRole" label="Role" options={ROLES} component={FormSelectField} />;

  renderFirstName = () => <Field name="firstName" label="First name" component={FormTextField} />;

  renderLastName = () => <Field name="lastName" label="Last name" component={FormTextField} />;

  renderEnrollmentStatus = () => <FormFieldBusinessStatus name="enrollmentStatus" label="Enrollment status" />;

  renderSignUpDate = () => <Field name="signUpDate" label="Sign up Date" component={FormDatePicker} />;

  renderBusinessAddressOne = () => (
    <Field name="businessAddress1" label="Business address 1" component={FormTextField} />
  );

  renderBusinessAddressTwo = () => (
    <Field name="businessAddress2" label="Business address 2" component={FormTextField} />
  );

  renderBusinessAddressCity = () => (
    <Field name="businessAddressCity" label="Business address city" component={FormTextField} />
  );

  renderBusinessAddressState = () => (
    <Field name="businessAddressState" label="Business address State" options={STATES} component={FormSelectField} />
  );

  renderBusinessAddressZIP = () => (
    <Field name="businessAddressZip" label="Business address ZIP" component={FormTextField} />
  );

  renderShippingAddressOne = () => (
    <Field name="shippingAddress1" label="Shipping address 1" component={FormTextField} />
  );

  renderShippingAddressTwo = () => (
    <Field name="shippingAddress2" label="Shipping address 2" component={FormTextField} />
  );

  renderShippingAddressCity = () => (
    <Field name="shippingAddressCity" label="Shipping address city" component={FormTextField} />
  );

  renderShippingAddressState = () => (
    <Field name="shippingAddressState" label="Shipping address State" options={STATES} component={FormSelectField} />
  );

  renderShippingAddressZIP = () => (
    <Field name="shippingAddressZip" label="Shipping address ZIP" component={FormTextField} />
  );

  renderPhoneNumber = () => <Field name="phoneNumber" label="Phone number" component={FormTextField} />;

  renderCardNumber = () => <Field name="cardLast4" label="Card last 4" maxLength={4} component={FormTextField} />;

  renderAccountNumber = () => <Field name="acLast4" label="A/C last 4" maxLength={4} component={FormTextField} />;

  renderAccountCreationDate = () => (
    <Field name="acCreationDate" label="A/C creation date" component={FormDatePicker} />
  );

  renderProgram = () => <Field name="program" label="Program" options={PROGRAM} component={FormSelectField} />;

  renderSubscriptionPlan = () => (
    <Field name="subscriptionPlan" label="Subscription plan" options={SUBSCRIPTION_PLAN} component={FormSelectField} />
  );

  renderClassification = () => (
    <Field name="classification" label="Classification" options={CLASSIFICATION} component={FormSelectField} />
  );

  handleUserDetailClick = (item) => {
    const { history } = this.props;
    history.push(`businesses/${item.businessId}/users/${item.userId}`);
  };

  renderTable = () => {
    const { loading, users } = this.props;
    if (users !== null) {
      return (
        <Paper zDepth={1}>
          <EnhancedTable
            loading={loading}
            data={users.results}
            columnData={columnData}
            onClick={this.handleUserDetailClick}
          />
        </Paper>
      );
    }
    return (
      <Card>
        <CardText>No results</CardText>
      </Card>
    );
  };

  renderPagination = () => {
    const { users } = this.props;
    if (users !== null) {
      return (
        <div>
          <PageField data={users} pageSize={DEFAULT_PAGE_SIZE} />
          <Pagination onSubmit={this.onFiltersSubmit} {...this.props} />
        </div>
      );
    }
  };
}

UsersPage.propTypes = {
  dispatchLoadUsers: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  users: PropTypes.oneOfType([PropTypes.array, PropTypes.bool, PropTypes.object]),
  filters: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
};

UsersPage.contextTypes = {
  router: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  loading: makeSelectLoading(),
  users: makeSelectUsers(),
  filters: makeSelectFilters(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatchLoadUsers: (filters) => {
      dispatch(loadUsers(filters));
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withForm = reduxForm({
  form: 'UsersPage',
});

const withReducer = injectReducer({ key: 'usersPage', reducer });
const withSaga = injectSaga({ key: 'usersPage', saga });

export default compose(
  withReducer,
  withSaga,
  withForm,
  withConnect,
  withRouter,
)(UsersPage);
