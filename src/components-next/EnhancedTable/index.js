// Component adapted from a demo on the `next` branch of material-ui
// https://github.com/callemall/material-ui/blob/next/docs/site/src/demos/tables/EnhancedTable.js
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import keycode from 'keycode';
import get from 'lodash/get';
import map from 'lodash/map';
import isObject from 'lodash/isObject';
import isArray from 'lodash/isArray';
import isNumber from 'lodash/isNumber';
import isEqual from 'lodash/isEqual';
import isBoolean from 'lodash/isBoolean';
import _orderBy from 'lodash/orderBy';
import { toMoney, toCardCreatedDate, mapValues } from 'utils/helpers';

import CircularProgressCentered from 'components/CircularProgressCentered';
import {
    Table,
    TableBody,
    TableRow,
    TableCell,
} from 'components-next/material-ui/Table';
import EnhancedTableHead from './EnhancedTableHead';

const styles = {
    table: {
        overflowX: 'auto',
    },
};

class EnhancedTable extends Component {

    constructor(props) {
        super(props);
        this.renderRow = this.renderRow.bind(this);
        this.renderCell = this.renderCell.bind(this);
        this.handleRequestSort = this.handleRequestSort.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.handleClick = this.handleClick.bind(this);

        this.state = {
            order: 'desc',
            orderBy: 'lastUpdated',
            data: null,
            selected: [],
        };
    }

    componentWillReceiveProps(nextProps) {
        const { data } = this.props;
        if (!isEqual(nextProps.data, data)) {
            this.setState({ data: nextProps.data });
        }
    }

    getItems() {
        const { orderBy, order } = this.state;
        return _orderBy(this.state.data || this.props.data, [orderBy], [order]);
    }

    handleRequestSort(event, property) {
        const orderBy = property;
        let order = 'desc';
        if (this.state.orderBy === property && this.state.order === 'desc') {
            order = 'asc';
        }
        this.setState({ order, orderBy });
    }

    handleKeyDown(item) {
        if (keycode(event) === 'space') {
            this.handleClick(item);
        }
    }

    handleClick(item) {
        const { selected } = this.state;
        const { itemsFieldId } = this.props;
        const id = item[itemsFieldId || 'id'];
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }
        this.setState({ selected: newSelected });

        const { onClick } = this.props;
        if (onClick) {
            onClick(item);
        }
    }

    isSelected(item) {
        const { itemsFieldId } = this.props;
        const id = item[itemsFieldId || 'id'];
        return this.state.selected.indexOf(id) !== -1;
    }

    getItemValue(item, columnData) {
        // use callback if any
        if (columnData.callback) {
            return columnData.callback(item);
        }
        const id = get(columnData, 'id');
        let value = get(item, id);

        // date
        if (columnData.date || id === 'date') {
            return value ? toCardCreatedDate(value) : '-';
        }
        // amount
        if (id === 'amount') {
            return value ? toMoney(value) : '-';
        }
        // array
        if (isArray(value)) {
            return columnData.numeric ? value.length : mapValues(value, 'name');
        }
        // object
        if (isObject(value)) {
            return get(value, 'name', '-');
        }
        // boolean
        if (isBoolean(value)) {
            return value.toString();
        }
        // number
        if (isNumber(value)) {
            value = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
            // prefix for IDs
            if (id === 'id') {
                value = `#${value}`;
            }
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

    renderTable() {
        const { loading } = this.props;
        const items = this.getItems();
        if (loading) {
            return <CircularProgressCentered />;
        }
        const { order, orderBy } = this.state;
        const { columnData } = this.props;
        return (
            <Table>
                <EnhancedTableHead
                    key={columnData.id}
                    columnData={columnData}
                    order={order}
                    orderBy={orderBy}
                    onRequestSort={this.handleRequestSort}
                />
                <TableBody>
                    {map(items, (item, index) => [this.renderRow(item, index), this.renderRowNestedIfNecessary(item, index)])}
                </TableBody>
            </Table>
        );
    }

    renderRow(item, index) {
        const { columnData, renderRowNested } = this.props;
        const background = renderRowNested && this.isSelected(item) ? '#fecd2f' : 'initial';
        return (
            <TableRow
                key={index}
                style={{ cursor: 'pointer', height: 40, background }}
                hover
                onClick={() => this.handleClick(item)}
                onKeyDown={() => this.handleKeyDown(item)}
                tabIndex="-1"
            >
                {map(columnData, (column) => this.renderCell(item, column))}
            </TableRow>
        );
    }

    renderCell(item, column) {
        return (
            <TableCell
                key={column.id}
                padding={column.padding}
                numeric={column.numeric}
                compact
            >
                {this.getItemValue(item, column)}
            </TableCell>
        );
    }

    renderRowNestedIfNecessary(item, index) {
        const { renderRowNested } = this.props;
        if (!renderRowNested || !this.isSelected(item)) {
            return;
        }
        return renderRowNested(item, index);
    }
}

EnhancedTable.propTypes = {
    loading: PropTypes.bool.isRequired,
    data: PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.bool,
    ]),
    columnData: PropTypes.array,
    onClick: PropTypes.func,
    renderRowNested: PropTypes.func,
    itemsFieldId: PropTypes.string,
};
EnhancedTable.contextTypes = {
    styleManager: PropTypes.object.isRequired,
};

export default EnhancedTable;
