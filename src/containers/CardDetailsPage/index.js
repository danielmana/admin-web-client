import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { reduxForm } from 'redux-form/immutable';
import { Grid, Row, Col } from 'react-flexbox-grid';
import { createStructuredSelector } from 'reselect';
import Paper from 'material-ui/Paper';
import { Card, CardText } from 'material-ui/Card';
import isEmpty from 'lodash/isEmpty';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import reducerUserInfo from 'containers/UserInfo/reducer';
import sagaUserInfo from 'containers/UserInfo/saga';
import { ContentWrapper } from 'containers/App/index';
import CircularProgressCentered from 'components/CircularProgressCentered';
import CardInformation, { ACTION_UPDATE, ACTION_REISSUE, ACTION_DELETE } from 'components/CardInformation';
import UserInformation from 'components/UserInformation';
import EnhancedTable from 'components/EnhancedTable';
import TableRowTransactionDetails from 'components/TableRowTransactionDetails';
import { updateUserInfo } from 'containers/UserInfo/actions';
import { loadCardDetails, updateCardInformation, reissueCard, deleteCard, loadTransactionHistory } from './actions';
import {
  makeSelectLoading,
  makeSelectError,
  makeSelectCardDetails,
  makeSelectTransactions,
  makeSelectCardMigration,
} from './selectors';
import reducer from './reducer';
import saga from './saga';

const styles = {
  gridContainer: {
    margin: 0,
  },
  card: {
    width: '100%',
  },
};

const columnData = [
  { id: 'date', label: 'Date' },
  { id: 'merchantName', label: 'Merchant name' },
  { id: 'amount', label: 'Amount' },
  { id: 'transactionStatus', label: 'Transaction status' },
  { id: 'businessName', label: 'Business name' },
  { id: 'cardholderName', label: 'Cardholder name' },
  { id: 'cardType', label: 'Card type' },
  { id: 'last4', label: 'Card last 4' },
  { id: 'transactionId', label: 'Transaction ID' },
  { id: 'transactionType', label: 'Transaction type' },
];

export class CardDetailsPage extends React.PureComponent {
  // eslint-disable-line react/prefer-stateless-function

  constructor() {
    super();
    this.onItemClick = this.onItemClick.bind(this);
    this.handleCardAction = this.handleCardAction.bind(this);
  }

  componentWillMount() {
    const { dispatchLoadCardDetails, match: { params: { id } } } = this.props;
    dispatchLoadCardDetails(id);
  }

  onItemClick(item) {
    const { dispatchLoadTransactionHistory } = this.props;
    dispatchLoadTransactionHistory(item.transactionId);
  }

  handleCardAction(action, data) {
    const { dispatchUpdateCardInformation, dispatchCardReissue, dispatchCardDelete } = this.props;
    if (action === ACTION_UPDATE) {
      dispatchUpdateCardInformation(data);
    } else if (action === ACTION_REISSUE) {
      dispatchCardReissue(data);
    } else if (action === ACTION_DELETE) {
      dispatchCardDelete(data);
    }
  }

  render() {
    const { loading } = this.props;
    if (loading) {
      return <CircularProgressCentered />;
    }
    const { cardDetails } = this.props;
    if (!cardDetails) {
      return null;
    }

    const { dispatchUpdateUserInfo, cardMigration } = this.props;
    return (
      <ContentWrapper>
        <Grid fluid style={styles.gridContainer}>
          <Row>
            <Col xs={12} md={6}>
              <UserInformation userInfo={cardDetails.user} businessInfo={cardDetails} update={dispatchUpdateUserInfo} />
            </Col>
            <br />
            <Col xs={12} md={6}>
              <CardInformation cardInfo={cardDetails} cardMigration={cardMigration} onAction={this.handleCardAction} />
            </Col>
          </Row>
          <br />
          <Row>{this.renderTransactions()}</Row>
        </Grid>
      </ContentWrapper>
    );
  }

  renderTransactions() {
    const { transactions } = this.props;
    if (isEmpty(transactions)) {
      return (
        <Card style={styles.card}>
          <CardText>No transactions</CardText>
        </Card>
      );
    }
    const { loading } = this.props;
    return (
      <div>
        <Paper zDepth={1}>
          <EnhancedTable
            loading={loading}
            data={transactions}
            columnData={columnData}
            onClick={this.onItemClick}
            renderRowNested={this.renderRowNested}
            itemsFieldId="transactionId"
          />
        </Paper>
      </div>
    );
  }

  renderRowNested(item) {
    return <TableRowTransactionDetails transaction={item} colSpan={columnData.length} />;
  }
}

CardDetailsPage.propTypes = {
  loading: PropTypes.bool,
  cardDetails: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  transactions: PropTypes.oneOfType([PropTypes.bool, PropTypes.array]),
  cardMigration: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  dispatchLoadCardDetails: PropTypes.func.isRequired,
  dispatchUpdateUserInfo: PropTypes.func.isRequired,
  dispatchUpdateCardInformation: PropTypes.func.isRequired,
  dispatchCardReissue: PropTypes.func.isRequired,
  dispatchCardDelete: PropTypes.func.isRequired,
  dispatchLoadTransactionHistory: PropTypes.func.isRequired,
};

CardDetailsPage.contextTypes = {
  router: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  loading: makeSelectLoading(),
  error: makeSelectError(),
  cardDetails: makeSelectCardDetails(),
  transactions: makeSelectTransactions(),
  cardMigration: makeSelectCardMigration(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatchLoadCardDetails: (id) => {
      dispatch(loadCardDetails(id));
    },
    dispatchUpdateUserInfo: (data) => {
      dispatch(updateUserInfo(data.toJS()));
    },
    dispatchUpdateCardInformation: (data) => {
      dispatch(updateCardInformation(data.toJS()));
    },
    dispatchCardReissue: (data) => {
      dispatch(reissueCard(data.toJS()));
    },
    dispatchCardDelete: (data) => {
      dispatch(deleteCard(data.toJS()));
    },
    dispatchLoadTransactionHistory: (id) => {
      dispatch(loadTransactionHistory(id));
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withForm = reduxForm({
  form: 'CardDetailsPageForm',
});

const withReducer = injectReducer({ key: 'cardDetailsPage', reducer });
const withReducerUserInfo = injectReducer({ key: 'userInfo', reducer: reducerUserInfo });
const withSaga = injectSaga({ key: 'cardDetailsPage', saga });
const withSagaUserInfo = injectSaga({ key: 'userInfo', saga: sagaUserInfo });

export default compose(
  withReducer,
  withReducerUserInfo,
  withSaga,
  withSagaUserInfo,
  withConnect,
  withForm,
)(CardDetailsPage);
