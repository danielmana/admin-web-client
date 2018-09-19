import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { reduxForm } from 'redux-form/immutable';
import { createStructuredSelector } from 'reselect';
import { Grid, Row, Col } from 'react-flexbox-grid';
import AppBar from 'material-ui/AppBar';
import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';
import isEmpty from 'lodash/isEmpty';

import { ContentWrapper } from 'containers/App/index';
import CircularProgressCentered from 'components/CircularProgressCentered';
import UserInformation from 'components/UserInformation';
import BusinessInformation from 'components/BusinessInformation';
import BusinessNotes from 'components/BusinessNotes';
import BusinessClassification from 'components/BusinessClassification';
import CardShippingAddress from 'components/CardShippingAddress';
import BankingSubscriptionPlan from 'components/BankingSubscriptionPlan';
import InitiateCredit from 'components/InitiateCredit';
import InitiateDebit from 'components/InitiateDebit';
import TableCards from 'components/TableCards';
import BusinessMigrationInformation from 'components/MigrationInformation';

import { updateUserInfo } from 'containers/UserInfo/actions';
import { makeSelectLoadingUserInfo, makeSelectUserInfo } from 'containers/UserInfo/selectors';

import { loadUser, loadUserCards, loadCardHistory } from './actions';
import { getBusinessClassification, updateBusinessClassification } from './BusinessClassification/actions';
import { updateBusinessInfo } from './BusinessInfo/actions';
import { updateBankingSubscriptionPlan } from './BankingSubscriptionPlan/actions';
import { updateCardShippingAddress } from './CardShippingAddress/actions';
import { setInitiateCreditDebit } from './InitiateCreditDebit/actions';
import {
  createNewBusinessNotes,
  editBusinessNotes,
  selectBusinessNoteToEdit,
  deleteBusinessNote,
} from './BusinessNotes/actions';
import { getMigrationInfo } from './MigrationInfo/actions';

import {
  makeSelectLoading,
  makeSelectUser,
  makeSelectLoadingCards,
  makeSelectUserCards,
  makeSelectPage,
} from './selectors';
import { makeSelectLoadingBusinessInfo, makeSelectBusinessInfo } from './BusinessInfo/selectors';
import {
  makeSelectLoadingBankingSubscriptionPlan,
  makeSelectBankingSubscriptionPlan,
} from './BankingSubscriptionPlan/selectors';
import {
  makeSelectLoadingCardShippingAddress,
  makeSelectCardShippingAddressSuccess,
} from './CardShippingAddress/selectors';
import { makeSelectSelectedBusinessNoteToEdit, makeSelectBusinessNotes } from './BusinessNotes/selectors';
import { makeSelectBusinessClassification } from './BusinessClassification/selectors';
import { makeSelectBusinessMigrationInfo, makeSelectNewBusinessUsers } from './MigrationInfo/selectors';

const styles = {
  gridContainer: {
    margin: '24px 0',
  },
};

export class UserPage extends React.Component {
  componentWillMount() {
    const {
      dispatchLoadUser,
      dispatchLoadUserCard,
      dispatchGetBusinessClassification,
      dispatchGetBusinessMigrationInfo,
      routeParams,
    } = this.props;
    dispatchLoadUser(routeParams);
    dispatchLoadUserCard(routeParams, 1);
    dispatchGetBusinessClassification(routeParams);
    dispatchGetBusinessMigrationInfo(routeParams);
  }

  onCardsPageChange = (value) => {
    const { dispatchLoadUserCard, routeParams } = this.props;
    dispatchLoadUserCard(routeParams, value.page);
  };

  onCardSelected = (value) => {
    const { dispatchLoadCardHistory } = this.props;
    dispatchLoadCardHistory(value.cardId);
  };

