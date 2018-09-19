import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form/immutable';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import { createStructuredSelector } from 'reselect';
import map from 'lodash/map';

import { makeSelectFormField } from 'containers/App/selectors';

import getBusinessNoteComponent from 'components/BusinessNotes/BusinessNote';

import DialogConfirm from 'components/Dialogs/DialogConfirm';
import FormTextField from 'components/Form/FormTextField';

import { createValidator, minLength } from 'utils/validation';

class BusinessNotes extends React.PureComponent {
  // eslint-disable-line react/prefer-stateless-function

  constructor(props) {
    super(props);
    this.handleAddNewBusinessNote = this.handleAddNewBusinessNote.bind(this);
    this.onDialogCancel = this.onDialogCancel.bind(this);
    this.state = {
      isModalOpen: false,
    };
  }

  componentWillMount() {
    const { note } = this.props;
    this.props.initialize({
      note,
    });
  }

  handleAddNewBusinessNote() {
    this.setState({
      isModalOpen: true,
    });
  }

  render() {
    const { note, notes, handleSubmit } = this.props;
    return (
      <div>
        <Paper zDepth={1} style={{ paddingBottom: 1 }}>
          <AppBar title="Business Notes" showMenuIconButton={false} />
          <div style={{ margin: 10 }}>
            <form onSubmit={handleSubmit(this.handleAddNewBusinessNote)}>
              <Field name="note" label="New Note" component={this.renderMultilineTextField} />
              <RaisedButton label="Add Note" type="submit" disabled={!(note && note.length >= 1)} primary />
            </form>
          </div>
          {map(notes, (n) => this.renderCommentCards(n))}
        </Paper>
        {this.renderConfirmDialog()}
      </div>
    );
  }

  renderCommentCards(note) {
    const {
      onEditBusinessNoteSubmit,
      businessId,
      selectedBusinessNoteToEdit,
      selectBusinessNoteToEdit,
      deleteBusinessNote,
    } = this.props;
    const BusinessNote = getBusinessNoteComponent(note.id.toString());
    return (
      <BusinessNote
        key={note.id}
        note={note}
        businessId={businessId}
        onEditBusinessNoteSubmit={onEditBusinessNoteSubmit}
        selectedBusinessNoteToEdit={selectedBusinessNoteToEdit}
        selectBusinessNoteToEdit={selectBusinessNoteToEdit}
        deleteBusinessNote={deleteBusinessNote}
      />
    );
  }

  renderMultilineTextField(field) {
    return (
      <FormTextField
        floatingLabelText={field.label}
        hintText="Add New Note"
        type="textarea"
        style={{ width: '100%' }}
        input={field.input}
        meta={field.meta}
        multiLine
      />
    );
  }

  renderConfirmDialog() {
    const { onCreateNewBusinessNoteSubmit, note, businessId } = this.props;
    return (
      <DialogConfirm
        visible={this.state.isModalOpen}
        onCancel={this.onDialogCancel}
        onSubmit={onCreateNewBusinessNoteSubmit}
        data={{ note, businessId }}
      />
    );
  }

  onDialogCancel() {
    this.setState({
      isModalOpen: false,
    });
  }
}

BusinessNotes.propTypes = {
  businessId: PropTypes.number.isRequired,
  notes: PropTypes.array.isRequired,
  note: PropTypes.string,
  onCreateNewBusinessNoteSubmit: PropTypes.func.isRequired,
  onEditBusinessNoteSubmit: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func,
  selectedBusinessNoteToEdit: PropTypes.number.isRequired,
  selectBusinessNoteToEdit: PropTypes.func.isRequired,
  deleteBusinessNote: PropTypes.func.isRequired,
  initialize: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  note: makeSelectFormField('BusinessNotes', 'note'),
});

const validate = createValidator({
  note: minLength(1),
});

export default connect(mapStateToProps)(
  reduxForm({
    form: 'BusinessNotes',
    validate,
  })(BusinessNotes)
);
