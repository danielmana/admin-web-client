import React from 'react';
import PropTypes from 'prop-types';
import FormSelectField from 'components/Form/FormSelectField';
import { Field } from 'redux-form/immutable';

const styles = {
  pagination: {
    width: 134,
    marginLeft: 5,
  },
};

const PageField = (props) => {
  const { data: { count }, pageSize } = props;
  if (count) {
    const pagination = [];
    const total = Math.ceil(count / pageSize);

    for (let i = 0; i <= total; i += 1) {
      pagination.push({
        id: i,
        name: i,
      });
    }

    return (
      <Field name="page" label="Page" style={styles.pagination} options={pagination} component={FormSelectField} />
    );
  }

  return <Field name="page" label="Page" style={styles.pagination} component={FormSelectField} />;
};

PageField.propTypes = {
  data: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  pageSize: PropTypes.number,
};

export default PageField;
