import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form/immutable';
import AppBar from 'material-ui/AppBar';
import Paper from 'material-ui/Paper';
import { createStructuredSelector } from 'reselect';

import { makeSelectFormField } from 'containers/App/selectors';

import DialogConfirm from 'components/Dialogs/DialogConfirm';
import FormSelectField from 'components/Form/FormSelectField';
import ActionButtons from 'components/ActionButtons';

import { BUSINESS_CLASSIFICATIONS_TYPES } from './constants';

class BusinessClassification extends React.PureComponent {
  // eslint-disable-line react/prefer-stateless-function

  constructor(props) {
    super(props);
    this.handleOnCancelClick = this.handleOnCancelClick.bind(this);
    this.handleOnEditClick = this.handleOnEditClick.bind(this);
    this.handleAddNewBusinessNote = this.handleAddNewBusinessNote.bind(this);
    this.onDialogCancel = this.onDialogCancel.bind(this);
    this.state = {
      disabled: true,
      isModalOpen: false,
    };
  }

  componentWillMount() {
    const { businessClassification } = this.props;
    this.props.initialize({
      mappedBusinessClassification: businessClassification.classificationType,
    });
  }

  handleAddNewBusinessNote() {
    this.setState({
      isModalOpen: true,
    });
  }

  handleOnEditClick() {
    this.setState({ disabled: false });
  }

  handleOnCancelClick() {
    this.setState({ disabled: true });
    this.props.reset(); // eslint-disable-line react/prop-types
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <div>
        <form onSubmit={handleSubmit(this.handleAddNewBusinessNote)}>
          <Paper zDepth={1} style={{ paddingBottom: 1 }}>
            <AppBar
              title="Business Classification"
              showMenuIconButton={false}
              iconElementRight={this.renderActionButtons()}
            />
            <div style={{ margin: 10 }}>
              <Field
                name="mappedBusinessClassification"
                hintText="- Select -"
                options={BUSINESS_CLASSIFICATIONS_TYPES}
                component={FormSelectField}
                disabled={this.state.disabled}
              />
            </div>
          </Paper>
        </form>
        {this.renderConfirmDialog()}
      </div>
    );
  }

  renderActionButtons() {
    return (
      <ActionButtons
        onEditClick={this.handleOnEditClick}
        onCancelClick={this.handleOnCancelClick}
        disabled={this.state.disabled}
      />
    );
  }

  renderConfirmDialog() {
    const {
      onUpdateBusinessClassification,
      mappedBusinessClassification,
      businessClassification,
      businessId,
    } = this.props;
    const data = {
      businessId,
      classificationType: mappedBusinessClassification,
    };
    if (businessClassification.notes) {
      data.notes = businessClassification.notes;
    }
    return (
      <DialogConfirm
        visible={this.state.isModalOpen}
        onCancel={this.onDialogCancel}
        onSubmit={onUpdateBusinessClassification}
        data={data}
      />
    );
  }

  onDialogCancel() {
    this.setState({
      isModalOpen: false,
    });
  }
}

BusinessClassification.propTypes = {
  businessId: PropTypes.number.isRequired,
  businessClassification: PropTypes.object,
  mappedBusinessClassification: PropTypes.string,
  onUpdateBusinessClassification: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func,
  initialize: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  mappedBusinessClassification: makeSelectFormField('BusinessClassification', 'mappedBusinessClassification'),
});

export default connect(mapStateToProps)(
  reduxForm({
    form: 'BusinessClassification',
  })(BusinessClassification)
);
