import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form/immutable';
import { createStructuredSelector } from 'reselect';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import ReactDropzone from 'react-dropzone';
import head from 'lodash/head';

import FormSelectField from 'components/Form/FormSelectField';
import { createValidator, required } from 'utils/validation';
import { DOCUMENT_TYPES } from '../constants';
import { uploadDocument } from '../actions';

const validate = createValidator({
  document: [required],
  type: [required],
});

class DialogUploadDocument extends React.PureComponent {
  // eslint-disable-line react/prefer-stateless-function

  constructor(props) {
    super(props);
    this.onDrop = this.onDrop.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      file: null,
    };
  }

  onDrop(file) {
    this.setState({ file });
  }

  handleSubmit(values) {
    const { onCancel, dispatchUploadDocument } = this.props;
    const { file } = this.state;
    const data = {
      ...values.toJS(),
      file,
    };
    dispatchUploadDocument(data);
    onCancel();
  }

  render() {
    const { visible } = this.props;
    return (
      <div>
        <form>
          <Dialog
            title="Upload document"
            actions={this.renderDialogActions()}
            modal={false}
            open={visible}
            autoScrollBodyContent
          >
            {this.renderFileType()}
            {this.renderFileDropzone()}
            {this.renderFilePreview()}
          </Dialog>
        </form>
      </div>
    );
  }

  renderFileType() {
    return <Field name="type" label="Type" component={FormSelectField} options={DOCUMENT_TYPES} required />;
  }

  renderFileDropzone() {
    return (
      <ReactDropzone
        style={{
          width: '100%',
          borderWidth: 2,
          border: '2px dashed grey',
          borderRadius: 5,
          padding: '0 20px',
          margin: '20px 0',
        }}
        multiple={false}
        onDrop={(acceptedFiles) => this.onDrop(head(acceptedFiles))}
      >
        <p>Drop the file here, or click to select the file to upload.</p>
      </ReactDropzone>
    );
  }

  renderFilePreview() {
    const { file } = this.state;
    if (!file) {
      return;
    }
    return (
      <img
        style={{ width: '100%', padding: '0 20%' }}
        src={file.preview}
        alt={file.name}
        onLoad={() => window.dispatchEvent(new Event('resize'))}
      />
    );
  }

  renderDialogActions() {
    const { onCancel, handleSubmit } = this.props;
    return [
      <FlatButton label="Cancel" onClick={onCancel} />,
      <RaisedButton
        style={{ marginLeft: 20 }}
        type="submit"
        label="Upload"
        onClick={handleSubmit((values) => this.handleSubmit(values))}
        disabled={!this.state.file}
        secondary
      />,
    ];
  }
}

DialogUploadDocument.propTypes = {
  dispatchUploadDocument: PropTypes.func,
  onCancel: PropTypes.func,
  visible: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({});

function mapDispatchToProps(dispatch) {
  return {
    dispatchUploadDocument: (data) => {
      dispatch(uploadDocument(data));
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  reduxForm({
    form: 'DialogUploadDocumentForm',
    validate,
  })(DialogUploadDocument)
);
