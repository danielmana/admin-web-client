import React from 'react';
import PropTypes from 'prop-types';
import { Checkbox } from 'material-ui';


class FormCheckbox extends React.Component {

    constructor(props) {
        super(props);
        this.onCheck = this.onCheck.bind(this);
    }

    onCheck(event, value) {
        const { input: { onChange } } = this.props;
        onChange(value);
    }

    render() {
        const { input, label } = this.props;
        const checked = input.value || false;
        return (
            <Checkbox
                label={label}
                checked={checked}
                onCheck={this.onCheck}
                {...input}
            />
        );
    }
}

FormCheckbox.propTypes = {
    input: PropTypes.object,
    label: PropTypes.string,
};

export default FormCheckbox;
