import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { reduxForm } from 'redux-form/immutable';
import Paper from 'material-ui/Paper';
import { Card, CardText } from 'material-ui/Card';
import Pagination from 'materialui-pagination';

import { ContentWrapper } from 'containers/App/index';
import EnhancedTable from 'components/EnhancedTable';
import TableRowTransactionDetails from 'components/TableRowTransactionDetails';
import { loadTransactions, loadTransactionHistory } from './actions';
import { makeSelectLoading, makeSelectTransactions, makeSelectPage } from './selectors';
import TransactionsFilters from './TransactionsFilters';

import { DEFAULT_PAGE_SIZE } from './constants';

const columnData = [
  { id: 'date', label: 'Date' },
  { id: 'merchantName', label: 'Merchant name' },
  { id: 'amount', label: 'Amount' },
  { id: 'transactionStatus', label: 'Transaction status' },
  { id: 'businessName', label: 'Business name' },
  { id: 'deleted', label: 'Deleted' },
  { id: 'cardholderName', label: 'Cardholder name' },
  { id: 'lastFour', label: 'Card last four' },
  { id: 'transactionType', label: 'Transaction type' },
  { id: 'transactionId', label: 'Transaction ID' },
  { id: 'cardType', label: 'Card type' },
];

class TransactionsPage extends React.PureComponent {
  // eslint-disable-line react/prefer-stateless-function

  constructor() {
    super();
    this.onItemClick = this.onItemClick.bind(this);
    this.onPageChange = this.onPageChange.bind(this);
  }

  componentDidMount() {
    const { dispatchLoadTransactions } = this.props;
    dispatchLoadTransactions(1, {});
  }

  onItemClick(item) {
    const { dispatchLoadTransactionHistory } = this.props;
    dispatchLoadTransactionHistory(item.transactionId);
  }

  onPageChange(value) {
    const { dispatchLoadTransactions } = this.props;
    dispatchLoadTransactions(value.page);
  }

  render() {
    return (
      <ContentWrapper>
        <TransactionsFilters />
        {this.renderTable()}
        {this.renderPagination()}
      </ContentWrapper>
    );
  }

  renderTable() {
    const { loading, transactions } = this.props;
    if (transactions !== null && transactions.count !== 0) {
      return (
        <Paper zDepth={1}>
          <EnhancedTable
            loading={loading}
            data={transactions.results}
            columnData={columnData}
            onClick={this.onItemClick}
            renderRowNested={this.renderRowNested}
            itemsFieldId="transactionId"
          />
        </Paper>
      );
    }
    return (
      <Card>
        <CardText>No results</CardText>
      </Card>
    );
  }

  renderRowNested(item) {
    return <TableRowTransactionDetails transaction={item} colSpan={columnData.length} />;
  }

  renderPagination() {
    const { transactions } = this.props;
    if (!transactions || !transactions.count) {
      return;
    }
    const { page } = this.props;
    return (
      <Card>
        <Pagination
          total={transactions.count}
          rowsPerPage={[DEFAULT_PAGE_SIZE]}
          page={page}
          numberOfRows={DEFAULT_PAGE_SIZE}
          updateRows={this.onPageChange}
        />
      </Card>
    );
  }
}

TransactionsPage.propTypes = {
  dispatchLoadTransactions: PropTypes.func.isRequired,
  dispatchLoadTransactionHistory: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  transactions: PropTypes.oneOfType([PropTypes.array, PropTypes.bool, PropTypes.object]),
  page: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
};

TransactionsPage.contextTypes = {
  router: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  loading: makeSelectLoading(),
  transactions: makeSelectTransactions(),
  page: makeSelectPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatchLoadTransactions: (page, filters) => {
      dispatch(loadTransactions(page, filters));
    },
    dispatchLoadTransactionHistory: (id) => {
      dispatch(loadTransactionHistory(id));
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  reduxForm({
    form: 'TransactionsPage',
  })(TransactionsPage)
);
