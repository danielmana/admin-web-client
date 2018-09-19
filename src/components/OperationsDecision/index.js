import React from 'react';
import PropTypes from 'prop-types';
import AppBar from 'material-ui/AppBar';
import { Card } from 'material-ui/Card';
import { millisecondsToDate } from 'utils/helpers';

import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';

const styles = {
  row: {
    display: 'flex',
  },
  item: {
    width: '100%',
    margin: '0 5px',
    verticalAlign: 'bottom',
  },
};

class OperationsDecision extends React.PureComponent {
  // eslint-disable-line react/prefer-stateless-function

  render() {
    const { operationsDecision } = this.props;
    return (
      <div>
        <AppBar title="Operations Decision" showMenuIconButton={false} />
        <Card>
          <div style={styles.row}>
            {this.renderBusinessStatus(operationsDecision.status)}
            {this.renderSignUpDate(millisecondsToDate(operationsDecision.signUpDate))}
          </div>
          <div style={styles.row}>
            {this.renderApprovedBy(operationsDecision.approvedBy)}
            {this.renderApprovalDate(millisecondsToDate(operationsDecision.approvalDate))}
          </div>
        </Card>
      </div>
    );
  }

  renderBusinessStatus(value) {
    return (
      <TextField name="status" value={value || ''} floatingLabelText="Business status" style={styles.item} disabled />
    );
  }

  renderSignUpDate(value) {
    return <DatePicker name="signUpDate" value={value} floatingLabelText="Sign Up Date" style={styles.item} disabled />;
  }

  renderApprovedBy(value) {
    return (
      <TextField name="approvedBy" value={value || ''} floatingLabelText="Approved by" style={styles.item} disabled />
    );
  }

  renderApprovalDate(value) {
    return (
      <DatePicker name="approvalDate" value={value} floatingLabelText="Approval date" style={styles.item} disabled />
    );
  }
}

OperationsDecision.propTypes = {
  operationsDecision: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};

export default OperationsDecision;
