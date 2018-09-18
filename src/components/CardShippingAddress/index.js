import React from 'react';
import PropTypes from 'prop-types';
import AppBar from 'material-ui/AppBar';
import { Card } from 'material-ui/Card';
import { Field, reduxForm } from 'redux-form/immutable';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { makeSelectFormFields } from 'containers/App/selectors';

import ActionButtons from 'components/ActionButtons';
import FormTextField from 'components/Form/FormTextField';
import FormSelectField from 'components/Form/FormSelectField';
import DialogConfirm from 'components/Dialogs/DialogConfirm';

import { STATES } from 'containers/UserPageDetail/constants';

const styles = {
    row: {
        display: 'flex',
    },
};


class CardShippingAddress extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

    constructor(props) {
        super(props);
        this.handleEditableState = this.handleEditableState.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onDialogCancel = this.onDialogCancel.bind(this);
        this.state = {
            disabled: true,
            open: false,
        };
    }

    componentDidMount() {
        const { businessInfo } = this.props;
        this.handleInitialization(businessInfo);
    }

    handleInitialization(businessInfo) {
        this.props.initialize({
            businessID: businessInfo.businessId,
            businessAddressOne: businessInfo.addresses[0].street,
            businessAddressTwo: businessInfo.addresses[0].addressAdditionals,
            businessAddressType: businessInfo.addresses[0].addressType,
            businessCity: businessInfo.addresses[0].city,
            businessState: businessInfo.addresses[0].state,
            businessZip: businessInfo.addresses[0].zipCode,
            shippingAddressOne: businessInfo.addresses[1].street,
            shippingAddressTwo: businessInfo.addresses[1].addressAdditionals,
            shippingAddressType: businessInfo.addresses[1].addressType,
            shippingCity: businessInfo.addresses[1].city,
            shippingState: businessInfo.addresses[1].state,
            shippingZip: businessInfo.addresses[1].zipCode,
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
        const { valid } = this.props;
        this.handleEditableState();
        if (valid) {
            this.setState({
                open: true,
            });
        }
    }

    render() {
        const { handleSubmit } = this.props;
        return (
            <div>
                <form onSubmit={handleSubmit(this.handleSubmit)}>
                    <AppBar
                        title="Card Shipping Address"
                        showMenuIconButton={false}
                        iconElementRight={this.renderActionButtons()}
                    />
                    <Card>
                        <div style={styles.row}>
                            {this.renderAddressOne()}
                            {this.renderAddressTwo()}
                        </div>
                        <div style={styles.row}>
                            {this.renderCity()}
                            {this.renderState()}
                        </div>
                        <div style={styles.row}>
                            {this.renderZip()}
                        </div>
                    </Card>
                </form>
                {this.renderConfirmDialog()}
            </div>
        );
    }

    renderAddressOne() {
        return (
            <Field
                name="shippingAddressOne"
                label="Address 1"
                component={FormTextField}
                disabled={this.state.disabled}
            />
        );
    }

    renderAddressTwo() {
        return (
            <Field
                name="shippingAddressTwo"
                label="Address 2"
                component={FormTextField}
                disabled={this.state.disabled}
            />
        );
    }

    renderCity() {
        return (
            <Field
                name="shippingCity"
                label="City"
                component={FormTextField}
                disabled={this.state.disabled}
            />
        );
    }

    renderState() {
        return (
            <Field
                name="shippingState"
                label="State"
                options={STATES}
                component={FormSelectField}
                disabled={this.state.disabled}
            />
        );
    }

    renderZip() {
        return (
            <Field
                name="shippingZip"
                label="Zip"
                component={FormTextField}
                disabled={this.state.disabled}
            />
        );
    }
}

CardShippingAddress.propTypes = {
    businessInfo: PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.object,
    ]),
    initialize: PropTypes.func,
    update: PropTypes.func.isRequired,
    formValues: PropTypes.object,
    handleSubmit: PropTypes.func,
    valid: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
    formValues: makeSelectFormFields('CardShippingAddress'),
});

export default connect(mapStateToProps)(reduxForm({
    form: 'CardShippingAddress',
})(CardShippingAddress));
