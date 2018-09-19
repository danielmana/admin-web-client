import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FlatButton, RaisedButton, FontIcon, Toolbar, ToolbarGroup, Paper } from 'material-ui';

import CircularProgressCentered from 'components/CircularProgressCentered';
import DialogDelete from 'components/Dialogs/DialogDelete';


const RootWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const styles = {
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  form: {
    flex: 1,
    flexDirection: 'column',
    overflow: 'auto',
    marginBottom: 55,
    padding: 20,
  },
  toolbar: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
  },
};

class Form extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  constructor(props) {
    super(props);
    this.goBack = this.goBack.bind(this);
    this.setDialogDeleteVisible = this.setDialogDeleteVisible.bind(this);
    this.onDeleteSubmit = this.onDeleteSubmit.bind(this);
    this.onCopySubmit = this.onCopySubmit.bind(this);

    this.state = {
      dialogDeleteVisible: false,
    };
  }

  goBack() {
    const { history, dataType, backRoute } = this.props;
    if (!backRoute) {
      history.push(`/${dataType}`);
    } else {
      history.push(`/${backRoute}`);
    }
  }

  setDialogDeleteVisible(dialogDeleteVisible) {
    this.setState({
      dialogDeleteVisible,
    });
  }

  onDeleteSubmit() {
    const { deleteItem, item } = this.props;
    this.setDialogDeleteVisible(false);
    deleteItem(item);
  }

  onCopySubmit() {
    const { history, item, copyItem } = this.props;
    return copyItem(item)
      .then((copy) => {
        const { dataType } = this.props;
        history.push(`/${dataType}/${copy.id}/edit`);
      });
  }

  render() {
    const { loading, submitting } = this.props;
    if (loading || submitting) {
      return <CircularProgressCentered />;
    }
    return (
      <RootWrapper>
        {this.renderForm()}
      </RootWrapper>
    );
  }

  renderForm() {
    const { handleSubmit, submit, children } = this.props;
    return (
      <form
        style={styles.form}
        onSubmit={handleSubmit((values) => submit(values))}
      >
        {children}
        {this.renderToolbar()}
        {this.renderDialogDelete()}
      </form>
    );
  }

  renderToolbar() {
    return (
      <Paper
        style={styles.toolbar}
        zDepth={2}
        rounded={false}
      >
        <Toolbar>
          <ToolbarGroup
            style={{ flex: 1 }}
            firstChild
          >
            {this.renderActionDelete()}
          </ToolbarGroup>
          <ToolbarGroup lastChild>
            {this.renderActionCancel()}
            {this.renderActionCopy()}
            {this.renderActionSave()}
          </ToolbarGroup>
        </Toolbar>
      </Paper>
    );
  }

  renderActionDelete() {
    const { item, deleteItem } = this.props;
    if (!item || !deleteItem) {
      return;
    }
    return (
      <FlatButton
        type="button"
        label="Delete"
        icon={<FontIcon className="material-icons">delete</FontIcon>}
        onClick={() => this.setDialogDeleteVisible(true)}
      />
    );
  }

  renderActionCancel() {
    return (
      <FlatButton
        type="button"
        label="Cancel"
        icon={<FontIcon className="material-icons">close</FontIcon>}
        onClick={this.goBack}
      />
    );
  }

  renderActionCopy() {
    const { item, copyItem } = this.props;
    if (!item || !item.id || !copyItem) {
      return;
    }
    return (
      <FlatButton
        type="button"
        label="Duplicate"
        icon={<FontIcon className="material-icons">content_copy</FontIcon>}
        onClick={this.onCopySubmit}
      />
    );
  }

  renderActionSave() {
    const { pristine, submitting, submitLabel } = this.props;
    return (
      <RaisedButton
        type="submit"
        label={submitLabel || 'Save'}
        secondary
        icon={<FontIcon className="material-icons">done</FontIcon>}
        disabled={pristine || submitting}
      />
    );
  }

  renderDialogDelete() {
    const { dataType, item } = this.props;
    const { dialogDeleteVisible } = this.state;
    return (
      <DialogDelete
        data={[item]}
        dataType={dataType}
        visible={dialogDeleteVisible}
        onCancel={() => { this.setDialogDeleteVisible(false); }}
        onSubmit={this.onDeleteSubmit}
      />
    );
  }
}

Form.propTypes = {
  item: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.bool,
  ]),
  dataType: PropTypes.string,
  backRoute: PropTypes.string,
  loading: PropTypes.bool,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  deleteItem: PropTypes.func,
  copyItem: PropTypes.func,
  submit: PropTypes.func.isRequired,
  submitLabel: PropTypes.string,
};

Form.contextTypes = {
  router: PropTypes.object,
};

export default withRouter(Form);
