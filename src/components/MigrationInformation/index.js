import React from 'react';
import PropTypes from 'prop-types';
import AppBar from 'material-ui/AppBar';
import { Card } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import { Field, reduxForm } from 'redux-form/immutable';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { toDate } from 'utils/helpers';

import FormTextField from 'components/Form/FormTextField';
import FormDatePicker from 'components/Form/FormDatePicker';

import { makeSelectFormFields } from 'containers/App/selectors';

const styles = {
  row: {
    display: 'flex',
  },
  button: {
    height: 'auto',
    width: '100%',
  },
};

class BusinessMigrationInformation extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      disabled: true,
      open: false,
    };
  }

  componentDidMount() {
    this.handleInitialization(this.props.businessMigrationInfo);
  }

  componentDidUpdate(prevProps) {
    const businessMigrationInfo = { ...this.props.businessMigrationInfo };
    const oldBusinessMigrationInfo = { ...prevProps.businessMigrationInfo };
    let shouldInitialize = false;
    if (businessMigrationInfo.status !== oldBusinessMigrationInfo.status) {
      shouldInitialize = true;
    }
    if (businessMigrationInfo.newBusinessId !== oldBusinessMigrationInfo.newBusinessId) {
      shouldInitialize = true;
    }
    if (businessMigrationInfo.oldBusinessId !== oldBusinessMigrationInfo.oldBusinessId) {
      shouldInitialize = true;
    }
    if (businessMigrationInfo.businessMigrationMappingId !== oldBusinessMigrationInfo.businessMigrationMappingId) {
      shouldInitialize = true;
    }
    if (businessMigrationInfo.optinInitiatedBy !== oldBusinessMigrationInfo.optinInitiatedBy) {
      shouldInitialize = true;
    }
    if (businessMigrationInfo.optinOccurred !== oldBusinessMigrationInfo.optinOccurred) {
      shouldInitialize = true;
    }
    if (businessMigrationInfo.cutoverInitiatedBy !== oldBusinessMigrationInfo.cutoverInitiatedBy) {
      shouldInitialize = true;
    }
    if (businessMigrationInfo.cutoverOccurred !== oldBusinessMigrationInfo.cutoverOccurred) {
      shouldInitialize = true;
    }
    if (shouldInitialize) {
      this.handleInitialization(this.props.businessMigrationInfo);
    }
  }

  handleInitialization = (businessMigrationInfo) => {
    const status = businessMigrationInfo.status == null ? 'MIGRATION NOT STARTED' : businessMigrationInfo.status;
    const newBusinessId =
      businessMigrationInfo.newBusiness == null ? null : businessMigrationInfo.newBusiness.businessId;
    const oldBusinessId =
      businessMigrationInfo.oldBusiness == null ? null : businessMigrationInfo.oldBusiness.businessId;
    const businessMigrationMappingId =
      businessMigrationInfo.businessMigrationMappingId == null
        ? null
        : businessMigrationInfo.businessMigrationMappingId;
    const optinInitiatedBy =
      businessMigrationInfo.optinInitiatedBy == null ? null : businessMigrationInfo.optinInitiatedBy.userId;
    const optinOccurred =
      businessMigrationInfo.optinOccurred == null ? null : toDate(businessMigrationInfo.optinOccurred);
    const cutoverInitiatedBy =
      businessMigrationInfo.cutoverInitiatedBy == null ? null : businessMigrationInfo.cutoverInitiatedBy.userId;
    const cutoverOccurred =
      businessMigrationInfo.cutoverOccurred == null ? null : toDate(businessMigrationInfo.cutoverOccurred);
    this.props.initialize({
      status,
      newBusinessId,
      oldBusinessId,
      businessMigrationMappingId,
      optinInitiatedBy,
      optinOccurred,
      cutoverInitiatedBy,
      cutoverOccurred,
    });
  };

  goToAssociatedBusiness = () => {
    const { businessMigrationInfo } = this.props;
    const newOwnerId = this.props.newBusinessUsers[0].userId;

    if (this.props.isOldBusiness) {
      this.context.router.push(`/businesses/${businessMigrationInfo.newBusiness.businessId}/users/${newOwnerId}`);
    } else {
      this.context.router.push(
        `/businesses/${businessMigrationInfo.oldBusiness.businessId}/users/${
        businessMigrationInfo.optinInitiatedBy.userId
        }`
      );
    }
    window.location.reload();
  };

  render() {
    return (
      <div>
        <form>
          <AppBar title="Migration Information" showMenuIconButton={false} />
          <Card>
            <div style={styles.row}>{this.renderAssociatedBusiness()}</div>
            <br />
            {this.props.isOldBusiness && (
              <div>
                <div style={styles.row}>{this.renderStatus()}</div>
                <div style={styles.row}>
                  {this.renderOptinInitiatedBy()}
                  {this.renderOptinOccurred()}
                </div>
                <div style={styles.row}>
                  {this.renderCutoverInitiatedBy()}
                  {this.renderCutoverOccurred()}
                </div>
              </div>
            )}
          </Card>
        </form>
      </div>
    );
  }

  renderAssociatedBusiness = () => (
    <FlatButton
      onClick={this.goToAssociatedBusiness}
      style={styles.button}
      label={this.props.isOldBusiness ? 'Go to New Business' : 'Go to Old Business'}
    />
  );

  renderStatus = () => <Field name="status" label="Migration Status" component={FormTextField} disabled />;

  renderOptinInitiatedBy = () => (
    <Field name="optinInitiatedBy" label="Opt-in Initiated By User Id" component={FormTextField} disabled />
  );

  renderOptinOccurred = () => <Field name="optinOccurred" label="Opt-in Date" component={FormDatePicker} disabled />;

  renderCutoverInitiatedBy = () => (
    <Field name="cutoverInitiatedBy" label="Cutover Initiated By User Id" component={FormTextField} disabled />
  );

  renderCutoverOccurred = () => (
    <Field name="cutoverOccurred" label="Cutover Date" component={FormDatePicker} disabled />
  );
}

BusinessMigrationInformation.propTypes = {
  businessMigrationInfo: PropTypes.object,
  initialize: PropTypes.func.isRequired,
  isOldBusiness: PropTypes.bool.isRequired,
  newBusinessUsers: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};

BusinessMigrationInformation.contextTypes = {
  router: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  formValues: makeSelectFormFields('BusinessMigrationInformation'),
});

export default connect(mapStateToProps)(
  reduxForm({
    form: 'BusinessMigrationInformation',
  })(BusinessMigrationInformation)
);
