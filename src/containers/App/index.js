/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import MuiThemeProvider from 'components-next/material-ui/styles/MuiThemeProvider';
import createPalette from 'components-next/material-ui/styles/palette';
import createMuiTheme from 'components-next/material-ui/styles/theme';
import { blue, pink } from 'components-next/material-ui/styles/colors';
import LeftMenu from 'components/LeftMenu';

import LoadingProgress from 'components/LoadingProgress';
import SnackbarError from 'components/SnackbarError';
import SnackbarSuccess from 'components/SnackbarSuccess';
import { resetError, resetSuccess } from './actions';
import { makeSelectLoading, makeSelectCurrentUser, makeSelectError, makeSelectSuccess } from './selectors';


export const ContentWrapper = styled.div`
  background-color: #ebebeb;
  position: fixed;
  top: 0;
  left: 256px;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
`;

class App extends React.Component {

  getChildContext() {
    const primary = {
      ...blue,
      500: '#246ab2',
    };
    const accent = {
      ...pink,
      500: '#bc236e',
    };
    const palette = createPalette({
      primary,
      accent,
      type: 'light',
    });
    const { styleManager, theme } = MuiThemeProvider.createDefaultContext({
      theme: createMuiTheme({ palette }),
    });
    return { styleManager, theme };
  }

  render() {
    const { children } = this.props;
    return (
      <div>
        <Helmet
          titleTemplate="%s - Admin Portal"
          defaultTitle="Admin Portal"
          meta={[
            { name: 'description', content: 'A React.js application for Admin Portal' },
          ]}
        />
        <div>
          {this.renderLeftMenu()}
          {children}
          {this.renderLoading()}
          {this.renderError()}
          {this.renderSuccess()}
        </div>
      </div>
    );
  }

  renderLeftMenu() {
    const { location: { pathname } } = this.props;
    if (pathname === '/login') {
      return;
    }
    return (
      <LeftMenu
        pathname={pathname}
      />
    );
  }

  renderLoading() {
    const { loading } = this.props;
    if (!loading) {
      return;
    }
    return (
      <LoadingProgress />
    );
  }

  renderError() {
    const { error, onErrorRequestClose } = this.props;
    return (
      <SnackbarError
        error={error}
        onRequestClose={onErrorRequestClose}
      />
    );
  }

  renderSuccess() {
    const { isSuccessSnackbarDisplayed, onSuccessRequestClose } = this.props;
    return (
      <SnackbarSuccess
        isSuccessSnackbarDisplayed={isSuccessSnackbarDisplayed}
        onRequestClose={onSuccessRequestClose}
      />
    );
  }
}

App.propTypes = {
  children: PropTypes.node,
  loading: PropTypes.bool,
  location: PropTypes.object,
  error: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.bool,
  ]),
  isSuccessSnackbarDisplayed: PropTypes.bool,
  onErrorRequestClose: PropTypes.func,
  onSuccessRequestClose: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  loading: makeSelectLoading(),
  currentUser: makeSelectCurrentUser(),
  error: makeSelectError(),
  isSuccessSnackbarDisplayed: makeSelectSuccess(),
});

function mapDispatchToProps(dispatch) {
  return {
    onErrorRequestClose: () => {
      dispatch(resetError());
    },
    onSuccessRequestClose: () => {
      dispatch(resetSuccess());
    },
  };
}

App.childContextTypes = {
  styleManager: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps, mapDispatchToProps)(App);