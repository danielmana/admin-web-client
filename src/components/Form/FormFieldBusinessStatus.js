import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form/immutable';

import FormSelectField from 'components/Form/FormSelectField';

const OPTIONS = {
  ALL: ['NOT_APPROVED', 'REJECTED', 'APPROVED', 'SUSPENDED', 'CANCELED', 'CLOSED'],
  APPROVED: ['REJECTED', 'APPROVED', 'SUSPENDED', 'CANCELED'],
  NOT_APPROVED: ['NOT_APPROVED', 'REJECTED', 'APPROVED'],
  CANCELED: ['REJECTED', 'CANCELED'],
  REJECTED: ['REJECTED', 'CANCELED'],
  SUSPENDED: ['REJECTED', 'APPROVED', 'SUSPENDED', 'CANCELED'],
  CLOSED: ['CLOSED'],
};

// eslint-disable-next-line react/prefer-stateless-function
class FormFieldBusinessStatus extends React.PureComponent {
  render() {
    const { name, label, value, ...props } = this.props;
    const options = OPTIONS[value || 'ALL'];
    return (
      <Field
        name={name || 'businessStatus'}
        label={label || 'Business Status'}
        options={options}
        component={FormSelectField}
        {...props}
      />
    );
  }
}

FormFieldBusinessStatus.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.string,
};

export default FormFieldBusinessStatus;
