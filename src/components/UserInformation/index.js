import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form/immutable';
import { connect } from 'react-redux';
import { Card } from 'material-ui/Card';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import { createStructuredSelector } from 'reselect';
import { toString, toDate } from 'utils/helpers';

import ActionButtons from 'components/ActionButtons';
import FormTextField from 'components/Form/FormTextField';
import FormSelectField from 'components/Form/FormSelectField';
import FormDatePicker from 'components/Form/FormDatePicker';
import DialogConfirm from 'components/Dialogs/DialogConfirm';

import { createValidator, required } from 'utils/validation';

import { makeSelectFormFields } from 'containers/App/selectors';

import { MOBILE_ACCESS, PROGRAM } from './constants';

const styles = {
    row: {
        display: 'flex',
    },
    button: {
        height: 'auto',
        width: '100%',
    },
};

const validate = createValidator({
    firstName: [required],
    lastName: [required],
});

class UserInformation extends React.PureComponent {

    constructor(props) {
        super(props);
        this.handleEditableState = this.handleEditableState.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onDialogCancel = this.onDialogCancel.bind(this);
        this.goToEnrollments = this.goToEnrollments.bind(this);
        this.state = {
            disabled: true,
            open: false,
        };
    }

    componentDidMount() {
        const { userInfo, businessInfo } = this.props;
        this.handleInitialization(userInfo, businessInfo);
    }

    handleInitialization(user, businessInfo) {
        this.props.initialize({
            firstName: user.firstName,
            lastName: user.lastName,
            accountStatus: user.deleted ? 'Deleted' : 'Active',
            type: user.bentoType,
            dob: toDate(user.birthDate),
            ssn: user.ssnLast4Digits,
            phoneNumber: user.phone,
            userEmail: user.email,
            mobileEnabled: (user.bentoType === 'Employee') ? toString(user.mobileAccess) : 'N/A',
            brand: businessInfo.brand,
            userId: user.userId,
        });
    }

    handleEditableState() {
        this.setState({ disabled: !this.state.disabled });
    }

    renderActionButtons() {
        return (
            <ActionButtons
                handleEditableState={this.handleEditableState}
                disabled={this.state.disabled}
            />
        );
    }

    onDialogCancel() {
        this.setState({
            open: false,
        });
    }

    renderConfirmDialog() {
        const { update, formValues } = this.props;
        return (
            <DialogConfirm
                visible={this.state.open}
                onCancel={this.onDialogCancel}
                onSubmit={update}
                data={formValues}
            />
        );
    }

    handleSubmit() {
        this.handleEditableState();
        this.setState({
            open: true,
        });
    }

    goToEnrollments() {
        const { history, businessInfo } = this.props;
        history.push(`/enrollments?userEmail=${businessInfo.ownerEmail}`);
    }

    render() {
        const { handleSubmit } = this.props;
        return (
            <div>
                <form onSubmit={handleSubmit(this.handleSubmit)}>
                    <AppBar
                        title="User Information"
                        showMenuIconButton={false}
                        iconElementRight={this.renderActionButtons()}
                    />
                    <Card>
                        <div style={styles.row}>
                            {this.renderFirstName()}
                            {this.renderLastName()}
                        </div>
                        <div style={styles.row}>
                            {this.renderAccountStatus()}
                            {this.renderRole()}
                        </div>
                        <div style={styles.row}>
                            {this.renderDOB()}
                            {this.renderSSN()}
                        </div>
                        <div style={styles.row}>
                            {this.renderEnrollment()}
                            {this.renderPhoneNumber()}
                        </div>
                        <div style={styles.row}>
                            {this.renderUserEmail()}
                        </div>
                        <div style={styles.row}>
                            {this.renderMobileEnabled()}
                            {this.renderProgram()}
                        </div>
                    </Card>
                </form>
                {this.renderConfirmDialog()}
            </div>
        );
    }

    renderFirstName() {
        return (
            <Field
                name="firstName"
                label="First name"
                component={FormTextField}
                disabled={this.state.disabled}
            />
        );
    }

    renderLastName() {
        return (
            <Field
                name="lastName"
                label="Last name"
                component={FormTextField}
                disabled={this.state.disabled}
            />
        );
    }

    renderAccountStatus() {
        return (
            <Field
                name="accountStatus"
                label="Status"
                component={FormTextField}
                disabled
            />
        );
    }

    renderRole() {
        return (
            <Field
                name="type"
                label="Role"
                component={FormTextField}
                disabled
            />
        );
    }

    renderDOB() {
        return (
            <Field
                name="dob"
                label="Date of Birth"
                component={FormDatePicker}
                disabled={this.state.disabled}
            />
        );
    }

    renderSSN() {
        return (
            <Field
                name="ssn"
                label="SSN"
                component={FormTextField}
                disabled={this.state.disabled}
            />
        );
    }

    renderEnrollment() {
        return (
            <FlatButton
                label="Enrollment"
                style={styles.button}
                onClick={this.goToEnrollments}
            />
        );
    }

    renderPhoneNumber() {
        return (
            <Field
                name="phoneNumber"
                label="Phone number"
                component={FormTextField}
                disabled={this.state.disabled}
            />
        );
    }

    renderUserEmail() {
        return (
            <Field
                name="userEmail"
                label="User email"
                component={FormTextField}
                disabled={this.state.disabled}
            />
        );
    }

    renderProgram() {
        return (
            <Field
                name="brand"
                label="Program"
                options={PROGRAM}
                component={FormSelectField}
                disabled
            />
        );
    }

    renderMobileEnabled() {
        const { userInfo } = this.props;
        if (userInfo.bentoType === 'Employee') {
            return (
                <Field
                    name="mobileEnabled"
                    label="Mobile Enabled"
                    options={MOBILE_ACCESS}
                    component={FormSelectField}
                    disabled={this.state.disabled}
                />
            );
        }
        return (
            <Field
                name="mobileEnabled"
                label="Mobile Enabled"
                component={FormTextField}
                disabled
            />
        );
    }
}

UserInformation.propTypes = {
    userInfo: PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.object,
    ]),
    businessInfo: PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.object,
    ]),
    initialize: PropTypes.func,
    update: PropTypes.func.isRequired,
    formValues: PropTypes.object,
    handleSubmit: PropTypes.func,
};

UserInformation.contextTypes = {
    router: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
    formValues: makeSelectFormFields('UserInformation'),
});

export default connect(mapStateToProps)(reduxForm({
    form: 'UserInformation',
    validate,
})(withRouter(UserInformation)));
