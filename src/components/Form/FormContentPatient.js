import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form/immutable';

import FormTextField from 'components/Form/FormTextField';
import FormSelectField from 'components/Form/FormSelectField';
import FormCheckbox from 'components/Form/FormCheckbox';


const styles = {
    row: {
        display: 'flex',
        flexDirection: 'row',
    },
    field: {
        width: '100%',
    },
};

const languageOptions = [{
    id: 'en',
    label: 'English',
}, {
    id: 'es',
    label: 'Spanish',
}, {
    id: 'vi',
    label: 'Vietnamese',
}];

const contactOptions = [{
    id: 'sms',
    label: 'SMS',
}, {
    id: 'voice',
    label: 'Voice',
}, {
    id: 'email',
    label: 'E-Mail',
}];

class FormContentPatient extends React.Component {

    render() {
        return (
            <div>
                {this.renderFirstName()}
                {this.renderLastName()}
                {this.renderDateOfBirth()}
                {this.renderLanguage()}
                {this.renderDoNotContact()}
                {this.renderContact()}
            </div>
        );
    }

    renderFirstName() {
        const { fieldsPrefix } = this.props;
        const name = `${fieldsPrefix}firstname`;
        return (
            <Field
                autoFocus
                style={styles.field}
                name={name}
                label="First name"
                component={FormTextField}
            />
        );
    }

    renderLastName() {
        const { fieldsPrefix } = this.props;
        const name = `${fieldsPrefix}lastname`;
        return (
            <Field
                style={styles.field}
                name={name}
                label="Last name"
                component={FormTextField}
            />
        );
    }

    renderDateOfBirth() {
        const { fieldsPrefix } = this.props;
        const name = `${fieldsPrefix}dateOfBirth`;
        return (
            <Field
                style={styles.field}
                type="date"
                name={name}
                floatingLabelText="Date of Birth"
                floatingLabelFixed
                component={FormTextField}
            />
        );
    }

    renderLanguage() {
        const { fieldsPrefix } = this.props;
        const name = `${fieldsPrefix}language`;
        return (
            <Field
                name={name}
                label="Contact language"
                options={languageOptions}
                component={FormSelectField}
            />
        );
    }

    renderDoNotContact() {
        const { fieldsPrefix } = this.props;
        const name = `${fieldsPrefix}doNotContact`;
        return (
            <div
                style={{ margin: '20px 0' }}
            >
                <Field
                    name={name}
                    label="Do not contact"
                    component={FormCheckbox}
                />
            </div>
        );
    }

    renderContact() {
        const { patient: { doNotContact } } = this.props;
        if (doNotContact) {
            return;
        }
        return (
            <div style={styles.row}>
                {this.renderContactType()}
                {this.renderContactValue()}
            </div>
        );
    }

    renderContactType() {
        const { fieldsPrefix } = this.props;
        const name = `${fieldsPrefix}contactType`;
        return (
            <Field
                style={{ marginRight: 10 }}
                name={name}
                label="Contact type"
                options={contactOptions}
                component={FormSelectField}
            />
        );
    }

    renderContactValue() {
        const { patient: { contactType } } = this.props;
        if (!contactType) {
            return;
        }
        const { fieldsPrefix } = this.props;
        const name = `${fieldsPrefix}contactValue`;
        const label = (contactType === 'email') ? 'E-Mail' : 'Phone';
        return (
            <Field
                style={styles.field}
                name={name}
                label={label}
                component={FormTextField}
            />
        );
    }
}

FormContentPatient.propTypes = {
    fieldsPrefix: PropTypes.string,
    patient: PropTypes.object,
};

FormContentPatient.defaultProps = {
    fieldsPrefix: '',
};

export default FormContentPatient;
