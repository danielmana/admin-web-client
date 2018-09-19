import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form/immutable';
import Card, { CardHeader, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import { createStructuredSelector } from 'reselect';

import { makeSelectFormField } from 'containers/App/selectors';
import { NO_NOTE_SELECTED } from 'containers/UserPage/BusinessNotes/constants';

import ActionButtons from 'components/ActionButtons';
import DialogConfirm from 'components/Dialogs/DialogConfirm';
import FormTextField from 'components/Form/FormTextField';

import { createValidator, minLength } from 'utils/validation';
import { toCardCreatedDate } from 'utils/helpers';

class BusinessNote extends React.PureComponent {
  // eslint-disable-line react/prefer-stateless-function

  constructor(props) {
    super(props);
    this.handleEditBusinessNote = this.handleEditBusinessNote.bind(this);
    this.handleDeleteBusinessNote = this.handleDeleteBusinessNote.bind(this);
    this.onEditDialogCancel = this.onEditDialogCancel.bind(this);
    this.onDeleteDialogCancel = this.onDeleteDialogCancel.bind(this);
    this.handleOnCancelClick = this.handleOnCancelClick.bind(this);
    this.handleOnEditClick = this.handleOnEditClick.bind(this);
    this.state = {
      isEditConfirmDialogOpen: false,
      isDeleteConfirmDialogOpen: false,
      editIsDisabled: true,
    };
  }

  componentWillMount() {
    const { note } = this.props;
    this.props.initialize({
      ...note,
      mappedBusinessNote: note.comment,
    });
  }

  handleEditBusinessNote() {
    this.setState({
      isEditConfirmDialogOpen: true,
    });
  }

  handleDeleteBusinessNote() {
    this.setState({
      isDeleteConfirmDialogOpen: true,
    });
  }

  handleOnCancelClick() {
    const { selectBusinessNoteToEdit } = this.props;
    this.props.reset(); // eslint-disable-line react/prop-types
    selectBusinessNoteToEdit(NO_NOTE_SELECTED);
  }

  handleOnEditClick() {
    const { selectedBusinessNoteToEdit, selectBusinessNoteToEdit, note } = this.props;
    if (selectedBusinessNoteToEdit > NO_NOTE_SELECTED) {
      return;
    }
    selectBusinessNoteToEdit(note.id);
  }

  render() {
    const { note, handleSubmit, selectedBusinessNoteToEdit } = this.props;
    return (
      <Card>
        <form onSubmit={handleSubmit(this.handleEditBusinessNote)}>
          <CardHeader
            title={`${note.createdBy.firstName} ${note.createdBy.lastName} on ${toCardCreatedDate(note.createdOn)}`}
            subtitle={this.renderSubtitleText(note)}
          >
            <div style={{ float: 'right' }}>
              <ActionButtons
                onEditClick={this.handleOnEditClick}
                onCancelClick={this.handleOnCancelClick}
                disabled={selectedBusinessNoteToEdit !== note.id}
                btnSaveStyle={{ color: 'red' }}
                btnCancelStyle={{ color: 'black' }}
                btnEditStyle={{ color: 'black' }}
              />
              {this.renderDeleteButton()}
            </div>
          </CardHeader>
          <CardText>
            <Field
              name="mappedBusinessNote"
              component={this.renderMultilineTextField}
              disabled={selectedBusinessNoteToEdit !== note.id}
            />
          </CardText>
          {this.renderEditConfirmDialog()}
          {this.renderDeleteConfirmDialog()}
        </form>
      </Card>
    );
  }

  renderSubtitleText(note) {
    if (note.createdOn !== note.updatedOn) {
      if (note.createdBy.adminUserId !== note.updatedBy.adminUserId) {
        return `Updated by ${note.updatedBy.firstName} ${note.updatedBy.lastName} on ${toCardCreatedDate(
          note.updatedOn
        )}`;
      }
      return `Updated on ${toCardCreatedDate(note.updatedOn)}`;
    }
  }

  renderDeleteButton() {
    const { note, selectedBusinessNoteToEdit } = this.props;
    if (selectedBusinessNoteToEdit !== note.id) {
      return (
        <FlatButton
          label="Delete"
          disabled={selectedBusinessNoteToEdit > NO_NOTE_SELECTED}
          onClick={this.handleDeleteBusinessNote}
          style={{ backgroundColor: 'transparent', color: 'red' }}
        />
      );
    }
  }

  renderMultilineTextField(field) {
    return (
      <FormTextField
        floatingLabelText={field.label}
        hintText="Add New Note"
        type="textarea"
        style={{ width: '100%', paddingRight: 16, height: '40px', lineHeight: '16px' }}
        input={field.input}
        meta={field.meta}
        disabled={field.disabled}
        multiLine
      />
    );
  }

  renderEditConfirmDialog() {
    const { onEditBusinessNoteSubmit, note, businessId, mappedBusinessNote } = this.props;
    const data = { note, businessId, mappedBusinessNote };
    return (
      <DialogConfirm
        visible={this.state.isEditConfirmDialogOpen}
        onCancel={this.onEditDialogCancel}
        onSubmit={onEditBusinessNoteSubmit}
        data={data}
      />
    );
  }

  renderDeleteConfirmDialog() {
    const { note, deleteBusinessNote } = this.props;
    return (
      <DialogConfirm
        visible={this.state.isDeleteConfirmDialogOpen}
        onCancel={this.onDeleteDialogCancel}
        onSubmit={deleteBusinessNote}
        data={{ noteId: note.id }}
      />
    );
  }

  onEditDialogCancel() {
    this.setState({
      isEditConfirmDialogOpen: false,
    });
  }

  onDeleteDialogCancel() {
    this.setState({
      isDeleteConfirmDialogOpen: false,
    });
  }
}

BusinessNote.propTypes = {
  note: PropTypes.object,
  businessId: PropTypes.number.isRequired,
  mappedBusinessNote: PropTypes.string,
  initialize: PropTypes.func,
  handleSubmit: PropTypes.func,
  onEditBusinessNoteSubmit: PropTypes.func.isRequired,
  selectedBusinessNoteToEdit: PropTypes.number.isRequired,
  selectBusinessNoteToEdit: PropTypes.func.isRequired,
  deleteBusinessNote: PropTypes.func.isRequired,
};

const validate = createValidator({
  mappedBusinessNote: minLength(1),
});

export default (id) => {
  const mapStateToProps = createStructuredSelector({
    mappedBusinessNote: makeSelectFormField(id, 'mappedBusinessNote'),
  });

  return connect(mapStateToProps)(
    reduxForm({
      form: id,
      validate,
    })(BusinessNote)
  );
};
