import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { required, isValidPhoneNumber } from 'utils/validation';
import { phoneMask } from 'utils/helpers';
import { Field, FieldArray } from 'redux-form/immutable';
import FormTextField from 'components/Form/FormTextField';

export default class FormContactInfo extends Component {

    static propTypes = {
        style: PropTypes.any,
        label: PropTypes.string,
    };

    renderContacts = ({ fields }) => {
        const { style, label } = this.props;
        return (
            <div>
                {
                    fields.map((item, index) => (
                        <Field
                            key={index}
                            style={style}
                            name={`${item}.value`}
                            label={label}
                            component={FormTextField}
                            validate={[required, isValidPhoneNumber]}
                            normalize={phoneMask}
                        />
                    ))
                }
            </div>
        );
    }

    render() {
        return (
            <FieldArray
                name="referral.contact"
                component={this.renderContacts}
            />
        );
    }
}
