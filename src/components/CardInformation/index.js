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
import isEmpty from 'lodash/isEmpty';

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
  actions: {
    display: 'flex',
    justifyContent: 'flex-end',
    padding: 10,
  },
  renderMigrationButtonContainer: {
    flex: '1',
  },
};

const validate = createValidator({
  cardStatus: [required],
});

export const ACTION_UPDATE = 1;
export const ACTION_REISSUE = 2;
export const ACTION_DELETE = 3;

class CardInformation extends React.Component {
  constructor(props) {
    super(props);
    this.handleEditableState = this.handleEditableState.bind(this);
    this.handleAction = this.handleAction.bind(this);
    this.handleActionCancel = this.handleActionCancel.bind(this);
    this.handleActionSubmit = this.handleActionSubmit.bind(this);
    this.state = {
      disabled: true,
      isDialogConfirmVisible: false,
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

  handleAction(action) {
    if (action === ACTION_UPDATE) {
      this.handleEditableState();
    }
    this.setState({
      action,
      isDialogConfirmVisible: true,
    });
  }

  handleActionCancel() {
    this.setState({
      isDialogConfirmVisible: false,
    });
  }

  handleActionSubmit() {
    const { onAction, formValues } = this.props;
    const { action } = this.state;
    onAction(action, formValues);
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <div>
        <form onSubmit={handleSubmit(() => this.handleAction(ACTION_UPDATE))}>
          <AppBar title="Card Information" showMenuIconButton={false} iconElementRight={this.renderActionButtons()} />
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
            <div style={styles.row}>{this.renderAllowedCategories()}</div>
            {this.renderActions()}
          </Card>
          {this.renderConfirmDialog()}
        </form>
      </div>
    );
  }

  renderActionButtons() {
    return <ActionButtons handleEditableState={this.handleEditableState} disabled={this.state.disabled} />;
  }

  renderSpendLimitControl() {
    return <Field name="spendingLimitControl" label="Spend limit control" component={FormTextField} disabled />;
  }

  renderSpendLimit() {
    return <Field name="spendingLimit" label="Spend limit" component={FormTextField} disabled />;
  }

  renderTimePeriod() {
    return <Field name="timePeriod" label="Time Period" component={FormTextField} disabled />;
  }

  renderAvailableSpend() {
    return <Field name="availableSpend" label="Available spend" component={FormTextField} disabled />;
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
    return <Field name="availableUntil" label="Available until" component={FormTextField} disabled />;
  }

  renderActiveDays() {
    return <Field name="activeDays" label="Days active" component={FormTextField} multiLine disabled />;
  }

  renderReferenceId() {
    return <Field name="referenceId" label="Reference ID" component={FormTextField} disabled />;
  }

  renderLifeCycleStatus() {
    return <Field name="lifeCycleStatus" label="Lifecycle status" component={FormTextField} disabled />;
  }

  renderAllowedCategories() {
    return <Field name="allowedCategories" label="Allowed categories" component={FormTextField} multiLine disabled />;
  }

  renderCreatedCardDate() {
    return <Field name="cardCreated" label="Card created" component={FormTextField} disabled />;
  }

  renderCreatedCardLastFour() {
    return <Field name="cardLastFour" label="Card last 4" component={FormTextField} disabled />;
  }

  renderCardType() {
    return <Field name="cardType" label="Card type" component={FormTextField} disabled />;
  }

  renderActions = () => (
    <div style={styles.actions}>
      <div style={styles.renderMigrationButtonContainer}>{this.renderMigrationLink()}</div>
      {this.renderActionReissue()}
      {this.renderActionDelete()}
    </div>
  );

  renderActionReissue() {
    const { cardInfo: { status } } = this.props;
    if (status === 'CANCELED') {
      return;
    }
    return <FlatButton label="Reissue" onClick={() => this.handleAction(ACTION_REISSUE)} />;
  }

  renderActionDelete() {
    return (
      <FlatButton
        label="Terminate"
        labelStyle={{ color: '#F44336' }}
        onClick={() => this.handleAction(ACTION_DELETE)}
      />
    );
  }

  renderConfirmDialog() {
    const { formValues } = this.props;
    return (
      <DialogConfirm
        visible={this.state.isDialogConfirmVisible}
        onCancel={this.handleActionCancel}
        onSubmit={this.handleActionSubmit}
        data={formValues}
      />
    );
  }

  goToAssociatedCard = (associatedCardId) => {
    if (associatedCardId) {
      this.context.router.push(`/card/${associatedCardId}`);
    }
    window.location.reload();
  };

  renderMigrationLink = () => {
    const { cardInfo, cardMigration } = this.props;
    if (isEmpty(cardMigration)) {
      return null;
    }
    let associatedCardId = null;
    if (cardInfo.cardId === cardMigration.newCard.cardId) {
      associatedCardId = cardMigration.oldCard.cardId;
    } else {
      associatedCardId = cardMigration.newCard.cardId;
    }
    return (
      <FlatButton
        onClick={() => this.goToAssociatedCard(associatedCardId)}
        label="Link to Migrated Card"
        style={styles.button}
      />
    );
  };
}

CardInformation.propTypes = {
  cardInfo: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  cardMigration: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  handleSubmit: PropTypes.func.isRequired,
  initialize: PropTypes.func.isRequired,
  formValues: PropTypes.object,
  onAction: PropTypes.func.isRequired,
};

CardInformation.contextTypes = {
  router: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  formValues: makeSelectFormFields('CardInformation'),
});

export default connect(mapStateToProps)(
  reduxForm({
    form: 'CardInformation',
    validate,
  })(CardInformation)
);
