import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { reduxForm } from 'redux-form/immutable';
import { Grid, Row, Col } from 'react-flexbox-grid';
import { createStructuredSelector } from 'reselect';

import { ContentWrapper } from 'containers/App/index';
import FlatButton from 'material-ui/FlatButton';
import CircularProgressCentered from 'components/CircularProgressCentered';
import BusinessInformation from 'components/BusinessInformation';
import CardShippingAddress from 'components/CardShippingAddress';
import OperationsDecision from 'components/OperationsDecision';
import IDVerification from 'components/IDVerification';
import Documents from 'components/Documents';

import head from 'lodash/head';
import last from 'lodash/last';

import { loadEnrollment, getDocument } from './actions';
import { updateBusinessInfo } from './BusinessInfo/actions';
import { updateCardShippingAddress } from './CardShippingAddress/actions';

import {
  makeSelectEnrollmentLoading,
  makeSelectEnrollment,
  makeSelectEnrollmentError,
  makeSelectEnrollmentDetails,
} from './selectors';

const styles = {
  gridContainer: {
    margin: 0,
  },
};

export class EnrollmentPageDetail extends React.PureComponent {
  constructor() {
    super();
    this.handleBackButton = this.handleBackButton.bind(this);
  }

  componentWillMount() {
    const { dispatchLoadEnrollment, routeParams } = this.props;
    dispatchLoadEnrollment(routeParams.id);
  }

  render() {
    const {
      loading,
      enrollment,
      enrollmentDetails,
      dispatchUpdateBusinessInfo,
      dispatchUpdateCardShippingAddress,
      dispatchGetDocument,
    } = this.props;

    if (loading) {
      return <CircularProgressCentered />;
    }
    if (enrollment && enrollmentDetails) {
      const businessInfo = {
        ownerFirstName: enrollment.firstName,
        ownerLastName: enrollment.lastName,
        ssnLast4Digits: enrollment.ssnLast4Digits,
        enrollmentId: enrollment.enrollmentId,
        businessId: enrollment.businessId,
        status: enrollment.operationsDecision.status,
        companyName: enrollment.companyName,
        nameOnCard: enrollment.nameOnCard,
        businessStructure: enrollment.businessStructure,
        addresses: [
          {
            street: enrollment.businessAddress.street,
            addressAdditionals: enrollment.businessAddress.addressAdditionals,
            city: enrollment.businessAddress.city,
            state: enrollment.businessAddress.state,
            zipCode: enrollment.businessAddress.zipCode,
            addressType: enrollment.businessAddress.addressType,
          },
          {
            street: enrollment.businessShippingAddress.street,
            addressAdditionals: enrollment.businessShippingAddress.addressAdditionals,
            city: enrollment.businessShippingAddress.city,
            state: enrollment.businessShippingAddress.state,
            zipCode: enrollment.businessShippingAddress.zipCode,
            addressType: enrollment.businessShippingAddress.addressType,
          },
        ],
        phone: enrollment.businessPhone,
        industry: enrollment.industry,
        additionalInfo: {
          employeeQty: enrollment.employeeQty,
        },
        taxId: enrollment.taxId,
        timeZone: '',
        email: enrollment.email,
      };

      const operationsDecision = {
        ...enrollment.operationsDecision,
      };

      const verification = {
        ...head(head(enrollmentDetails)),
      };

      const documents = {
        ...last(enrollmentDetails),
      };

      return (
        <ContentWrapper>
          <Grid fluid style={styles.gridContainer}>
            <Row>{this.renderBackButton()}</Row>
            <Row>
              <Col xs={12} md={6}>
                <BusinessInformation businessInfo={businessInfo} update={dispatchUpdateBusinessInfo} renderEnrollment />
                <br />
                <CardShippingAddress businessInfo={businessInfo} update={dispatchUpdateCardShippingAddress} />
              </Col>
              <Col xs={12} md={6}>
                <OperationsDecision operationsDecision={operationsDecision} />
                <br />
                <IDVerification verification={verification} />
                <br />
                <Documents documents={documents} businessID={enrollment.businessId} getDocument={dispatchGetDocument} />
              </Col>
            </Row>
          </Grid>
        </ContentWrapper>
      );
    }

    return <CircularProgressCentered />;
  }

  renderBackButton() {
    return <FlatButton label="Back to Enrollment" onClick={this.handleBackButton} />;
  }

  handleBackButton() {
    const { history } = this.props;
    history.push('/enrollments');
  }
}

EnrollmentPageDetail.propTypes = {
  dispatchLoadEnrollment: PropTypes.func.isRequired,
  dispatchUpdateBusinessInfo: PropTypes.func.isRequired,
  dispatchUpdateCardShippingAddress: PropTypes.func.isRequired,
  dispatchGetDocument: PropTypes.func.isRequired,
  routeParams: PropTypes.oneOfType([PropTypes.bool, PropTypes.array, PropTypes.object]),
  loading: PropTypes.bool,
  enrollment: PropTypes.oneOfType([PropTypes.bool, PropTypes.array, PropTypes.object]),
  enrollmentDetails: PropTypes.oneOfType([PropTypes.bool, PropTypes.array, PropTypes.object]),
};

EnrollmentPageDetail.contextTypes = {
  router: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  loading: makeSelectEnrollmentLoading(),
  enrollment: makeSelectEnrollment(),
  error: makeSelectEnrollmentError(),
  enrollmentDetails: makeSelectEnrollmentDetails(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatchLoadEnrollment: (id) => {
      dispatch(loadEnrollment(id));
    },
    dispatchUpdateBusinessInfo: (data) => {
      dispatch(updateBusinessInfo(data.toJS()));
    },
    dispatchUpdateCardShippingAddress: (data) => {
      dispatch(updateCardShippingAddress(data.toJS()));
    },
    dispatchGetDocument: (data) => {
      dispatch(getDocument(data));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(
  reduxForm({
    form: 'EnrollmentPageDetail',
  })(withRouter(EnrollmentPageDetail))
);
