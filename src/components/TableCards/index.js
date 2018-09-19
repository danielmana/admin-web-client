import React from 'react';
import PropTypes from 'prop-types';
import map from 'lodash/map';

import EnhancedTable from 'components/EnhancedTable';
import TableRowCardDetails from 'components/TableRowCardDetails';
import { getTrimmedString } from 'utils/helpers';

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
  const { allowedDays, allowedDaysActive } = item;
  return allowedDaysActive ? map(allowedDays, getTrimmedString).join(', ') : '-';
};

const FIELDS = [
  { id: 'alias', label: 'Card name' },
  { id: 'status', label: 'Card status', callback: callbackStatus },
  { id: 'lastFour', label: 'Card last four' },
  { id: 'type', label: 'Card type' },
  { id: 'virtualCard', label: 'Virtual Card' },
  { id: 'spendingLimit.active', label: 'Limit active' },
  { id: 'spendingLimit.amount', label: 'Spend limit', currency: true },
  { id: 'spendingLimit.period', label: 'Time period' },
  { id: 'availableAmount', label: 'Available to spend', currency: true },
  { id: 'allowedDays', label: 'Days active', callback: callbackAllowedDays },
  { id: 'createdOn', label: 'Card created on', date: true },
  { id: 'user.userId', label: 'User ID' },
  { id: 'externalReferenceId', label: 'Reference Id' },
];

class TableCards extends React.PureComponent {
  render() {
    const { data, ...props } = this.props;
    return (
      <EnhancedTable
        itemsFieldId="cardId"
        columnData={FIELDS}
        data={data && data.results}
        count={data && data.count}
        renderRowNested={this.renderRowNested}
        {...props}
      />
    );
  }

  renderRowNested(item) {
    return <TableRowCardDetails card={item} fields={FIELDS} />;
  }
}

TableCards.propTypes = {
  data: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
};

export default TableCards;
