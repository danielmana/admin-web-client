import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form/immutable';
import { connect } from 'react-redux';
import { Card } from 'material-ui/Card';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import { createStructuredSelector } from 'reselect';
import { makeSelectFormFields } from 'containers/App/selectors';
import map from 'lodash/map';

import { createValidator, required } from 'utils/validation';

import ActionButtons from 'components/ActionButtons';
import FormTextField from 'components/Form/FormTextField';
import FormSelectField from 'components/Form/FormSelectField';
import DialogConfirm from 'components/Dialogs/DialogConfirm';

import { daysToShortName, toMoney, toCardCreatedDate } from 'utils/helpers';

import { CARD_STATUS } from './constants';


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
    cardStatus: [required],
});

class CardInformation extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    constructor(props) {
        super(props);
        this.handleEditableState = this.handleEditableState.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onDialogCancel = this.onDialogCancel.bind(this);
        this.onCardReissueDialogCancel = this.onCardReissueDialogCancel.bind(this);
        this.handleCardReissueClick = this.handleCardReissueClick.bind(this);
        this.state = {
            disabled: true,
            open: false,
            isReissueDialogVisable: false,
        };
    }

    componentDidMount() {
        const { cardInfo } = this.props;
        this.handleInitialization(cardInfo);
    }

    handleInitialization(cardInfo) {
        this.props.initialize({
            cardId: cardInfo.cardId,
            spendingLimitControl: cardInfo.spendingLimit.active ? 'On' : 'Off',
            spendingLimit: toMoney(cardInfo.spendingLimit.amount),
            timePeriod: cardInfo.spendingLimit.period,
            availableSpend: toMoney(cardInfo.availableAmount),
            cardStatus: cardInfo.status,
            availableUntil: 'n/a',
            activeDays: daysToShortName(cardInfo.allowedDays),
            lifeCycleStatus: cardInfo.lifecycleStatus,
            allowedCategories: map(cardInfo.allowedCategories, 'name').join(','),
            cardCreated: toCardCreatedDate(cardInfo.createdOn),
            cardLastFour: cardInfo.lastFour,
            cardType: cardInfo.type,
            referenceId: cardInfo.externalReferenceId,
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

    renderCardReissueDialog() {
        const { handleCardReissue, formValues } = this.props;
        return (
            <DialogConfirm
                visible={this.state.isReissueDialogVisable}
                onCancel={this.onCardReissueDialogCancel}
                onSubmit={handleCardReissue}
                data={formValues}
            />
        );
    }

    onCardReissueDialogCancel() {
        this.setState({
            isReissueDialogVisable: false,
        });
    }

    handleSubmit() {
        this.handleEditableState();
        this.setState({
            open: true,
        });
    }

    handleCardReissueClick() {
        this.setState({
            isReissueDialogVisable: true,
        });
    }

    render() {
        const { handleSubmit } = this.props;
        return (
            <div>
                <form onSubmit={handleSubmit(this.handleSubmit)}>
                    <AppBar
                        title="Card Information"
                        showMenuIconButton={false}
                        iconElementRight={this.renderActionButtons()}
                    />
                    <Card>
                        <div style={styles.row}>
                            {this.renderSpendLimitControl()}
                            {this.renderSpendLimit()}
                        </div>
                        <div style={styles.row}>
                            {this.renderTimePeriod()}
                            {this.renderAvailableSpend()}
                        </div>
                        <div style={styles.row}>
                            {this.renderCardStatus()}
                            {this.renderAvailableUntil()}
                        </div>
                        <div style={styles.row}>
                            {this.renderLifeCycleStatus()}
                            {this.renderCreatedCardLastFour()}
                        </div>
                        <div style={styles.row}>
                            {this.renderCreatedCardDate()}
                            {this.renderCardType()}
                        </div>
                        <div style={styles.row}>
                            {this.renderActiveDays()}
                            {this.renderReferenceId()}
                        </div>
                        <div style={styles.row}>
                            {this.renderAllowedCategories()}
                        </div>
                        <div style={styles.row}>
                            {this.renderReissueButton()}
                        </div>
                    </Card>
                    {this.renderConfirmDialog()}
                    {this.renderCardReissueDialog()}
                </form>
            </div>
        );
    }

    renderSpendLimitControl() {
        return (
            <Field
                name="spendingLimitControl"
                label="Spend limit control"
                component={FormTextField}
                disabled
            />
        );
    }

    renderSpendLimit() {
        return (
            <Field
                name="spendingLimit"
                label="Spend limit"
                component={FormTextField}
                disabled
            />
        );
    }

    renderTimePeriod() {
        return (
            <Field
                name="timePeriod"
                label="Time Period"
                component={FormTextField}
                disabled
            />
        );
    }

    renderAvailableSpend() {
        return (
            <Field
                name="availableSpend"
                label="Available spend"
                component={FormTextField}
                disabled
            />
        );
    }

    renderCardStatus() {
        return (
            <Field
                name="cardStatus"
                label="Card status"
                options={CARD_STATUS}
                component={FormSelectField}
                disabled={this.state.disabled}
            />
        );
    }

    renderAvailableUntil() {
        return (
            <Field
                name="availableUntil"
                label="Available until"
                component={FormTextField}
                disabled
            />
        );
    }

    renderActiveDays() {
        return (
            <Field
                name="activeDays"
                label="Days active"
                component={FormTextField}
                multiLine
                disabled
            />
        );
    }

    renderReferenceId() {
        return (
            <Field
                name="referenceId"
                label="Reference ID"
                component={FormTextField}
                disabled
            />
        );
    }

    renderLifeCycleStatus() {
        return (
            <Field
                name="lifeCycleStatus"
                label="Lifecycle status"
                component={FormTextField}
                disabled
            />
        );
    }

    renderAllowedCategories() {
        return (
            <Field
                name="allowedCategories"
                label="Allowed categories"
                component={FormTextField}
                multiLine
                disabled
            />
        );
    }

    renderCreatedCardDate() {
        return (
            <Field
                name="cardCreated"
                label="Card created"
                component={FormTextField}
                disabled
            />
        );
    }

    renderCreatedCardLastFour() {
        return (
            <Field
                name="cardLastFour"
                label="Card last 4"
                component={FormTextField}
                disabled
            />
        );
    }

    renderCardType() {
        return (
            <Field
                name="cardType"
                label="Card type"
                component={FormTextField}
                disabled
            />
        );
    }

    renderReissueButton() {
        const { cardInfo: { status } } = this.props;
        if (status === 'CANCELED') {
            return;
        }
        return (
            <FlatButton
                label="Reissue"
                style={styles.button}
                onClick={this.handleCardReissueClick}
            />
        );
    }
}

CardInformation.propTypes = {
    cardInfo: PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.object,
    ]),
    initialize: PropTypes.func,
    update: PropTypes.func.isRequired,
    formValues: PropTypes.object,
    handleSubmit: PropTypes.func,
    handleCardReissue: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
    formValues: makeSelectFormFields('CardInformation'),
});

export default connect(mapStateToProps)(reduxForm({
    form: 'CardInformation',
    validate,
})(CardInformation));
