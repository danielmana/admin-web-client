import React from 'react';
import PropTypes from 'prop-types';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import map from 'lodash/map';

import { getItemValue, getTrimmedString } from 'utils/helpers';

const callbackStatus = (item) => {
  const { status } = item;
  switch (status) {
    case 'TURNED_ON':
      return 'On';
    case 'TURNED_OFF':
      return 'Off';
    case 'CANCELED':
      return 'Canceled';
    case 'WEEKLY_RESTRICTION':
      return 'Weekly restriction';
    case 'FRAUD_PREVENTION':
      return 'Fraud prevention';
    default:
      return 'N/A';
  }
};

const callbackAllowedDays = (item) => {
  const { allowedDays } = item;
  return map(allowedDays, getTrimmedString).join(', ');
};

const FIELDS_HISTORY = [
  { id: 'status', label: 'Card status', callback: callbackStatus },
  { id: 'spendingLimitActive', label: 'Limit active' },
  { id: 'spendingLimitAmount', label: 'Spend limit', currency: true },
  { id: 'spendingLimitPeriod', label: 'Time period' },
  { id: 'availableAmount', label: 'Available to spend', currency: true },
  { id: 'allowedDays', label: 'Days active', callback: callbackAllowedDays },
  { id: 'timestamp', label: 'Card created on', date: true },
];

class TableRowCardDetails extends React.PureComponent {
  // eslint-disable-line react/prefer-stateless-function

  constructor(props) {
    super(props);
    this.renderHistoryItem = this.renderHistoryItem.bind(this);
    this.handleCardDetailClick = this.handleCardDetailClick.bind(this);
  }

  handleCardDetailClick() {
    const { card } = this.props;
    this.context.router.push(`/card/${card.cardId}`);
  }

  render() {
    const { card } = this.props;
    if (!card) {
      return;
    }
    return this.renderRow();
  }

  renderRow() {
    const { fields } = this.props;
    const colSpan = fields.length;
    return (
      <TableRow style={{ background: '#fff3bf' }}>
        <TableCell colSpan={colSpan}>
          <h3 style={{ margin: 0 }}>
            Card Details
            <IconButton style={{ top: 7 }} onClick={this.handleCardDetailClick}>
              <FontIcon className="material-icons">edit</FontIcon>
            </IconButton>
          </h3>
          {this.renderDetails()}
          <h3 style={{ marginBottom: 0 }}> Card History </h3>
          {this.renderHistory()}
        </TableCell>
      </TableRow>
    );
  }

  renderHistory() {
    const {
      card: { history },
    } = this.props;
    if (!history) {
      return 'Loading...';
    }
    return <div style={{ display: 'flex', padding: '10px 0' }}>{map(history, this.renderHistoryItem)}</div>;
  }

  renderHistoryItem(item, index) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column' }} key={index}>
        {map(FIELDS_HISTORY, (field) => this.renderItemField(item, field))}
      </div>
    );
  }

  renderDetails() {
    const { card, fields } = this.props;
    return (
      <div style={{ display: 'flex', padding: '10px 0', flexDirection: 'column' }}>
        {map(fields, (field) => this.renderItemField(card, field))}
      </div>
    );
  }

  renderItemField(item, field) {
    const value = getItemValue(item, field);
    return (
      <span key={field.id} style={{ marginRight: 20 }}>
        <b>{field.label}:</b> {value}
      </span>
    );
  }
}

TableRowCardDetails.propTypes = {
  card: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  fields: PropTypes.array.isRequired,
};

TableRowCardDetails.contextTypes = {
  router: PropTypes.object,
};

export default TableRowCardDetails;
