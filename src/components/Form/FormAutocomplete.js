import React from 'react';
import PropTypes from 'prop-types';
import AutoComplete from 'material-ui/AutoComplete';
import MenuItem from 'material-ui/MenuItem';
import find from 'lodash/find';
import get from 'lodash/get';
import forEach from 'lodash/forEach';

class FormAutocomplete extends React.Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.renderDataSource = this.renderDataSource.bind(this);
  }

  onChange(item) {
    const { input } = this.props;
    input.onChange(item._id);
  }

  getSearchText(dataSource, value) {
    return get(find(dataSource, { _id: value }), 'name');
  }

  renderDataSource() {
    const { dataSource } = this.props;
    const items = [];
    forEach(dataSource, (item) => {
      items.push({
        text: item.name,
        value: (
          <MenuItem key={item._id} onClick={() => this.onChange(item)}>
            {`${item.name}`}
          </MenuItem>
        ),
      });
    });
    return items;
  }

  render() {
    const {
      label,
      dataSource,
      input: { value },
      meta: { touched, error },
      ...custom
    } = this.props;
    const searchText = this.getSearchText(dataSource, value);
    return (
      <AutoComplete
        floatingLabelText={label}
        filter={AutoComplete.caseInsensitiveFilter}
        dataSource={this.renderDataSource()}
        searchText={searchText}
        errorText={touched && error}
        openOnFocus
        fullWidth
        {...custom}
      />
    );
  }
}

FormAutocomplete.propTypes = {
  input: PropTypes.object,
  label: PropTypes.string,
  meta: PropTypes.object,
  dataSource: PropTypes.array.isRequired,
  onChangeAction: PropTypes.func,
};

export default FormAutocomplete;
