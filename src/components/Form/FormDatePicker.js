import React from 'react';
import PropTypes from 'prop-types';
import { DatePicker } from 'material-ui';
import moment from 'moment';

const customStyle = {
    width: '100%',
    display: 'inline-block',
    margin: '0 5px',
};

class FormDatePicker extends React.Component {

    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
    }

    onChange(event, value) {
        const { input } = this.props;
        const dateFormatted = moment(value).isValid() ? moment(value).format('YYYY-MM-DD') : '';
        input.onChange(dateFormatted);
    }

    render() {
        const { input, style, label, meta: { touched, error }, ...custom } = this.props;
        const { value, ...inputProps } = input;
        const date = value ? moment(value, 'YYYY-MM-DD').toDate() : null;

        return (
            <DatePicker
                firstDayOfWeek={0}
                floatingLabelText={label}
                errorText={touched && error}
                style={style || customStyle}
                textFieldStyle={{ width: '100%' }}
                value={date}
                {...inputProps}
                {...custom}
                onChange={this.onChange}
            />
        );
    }
}

FormDatePicker.propTypes = {
    input: PropTypes.object,
    label: PropTypes.string,
    meta: PropTypes.object,
    style: PropTypes.object,
};

export default FormDatePicker;
