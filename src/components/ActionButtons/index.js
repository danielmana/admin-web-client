import React from 'react';
import PropTypes from 'prop-types';
import FlatButton from 'material-ui/FlatButton';

const styles = {
  btnContainer: {
    marginTop: 5,
    btnSaveCancelStyle: {
      backgroundColor: 'transparent',
      color: 'white',
      textDecoration: 'underline',
    },
    btnEditStyle: {
      backgroundColor: 'transparent',
      color: 'white',
      marginTop: 5,
    },
  },
};

class ActionButtons extends React.PureComponent {
  // eslint-disable-line react/prefer-stateless-function
  renderActions() {
    const { disabled, handleEditableState, btnEditStyle, btnSaveStyle, btnCancelStyle } = this.props;
    const onEditClick = handleEditableState === undefined ? this.props.onEditClick : handleEditableState;
    const onCancelClick = handleEditableState === undefined ? this.props.onCancelClick : handleEditableState;
    if (disabled) {
      return (
        <FlatButton
          label="Edit"
          onClick={onEditClick}
          style={Object.assign({}, styles.btnContainer.btnEditStyle, btnEditStyle || {})}
        />
      );
    }

    return (
      <div style={styles.btnContainer}>
        <FlatButton
          label="Cancel"
          onClick={onCancelClick}
          style={Object.assign({}, styles.btnContainer.btnSaveCancelStyle, btnCancelStyle || {})}
        />
        <FlatButton
          label="Save"
          type="submit"
          style={Object.assign({}, styles.btnContainer.btnSaveCancelStyle, btnSaveStyle || {})}
        />
      </div>
    );
  }

  render() {
    return <div style={{ display: 'inline-block' }}>{this.renderActions()}</div>;
  }
}

ActionButtons.propTypes = {
  disabled: PropTypes.bool,
  handleEditableState: PropTypes.func,
  onEditClick: PropTypes.func,
  onCancelClick: PropTypes.func,
  btnSaveStyle: PropTypes.object,
  btnCancelStyle: PropTypes.object,
  btnEditStyle: PropTypes.object,
};

export default ActionButtons;
