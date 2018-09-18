// Component adapted from a demo on the `next` branch of material-ui
// https://github.com/callemall/material-ui/blob/next/docs/site/src/demos/tables/EnhancedTable.js
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  TableHead,
  TableRow,
  TableCell,
  TableSortLabel,
} from 'components-next/material-ui/Table';


export default class EnhancedTableHead extends Component {
  static propTypes = {
    columnData: PropTypes.array,
    onRequestSort: PropTypes.func,
    order: PropTypes.string,
    orderBy: PropTypes.string,
  };

  createSortHandler = (property) => (event) => this.props.onRequestSort(event, property);

  getColumnWidth(id) {
    if (/checkbox|id/.test(id)) {
      return 50;
    } else if (/lastUpdated/.test(id)) {
      return 100;
    }
    return 'initial';
  }

  render() {
    const { columnData, order, orderBy } = this.props;
    return (
      <TableHead>
        <TableRow style={{ height: 40 }}>
          {columnData.map((column) => (
            <TableCell
              style={{ width: this.getColumnWidth(column.id) }}
              key={column.id}
              numeric={column.numeric}
              padding={column.padding}
              compact
            >
              <TableSortLabel
                active={orderBy === column.id}
                direction={order}
                onClick={this.createSortHandler(column.id)}
              >
                {column.label}
              </TableSortLabel>
            </TableCell>
          ), this)}
        </TableRow>
      </TableHead>
    );
  }
}