  render() {
    const {
      user,
      loading,
      dispatchUpdateUserInfo,
      dispatchUpdateBusinessInfo,
      dispatchUpdateCardShippingAddress,
      dispatchSetInitiateCreditDebit,
      dispatchCreateNewBusinessNotes,
      dispatchEditBusinessNoteSubmit,
      dispatchSelectBusinessNoteToEdit,
      dispatchSelectDeleteBusinessNote,
      dispatchUpdateBusinessClassification,
      selectedBusinessNoteToEdit,
      businessNotes,
      businessClassification,
    } = this.props;
    const businessInfo = user[0];
    const userInfo = user[1] && user[1].user ? user[1].user : user[1];
    if (loading) {
      return <CircularProgressCentered />;
    }
    return (
      <ContentWrapper>
        <Grid fluid style={styles.gridContainer}>
          <Row>{this.renderBackButton()}</Row>
          <Row>
            <Col xs={12} md={6}>
              <UserInformation userInfo={userInfo} businessInfo={businessInfo} update={dispatchUpdateUserInfo} />
              <br />
              {this.renderBankingInfo()}
            </Col>
            <Col xs={12} md={6}>
              <BusinessInformation
                userInfo={userInfo}
                businessInfo={businessInfo}
                update={dispatchUpdateBusinessInfo}
              />
              <br />
              {businessInfo.brand === 'BENTO' && (
                <div>
                  <Row>
                    <Col xs={12}>{this.renderMigrationInfo(businessInfo)}</Col>
                  </Row>
                  <br />
                </div>
              )}
              <CardShippingAddress businessInfo={businessInfo} update={dispatchUpdateCardShippingAddress} />
              <br />
              <BusinessClassification
                businessId={businessInfo.businessId}
                businessClassification={businessClassification}
                onUpdateBusinessClassification={dispatchUpdateBusinessClassification}
              />
            </Col>
          </Row>
          <br />
          <Row>
            <Col xs={12} md={6}>
              <InitiateCredit
                setInitiateCreditDebit={dispatchSetInitiateCreditDebit}
                businessId={businessInfo.businessId}
              />
            </Col>
            <Col xs={12} md={6}>
              <InitiateDebit
                setInitiateCreditDebit={dispatchSetInitiateCreditDebit}
                businessId={businessInfo.businessId}
              />
            </Col>
          </Row>
          <br />
          <Row>
            <Col xs={12}>{this.renderCards()}</Col>
          </Row>
          <br />
          <Row>
            <Col xs={12}>
              <BusinessNotes
                businessId={businessInfo.businessId}
                notes={businessNotes}
                onCreateNewBusinessNoteSubmit={dispatchCreateNewBusinessNotes}
                onEditBusinessNoteSubmit={dispatchEditBusinessNoteSubmit}
                selectedBusinessNoteToEdit={selectedBusinessNoteToEdit}
                selectBusinessNoteToEdit={dispatchSelectBusinessNoteToEdit}
                deleteBusinessNote={dispatchSelectDeleteBusinessNote}
              />
            </Col>
          </Row>
          <br />
        </Grid>
      </ContentWrapper>
    );
  }

  renderMigrationInfo = (businessInfo) => {
    const { businessMigrationInfo, newBusinessUsers } = this.props;
    if (isEmpty(businessMigrationInfo)) {
      return null;
    }
    return (
      <BusinessMigrationInformation
        businessMigrationInfo={businessMigrationInfo}
        isOldBusiness={businessInfo.program === 'bento_cfsb'}
        newBusinessUsers={newBusinessUsers}
      />
    );
  };

  renderBankingInfo = () => {
    const { user, dispatchUpdateBankingSubscriptionPlan } = this.props;

    // FIXME saga/reducer should provide an object
    const bankingInfo = user[2];
    if (isEmpty(bankingInfo)) {
      return;
    }
    const subscriptionInfo = user[3];
    return (
      <BankingSubscriptionPlan
        bankingInfo={bankingInfo}
        subscriptionInfo={subscriptionInfo}
        update={dispatchUpdateBankingSubscriptionPlan}
      />
    );
  };

  renderBackButton = () => <FlatButton label="Back to Search" onClick={this.handleBackButton} />;

  handleBackButton = () => {
    const { history } = this.props;
    history.push('/users');
  };

  renderCards = () => {
    const { loadingCards, userCards, page } = this.props;
    return (
      <Paper zDepth={1}>
        <AppBar title="Associated units" showMenuIconButton={false} />
        <TableCards
          loading={loadingCards}
          data={userCards}
          page={page}
          onPageChange={this.onCardsPageChange}
          onClick={this.onCardSelected}
        />
      </Paper>
    );
  };
}

