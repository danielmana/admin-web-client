import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { reduxForm, Field } from 'redux-form/immutable';
import { RaisedButton, Paper } from 'material-ui';
import { Card } from 'material-ui/Card';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { createValidator, required, email } from 'utils/validation';
import FormTextField from 'components/Form/FormTextField';

import logo from './logo.png';
import { signIn } from './actions';
import { makeSelectLoading, makeSelectSignedIn, makeSelectError } from './selectors';
import reducer from './reducer';
import saga from './saga';

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    paddingTop: 150,
  },
  paper: {
    maxWidth: 500,
  },
  card: {
    padding: 15,
  },
  logo: {
    width: 150,
    padding: '10px 0',
  },
  field: {
    width: '100%',
  },
  button: {
    width: '100%',
    marginTop: 10,
  },
};

const validate = createValidator({
  username: [required, email],
  password: [required],
});

export class LoginPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  submit(data) {
    const { dispatchSignIn } = this.props;
    dispatchSignIn(data);
  }

  render() {
    return (
      <div style={styles.root}>
        {this.renderForm()}
      </div>
    );
  }

  renderForm() {
    const { handleSubmit } = this.props;
    return (
      <Paper
        style={styles.paper}
        zDepth={1}
      >
        <Card style={styles.card}>
          <img
            style={styles.logo}
            src={logo} alt="Bento Admin Portal"
          />
          <form onSubmit={handleSubmit((values) => this.submit(values))} >
            {this.renderFieldEmail()}
            {this.renderFieldPassword()}
            {this.renderSubmitButton()}
          </form>
        </Card>
      </Paper>
    );
  }

  renderFieldEmail() {
    return (
      <Field
        style={styles.field}
        autoFocus
        name="username"
        label="Login"
        component={FormTextField}
      />
    );
  }

  renderFieldPassword() {
    return (
      <Field
        style={styles.field}
        type="password"
        name="password"
        label="Password"
        component={FormTextField}
      />
    );
  }

  renderSubmitButton() {
    const { pristine, submitting, loading } = this.props;
    return (
      <RaisedButton
        style={styles.button}
        type="submit"
        label="Login"
        secondary
        disabled={pristine || submitting || loading}
      />
    );
  }
}

LoginPage.propTypes = {
  loading: PropTypes.bool,
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool,
  submitting: PropTypes.bool,
  dispatchSignIn: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  loading: makeSelectLoading(),
  signedIn: makeSelectSignedIn(),
  error: makeSelectError(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatchSignIn: (credentials) => {
      dispatch(signIn(credentials.toJS()));
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withForm = reduxForm({
  form: 'LoginPageForm',
  validate,
});

// export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
//   form: 'LoginPageForm',
//   validate,
// })(LoginPage));



const withReducer = injectReducer({ key: 'loginPage', reducer });
const withSaga = injectSaga({ key: 'loginPage', saga });

export default compose(
  withReducer,
  withSaga,
  withForm,
  withConnect,
)(LoginPage);