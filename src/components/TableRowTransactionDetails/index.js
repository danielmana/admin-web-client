import React from 'react';
import PropTypes from 'prop-types';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import map from 'lodash/map';
import pick from 'lodash/pick';
import omit from 'lodash/omit';
import { decamelize } from 'humps';
import moment from 'moment';

import { capitalizeFirstLetter } from 'utils/helpers';
import { TRANSACTION_HISTORY_PROPERTIES } from './constants';

class TableRowTransactionDetails extends React.PureComponent {
  // eslint-disable-line react/prefer-stateless-function

  constructor(props) {
    super(props);
    this.renderHistoryItem = this.renderHistoryItem.bind(this);
  }

  render() {
    const { transaction } = this.props;
    if (!transaction) {
      return;
    }
    return this.renderRow();
  }

  renderRow() {
    const { colSpan } = this.props;
    return (
      <TableRow style={{ background: '#fff3bf' }}>
        <TableCell colSpan={colSpan} style={{ padding: '0px' }}>
          <table>
            <tbody>
              <TableRow>
                <TableCell colSpan={colSpan}>
                  <h3 style={{ marginBottom: '0px' }}> Transaction History </h3>
                  {this.renderHistory()}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={colSpan}>
                  <h3 style={{ marginBottom: '0px' }}> Transaction Details </h3>
                  {this.renderDetails()}
                </TableCell>
              </TableRow>
            </tbody>
          </table>
        </TableCell>
      </TableRow>
    );
  }

  renderHistory() {
    const {
      transaction: { history },
    } = this.props;
    if (!history) {
      return 'Loading...';
    }
    return <div style={{ display: 'flex', padding: '10px 0' }}>{map(history, this.renderHistoryItem)}</div>;
  }

  renderDetails() {
    const {
      transaction: { history },
    } = this.props;
    if (!history) {
      return 'Loading...';
    }
    const firstHistoryItem = history[0];
    return (
      <div style={{ display: 'flex', padding: '10px 0', flexDirection: 'column' }}>
        {map(omit(firstHistoryItem, TRANSACTION_HISTORY_PROPERTIES), this.renderHistoryItemField)}
      </div>
    );
  }

  renderHistoryItem(item, index) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column' }} key={index}>
        {map(pick(item, TRANSACTION_HISTORY_PROPERTIES), this.renderHistoryItemField)}
      </div>
    );
  }

  renderHistoryItemField(value, key) {
    const label = capitalizeFirstLetter(decamelize(key));
    const text = parseKey(key, value);
    return (
      <span key={key} style={{ marginRight: 20 }}>
        <b>{label}:</b> {text}
      </span>
    );

    function parseKey(prop, val) {
      if (prop === 'date') {
        return moment(val).format('MMMM Do YYYY, h:mm:ss a');
      }
      if (val === null) {
        return 'N/A';
      }
      return val.toString();
    }
  }
}

TableRowTransactionDetails.propTypes = {
  transaction: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  colSpan: PropTypes.number,
};

export default TableRowTransactionDetails;
