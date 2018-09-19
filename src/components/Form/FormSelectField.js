import React from 'react';
import PropTypes from 'prop-types';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import map from 'lodash/map';
import includes from 'lodash/includes';

import { capitalizeFirstLetter } from 'utils/helpers';

const customStyle = {
  width: '100%',
  margin: '0 5px',
  verticalAlign: 'bottom',
};

class FormSelectField extends React.Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }

  onChange(event, index, value) {
    const { input, onChangeAction } = this.props;
    if (onChangeAction) {
      onChangeAction(value);
    }
    input.onChange(value);
  }

  render() {
    const {
      input,
      label,
      options,
      style,
      meta: { touched, error },
      ...custom
    } = this.props;
    return (
      <SelectField
        floatingLabelText={label}
        errorText={touched && error}
        style={style || customStyle}
        {...input}
        {...custom}
        onChange={this.onChange}
      >
        {this.renderOptions(options, custom.multiple, input.value)}
      </SelectField>
    );
  }

  renderOptions(options, multiple, values) {
    return map(options, (option) => this.renderOption(option, multiple, values));
  }

  renderOption(option, multiple, values) {
    const id = option.id || option._id || option || 'key';
    if (id === 'divider') {
      return <Divider key="divider" />;
    }
    const primaryText = option.label || option.name || capitalizeFirstLetter(id);
    return (
      <MenuItem
        key={id}
        value={id}
        primaryText={primaryText}
        insetChildren={multiple}
        checked={multiple && includes(values, id)}
      />
    );
  }
}

FormSelectField.propTypes = {
  input: PropTypes.object,
  label: PropTypes.string,
  meta: PropTypes.object,
  style: PropTypes.object,
  multiple: PropTypes.bool,
  options: PropTypes.array,
  onChangeAction: PropTypes.func,
};

export default FormSelectField;
