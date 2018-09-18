import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form/immutable';
import keycode from 'keycode';
import moment from 'moment';
import get from 'lodash/get';
import map from 'lodash/map';
import isObject from 'lodash/isObject';
import isEqual from 'lodash/isEqual';
import _orderBy from 'lodash/orderBy';
import numeral from 'numeral';
import { getTrimmedString } from 'utils/helpers';

import { makeSelectFormFields } from 'containers/App/selectors';
import ActionButtons from 'components/ActionButtons';
import AppBar from 'material-ui/AppBar';
import { createStructuredSelector } from 'reselect';

import CircularProgressCentered from 'components/CircularProgressCentered';
import {
    Table,
    TableBody,
    TableRow,
    TableCell,
} from 'components-next/material-ui/Table';
import AssociatedUnitsTableHead from './AssociatedUnitsTableHead';


const styles = {
    title: {
        cursor: 'pointer',
    },
    table: {
        overflowX: 'auto',
    },
};

const columnData = [
    { id: 'alias', label: 'Card name' },
    { id: 'status', label: 'Card status' },
    { id: 'lastFour', label: 'Card last four' },
    { id: 'type', label: 'Card type' },
    { id: 'spendingLimit.active', label: 'Limit active' },
    { id: 'spendingLimit.amount', label: 'Spend limit' },
    { id: 'spendingLimit.period', label: 'Time period' },
    { id: 'availableAmount', label: 'Available to spend' },
    { id: 'allowedDays', label: 'Days active' },
    { id: 'createdOn', label: 'Card created on' },
    { id: 'user.userId', label: 'User ID' },
    { id: 'externalReferenceId', label: 'Reference Id' },
];

class AssociatedUnitsTable extends Component {

    constructor(props) {
        super(props);
        this.handleRequestSort = this.handleRequestSort.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleEditableState = this.handleEditableState.bind(this);

        this.state = {
            order: 'desc',
            orderBy: 'lastUpdated',
            cards: null,
            disabled: true,
        };
    }

    componentWillReceiveProps(nextProps) {
        const { cards } = this.props;
        if (!isEqual(nextProps.cards, cards)) {
            this.setState({ cards: nextProps.cards });
        }
    }

    getItems() {
        const { orderBy, order } = this.state;
        return _orderBy(this.state.cards || this.props.cards, [orderBy], [order]);
    }

    handleRequestSort(event, property) {
        const orderBy = property;
        let order = 'desc';
        if (this.state.orderBy === property && this.state.order === 'desc') {
            order = 'asc';
        }
        this.setState({ order, orderBy });
    }

    handleKeyDown(event, item) {
        if (keycode(event) === 'space') {
            this.handleClick(event, item);
        }
    }

    getCardOption(value) {
        switch (value) {
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
    }

    handleClick(item) {
        const { onClick } = this.props;
        onClick(item);
    }

    getItemValue(item, column) {
        // use callback if any
        if (column.callback) {
            return column.callback(item);
        }
        const id = get(column, 'id');
        const value = get(item, id);

        // card status
        if (id === 'status') {
            return this.getCardOption(value);
        }

        // date
        if (id === 'createdOn') {
            return value ? moment(value).format('MMM Do, YYYY, h:mm a') : 'n/a';
        }
        // money
        if (id === 'spendingLimit.amount' || id === 'availableAmount') {
            return value ? numeral(value).format('$0,0.00') : 'n/a';
        }
        // array of days
        if (id === 'allowedDays') {
            return map(value, getTrimmedString).join(', ');
        }

        if (id === 'spendingLimit.active') {
            if (value.toString() != null) {
                return value.toString() === 'true' ? 'Yes' : 'No';
            }
            return 'n/a';
        }
        // object
        if (isObject(value)) {
            return get(value, 'name', '-');
        }

        return value;
    }

    render() {
        return (
            <div style={styles.table}>
                {this.renderTable()}
            </div>
        );
    }

    renderActionButtons() {
        return (
            <ActionButtons
                handleEditableState={this.handleEditableState}
                disabled={this.state.disabled}
            />
        );
    }

    handleEditableState() {
        this.setState({ disabled: !this.state.disabled });
    }

    renderTable() {
        const { loading } = this.props;
        const items = this.getItems();
        if (loading) {
            return (
                <CircularProgressCentered />
            );
        }
        const { order, orderBy } = this.state;
        return (
            <div>
                <AppBar
                    title={<span style={styles.title}>Associated units</span>}
                    showMenuIconButton={false}
                    iconElementRight={this.renderActionButtons()}
                />
                <Table>
                    <AssociatedUnitsTableHead
                        columnData={columnData}
                        order={order}
                        orderBy={orderBy}
                        onRequestSort={this.handleRequestSort}
                    />
                    <TableBody>
                        {map(items, (item) => (
                            <TableRow
                                style={{ cursor: 'pointer', height: 40 }}
                                hover
                                onClick={() => this.handleClick(item)}
                                onKeyDown={(event) => this.handleKeyDown(event, item)}
                                tabIndex="-1"
                                key={item.cardId}
                            >
                                {map(columnData, (column) => (
                                    <TableCell
                                        key={column.id}
                                        padding={column.padding}
                                        numeric={column.numeric}
                                        compact
                                    >
                                        {this.getItemValue(item, column)}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        );
    }
}

AssociatedUnitsTable.propTypes = {
    loading: PropTypes.bool.isRequired,
    cards: PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.bool,
    ]),
    onClick: PropTypes.func,
};
AssociatedUnitsTable.contextTypes = {
    styleManager: PropTypes.object.isRequired,
    router: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
    formValues: makeSelectFormFields('AssociatedUnitsTable'),
});

export default connect(mapStateToProps)(reduxForm({
    form: 'AssociatedUnitsTable',
})(AssociatedUnitsTable));
