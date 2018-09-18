import React from 'react';
import PropTypes from 'prop-types';
import { TextField } from 'material-ui';

const customStyle = {
    width: '100%',
    margin: '0 5px',
};

class FormTextField extends React.Component {

    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
    }

    onChange(event, value) {
        const { input, type } = this.props;
        const newValue = (type === 'number') ? parseInt(value, 10) : value;
        input.onChange(newValue);
    }

    render() {
        const { label, onBlur, style, input: { value, ...inputProps }, meta: { touched, error }, ...custom } = this.props;
        return (
            <TextField
                floatingLabelText={label}
                value={value}
                style={style || customStyle}
                errorText={touched && error}
                {...inputProps}
                {...custom}
                onChange={this.onChange}
                onBlur={() => onBlur && onBlur(value)}
            />
        );
    }
}

FormTextField.propTypes = {
    input: PropTypes.object,
    meta: PropTypes.object,
    type: PropTypes.string,
    label: PropTypes.string,
    onBlur: PropTypes.func,
    style: PropTypes.object,
    multiLine: PropTypes.bool,
};

export default FormTextField;