UserPage.propTypes = {
  dispatchLoadUser: PropTypes.func.isRequired,
  dispatchLoadUserCard: PropTypes.func.isRequired,
  dispatchUpdateUserInfo: PropTypes.func.isRequired,
  dispatchUpdateBusinessInfo: PropTypes.func.isRequired,
  dispatchUpdateCardShippingAddress: PropTypes.func.isRequired,
  dispatchUpdateBankingSubscriptionPlan: PropTypes.func.isRequired,
  dispatchSetInitiateCreditDebit: PropTypes.func.isRequired,
  dispatchCreateNewBusinessNotes: PropTypes.func.isRequired,
  dispatchEditBusinessNoteSubmit: PropTypes.func.isRequired,
  dispatchSelectDeleteBusinessNote: PropTypes.func.isRequired,
  dispatchSelectBusinessNoteToEdit: PropTypes.func.isRequired,
  dispatchGetBusinessClassification: PropTypes.func.isRequired,
  dispatchUpdateBusinessClassification: PropTypes.func.isRequired,
  dispatchGetBusinessMigrationInfo: PropTypes.func.isRequired,
  routeParams: PropTypes.oneOfType([PropTypes.array, PropTypes.bool, PropTypes.object]),
  user: PropTypes.oneOfType([PropTypes.array, PropTypes.bool, PropTypes.object]),
  userCards: PropTypes.oneOfType([PropTypes.array, PropTypes.bool, PropTypes.object]),
  loading: PropTypes.bool,
  loadingCards: PropTypes.bool,
  page: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
  dispatchLoadCardHistory: PropTypes.func.isRequired,
  selectedBusinessNoteToEdit: PropTypes.number,
  businessNotes: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  businessClassification: PropTypes.object,
  businessMigrationInfo: PropTypes.object,
  newBusinessUsers: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};

UserPage.contextTypes = {
  router: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  user: makeSelectUser(),
  loading: makeSelectLoading(),
  loadingCards: makeSelectLoadingCards(),
  userCards: makeSelectUserCards(),
  loadUserInfo: makeSelectLoadingUserInfo(),
  userInfo: makeSelectUserInfo(),
  loadBusinessInfo: makeSelectLoadingBusinessInfo(),
  businessInfo: makeSelectBusinessInfo(),
  loadingBankingSubscriptionPlan: makeSelectLoadingBankingSubscriptionPlan(),
  bankingSubscriptionPlan: makeSelectBankingSubscriptionPlan(),
  loadingCardShippingAddress: makeSelectLoadingCardShippingAddress(),
  cardShippingAddressSuccess: makeSelectCardShippingAddressSuccess(),
  page: makeSelectPage(),
  selectedBusinessNoteToEdit: makeSelectSelectedBusinessNoteToEdit(),
  businessNotes: makeSelectBusinessNotes(),
  businessClassification: makeSelectBusinessClassification(),
  newBusinessUsers: makeSelectNewBusinessUsers(),
  businessMigrationInfo: makeSelectBusinessMigrationInfo(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatchLoadUser: (routeParams) => {
      dispatch(loadUser(routeParams));
    },
    dispatchLoadUserCard: (routeParams, page) => {
      dispatch(loadUserCards(routeParams, page));
    },
    dispatchGetBusinessClassification: (routeParams, page) => {
      dispatch(getBusinessClassification(routeParams, page));
    },
    dispatchUpdateBusinessClassification: (data) => {
      dispatch(updateBusinessClassification(data));
    },
    dispatchUpdateUserInfo: (data) => {
      dispatch(updateUserInfo(data.toJS()));
    },
    dispatchUpdateBusinessInfo: (data) => {
      dispatch(updateBusinessInfo(data.toJS()));
    },
    dispatchUpdateCardShippingAddress: (data) => {
      dispatch(updateCardShippingAddress(data.toJS()));
    },
    dispatchUpdateBankingSubscriptionPlan: (data) => {
      dispatch(updateBankingSubscriptionPlan(data.toJS()));
    },
    dispatchSetInitiateCreditDebit: (data) => {
      dispatch(setInitiateCreditDebit(data));
    },
    dispatchLoadCardHistory: (id) => {
      dispatch(loadCardHistory(id));
    },
    dispatchCreateNewBusinessNotes: (data) => {
      dispatch(createNewBusinessNotes(data));
    },
    dispatchEditBusinessNoteSubmit: (data) => {
      dispatch(editBusinessNotes(data));
    },
    dispatchSelectBusinessNoteToEdit: (data) => {
      dispatch(selectBusinessNoteToEdit(data));
    },
    dispatchSelectDeleteBusinessNote: (data) => {
      dispatch(deleteBusinessNote(data));
    },
    dispatchGetBusinessMigrationInfo: (routeParams) => {
      dispatch(getMigrationInfo(routeParams));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(
  reduxForm({
    form: 'UserPageForm',
  })(withRouter(UserPage))
);
