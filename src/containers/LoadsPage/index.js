import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { reduxForm, Field } from 'redux-form/immutable';
import Paper from 'material-ui/Paper';
import { GridList } from 'material-ui/GridList';
import { Card, CardText } from 'material-ui/Card';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { ContentWrapper } from 'containers/App/index';
import Filters from 'components/Filters';
import FormTextField from 'components/Form/FormTextField';
import FormSelectField from 'components/Form/FormSelectField';
import FormDatePicker from 'components/Form/FormDatePicker';
import EnhancedTable from 'components/EnhancedTable';
import Pagination from 'components/Pagination';
import PageField from 'components/PageField';
import { loadLoads } from './actions';
import { makeSelectLoading, makeSelectLoads, makeSelectFilters } from './selectors';
import { DEFAULT_PAGE_SIZE, TRANSACTION_STATUS, LOAD_TYPE } from './constants';
import reducer from './reducer';
import saga from './saga';

const columnData = [
  { id: 'dateInitiated', label: 'Date initiated' },
  { id: 'businessId', label: 'Business id' },
  { id: 'businessName', label: 'Legal Business Name' },
  { id: 'fromAccount', label: 'From account' },
  { id: 'transactionStatus', label: 'Transaction status' },
  { id: 'amount', label: 'Amount' },
  { id: 'avaliableBy', label: 'Avaliable by' },
  { id: 'lastStatusUpdate', label: 'Last status update' },
  { id: 'loadType', label: 'Load type' },
  { id: 'initiatedBy', label: 'initiatedBy' },
];

const styles = {
  gridStyles: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  gridDefault: {
    padding: '0px 16px',
    fontSize: '14px',
    color: 'rgb(14, 53, 81)',
  },
  gridList: {
    display: 'flex',
    flexWrap: 'nowrap',
    overflowX: 'auto',
  },
  actions: {
    paddingLeft: 16,
    paddingBottom: 32,
  },
  pagination: {
    width: 134,
    marginLeft: 5,
  },
  pageSelect: {
    width: 120,
    margin: '0 10px',
    verticalAlign: 'bottom',
  },
};

export class LoadsPage extends React.PureComponent {
  // eslint-disable-line react/prefer-stateless-function

  constructor() {
    super();
    this.onFiltersSubmit = this.onFiltersSubmit.bind(this);
    this.state = {
      page: 1,
    };
  }

  componentDidMount() {
    const {
      dispatchLoadLoads,
      filters,
      location: { query, search },
    } = this.props;
    if (query.businessId) {
      dispatchLoadLoads(search);
    } else {
      dispatchLoadLoads(filters);
    }
  }

  onFiltersSubmit(values) {
    const { dispatchLoadLoads } = this.props;
    dispatchLoadLoads(values);
  }

  render() {
    return (
      <ContentWrapper>
        <Card>{this.renderFilters()}</Card>

        {this.renderTable()}
        <div style={styles.pagination}>{this.renderPagination()}</div>
      </ContentWrapper>
    );
  }

  renderFilters() {
    return (
      <div>
        {this.renderSearchFields()}
        <Filters onSubmit={this.onFiltersSubmit} simpleSearch {...this.props} />
      </div>
    );
  }

  renderSearchFields() {
    return (
      <div style={styles.gridDefault}>
        <GridList cellHeight={75} cols={4} rows={2}>
          {this.renderBusinessName()}
          {this.renderLegalBusinessName()}
          {this.renderBusinessID()}
          {this.renderTransactionStatus()}
          {this.renderStartDate()}
          {this.renderEndDate()}
          {this.renderLoadType()}
        </GridList>
      </div>
    );
  }

  renderBusinessName() {
    return <Field autoFocus name="legalBusinessName" label="Business name" component={FormTextField} />;
  }

  renderLegalBusinessName() {
    return <Field name="businessName" label="Name on card" component={FormTextField} />;
  }

  renderBusinessID() {
    return <Field name="businessId" label="Business ID" component={FormTextField} />;
  }

  renderTransactionStatus() {
    return <Field name="status" label="Transaction status" options={TRANSACTION_STATUS} component={FormSelectField} />;
  }

  renderStartDate() {
    return <Field name="startDate" label="Start Date" component={FormDatePicker} />;
  }

  renderEndDate() {
    return <Field name="endDate" label="End Date" component={FormDatePicker} />;
  }

  renderLoadType() {
    return <Field name="loadType" label="Load type" options={LOAD_TYPE} component={FormSelectField} />;
  }

  renderTable() {
    const { loading, loads } = this.props;
    if (loads !== null && loads.count !== 0) {
      return (
        <Paper zDepth={1}>
          <EnhancedTable loading={loading} data={loads.results} columnData={columnData} />
        </Paper>
      );
    }

    return (
      <Card>
        <CardText>No results</CardText>
      </Card>
    );
  }

  renderPagination() {
    const { loads } = this.props;
    if (loads != null && loads.count !== 0) {
      return (
        <div>
          <PageField data={loads} pageSize={DEFAULT_PAGE_SIZE} />
          <Pagination onSubmit={this.onFiltersSubmit} {...this.props} />
        </div>
      );
    }
  }
}

LoadsPage.propTypes = {
  dispatchLoadLoads: PropTypes.func.isRequired,
  loads: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  loading: PropTypes.bool,
  location: PropTypes.object,
  filters: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
};

const mapStateToProps = createStructuredSelector({
  loading: makeSelectLoading(),
  loads: makeSelectLoads(),
  filters: makeSelectFilters(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatchLoadLoads: (filters) => {
      dispatch(loadLoads(filters));
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withForm = reduxForm({
  form: 'LoadsPageForm',
});

const withReducer = injectReducer({ key: 'loadsPage', reducer });
const withSaga = injectSaga({ key: 'loadsPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
  withForm,
)(LoadsPage);
