import React from 'react';
import PropTypes from 'prop-types';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import head from 'lodash/head';
import get from 'lodash/get';

class DialogDelete extends React.PureComponent {
  // eslint-disable-line react/prefer-stateless-function

  render() {
    const { visible, onCancel } = this.props;
    return (
      <Dialog
        title="Delete"
        actions={this.renderDialogActions()}
        modal={false}
        open={visible}
        onRequestClose={onCancel}
      >
        {this.renderDialogContent()}
      </Dialog>
    );
  }

  renderDialogContent() {
    const { data } = this.props;
    if (!data) {
      return <span>Are you sure?</span>;
    } else if (data.length > 1) {
      const { dataType } = this.props;
      return (
        <span>
          Are you sure you want to delete {data.length} {dataType || 'items'}?
        </span>
      );
    }
    const item = head(data);
    const text = get(item, 'name') || get(item, 'title');
    return (
      <span>
        Are you sure you want to delete <b>{text}</b> ?
      </span>
    );
  }

  renderDialogActions() {
    const { data, onCancel, onSubmit } = this.props;
    return [
      <FlatButton label="Cancel" onClick={onCancel} />,
      <FlatButton
        style={{ marginLeft: 20 }}
        labelStyle={{ color: '#F44336' }}
        label="Delete"
        keyboardFocused
        onClick={() => onSubmit(data)}
      />,
    ];
  }
}

DialogDelete.propTypes = {
  data: PropTypes.array,
  dataType: PropTypes.string,
  visible: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default DialogDelete;
