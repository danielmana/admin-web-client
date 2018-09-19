import React from 'react';
import PropTypes from 'prop-types';
import RaisedButton from 'material-ui/RaisedButton';

const Pagination = (props) => {
  const { handleSubmit, onSubmit, pristine, submitting } = props;
  return (
    <form onSubmit={handleSubmit((values) => onSubmit(values))}>
      <RaisedButton type="submit" label="Change page" disabled={pristine || submitting} secondary />
    </form>
  );
};

Pagination.propTypes = {
  pristine: PropTypes.bool,
  submitting: PropTypes.bool,
  handleSubmit: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default Pagination;
