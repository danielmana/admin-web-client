import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { withRouter } from 'react-router-dom';
import { fromJS } from 'immutable';
import { reduxForm, Field } from 'redux-form/immutable';
import Paper from 'material-ui/Paper';
import { GridList } from 'material-ui/GridList';
import { Card, CardText } from 'material-ui/Card';
import isEmpty from 'lodash/isEmpty';

import { ContentWrapper } from 'containers/App/index';
import Filters from 'components/Filters';
import FormTextField from 'components/Form/FormTextField';
import FormSelectField from 'components/Form/FormSelectField';
import FormDatePicker from 'components/Form/FormDatePicker';
import FormFieldBusinessStatus from 'components/Form/FormFieldBusinessStatus';
import EnhancedTable from 'components/EnhancedTable';
import Pagination from 'components/Pagination';
import PageField from 'components/PageField';
import { loadEnrollments } from './actions';
import { makeSelectLoading, makeSelectEnrollment, makeSelectFilters } from './selectors';

import { DEFAULT_PAGE_SIZE, CLASSIFICATION, PROGRAM } from './constants';

const columnData = [
  { id: 'enrollmentId', label: 'Enrollment ID' },
  { id: 'nameOnCard', label: 'Business Name' },
  { id: 'businessName', label: 'Legal Business Name' },
  { id: 'firstName', label: 'First Name' },
  { id: 'lastName', label: 'Last Name' },
  { id: 'date', label: 'Sign up date' },
  { id: 'city', label: 'City' },
  { id: 'state', label: 'State' },
  { id: 'phone', label: 'Business Owner Phone No' },
  { id: 'program', label: 'Program' },
  { id: 'status', label: 'Enrollment Status' },
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
    width: 134,
    marginLeft: 5,
  },
  pageSelect: {
    width: 120,
    margin: '0 10px',
    verticalAlign: 'bottom',
  },
};

export class EnrollmentPage extends React.PureComponent {
  // eslint-disable-line react/prefer-stateless-function

  constructor() {
    super();
    this.onFiltersSubmit = this.onFiltersSubmit.bind(this);
    this.handleUserDetailClick = this.handleUserDetailClick.bind(this);
    this.state = {
      page: 1,
    };
  }

  componentDidMount() {
    const {
      dispatchLoadEnrollments,
      filters,
      location: { query },
    } = this.props;
    if (isEmpty(query)) {
      dispatchLoadEnrollments(filters);
    } else {
      dispatchLoadEnrollments(fromJS(query));
    }
  }

  onFiltersSubmit(values) {
    const { dispatchLoadEnrollments } = this.props;
    dispatchLoadEnrollments(values);
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

  renderFilters() {
    return (
      <div>
        {this.renderSearchFields()}
        <Filters onSubmit={this.onFiltersSubmit} simpleSearch {...this.props} />
      </div>
    );
  }

  renderSearchFields() {
    return (
      <div style={styles.gridDefault}>
        <GridList cellHeight={75} cols={5} rows={3}>
          {this.renderBusinessName()}
          {this.renderLegalBusinessName()}
          {this.renderBusinessID()}
          {this.renderUserEmail()}
          {this.renderSignUpDate()}
          {this.renderFirstName()}
          {this.renderLastName()}
          {this.renderEnrollmentStatus()}
          {this.renderPhoneNumber()}
          {this.renderClassification()}
          {this.renderProgram()}
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

  renderUserEmail() {
    return <Field name="userEmail" label="User email" component={FormTextField} />;
  }

  renderSignUpDate() {
    return <Field name="signUpDate" label="Sign up Date" component={FormDatePicker} />;
  }

  renderFirstName() {
    return <Field name="firstName" label="First name" component={FormTextField} />;
  }

  renderLastName() {
    return <Field name="lastName" label="Last name" component={FormTextField} />;
  }

  renderEnrollmentStatus() {
    return <FormFieldBusinessStatus name="enrollmentStatus" label="Enrollment status" />;
  }

  renderPhoneNumber() {
    return <Field name="phoneNumber" label="Phone number" component={FormTextField} />;
  }

  renderClassification() {
    return <Field name="classification" label="Classification" options={CLASSIFICATION} component={FormSelectField} />;
  }

  renderProgram() {
    return <Field name="program" label="Program" options={PROGRAM} component={FormSelectField} />;
  }

  handleUserDetailClick(item) {
    const { history } = this.props;
    history.push(`/enrollment/${item.enrollmentId}`);
  }

  renderTable() {
    const { loading, enrollments } = this.props;
    if (enrollments !== null && enrollments.count !== 0) {
      return (
        <Paper zDepth={1}>
          <EnhancedTable
            loading={loading}
            data={enrollments.results}
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
  }

  renderPagination() {
    const { enrollments } = this.props;
    if (enrollments != null && enrollments.count !== 0) {
      return (
        <div>
          <PageField data={enrollments} pageSize={DEFAULT_PAGE_SIZE} />
          <Pagination onSubmit={this.onFiltersSubmit} {...this.props} />
        </div>
      );
    }
  }
}

EnrollmentPage.propTypes = {
  dispatchLoadEnrollments: PropTypes.func.isRequired,
  enrollments: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  loading: PropTypes.bool,
  location: PropTypes.object,
  filters: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
};

EnrollmentPage.contextTypes = {
  router: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  loading: makeSelectLoading(),
  enrollments: makeSelectEnrollment(),
  filters: makeSelectFilters(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatchLoadEnrollments: (filters) => {
      dispatch(loadEnrollments(filters));
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  reduxForm({
    form: 'EnrollmentPage',
  })(withRouter(EnrollmentPage))
);
