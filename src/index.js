// Needed for redux-saga es6 generator support
import 'babel-polyfill';

// Import all the third party stuff
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { Switch, Route } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import LanguageProvider from 'containers/LanguageProvider';
import AppPage from 'containers/App';
import LoginPage from 'containers/LoginPage';
import NotFoundPage from 'containers/NotFoundPage';
import configureTheme from 'theme/configureTheme';

import './index.css';
import { translationMessages } from './i18n';
import configureStore from './configureStore';
import registerServiceWorker from './registerServiceWorker';

// Create redux store with history
const initialState = {};
const history = createHistory();
const store = configureStore(initialState, history);
const MOUNT_NODE = document.getElementById('root');

// Import material theme
const muiTheme = configureTheme();

const render = (messages) => {
    ReactDOM.render(
        <Provider store={store}>
            <MuiThemeProvider muiTheme={muiTheme}>
                <LanguageProvider messages={messages}>
                    <ConnectedRouter history={history}>
                        <Switch>
                            <Route exact path="/" component={AppPage} />
                            <Route path="/login" component={LoginPage} />
                            <Route path="" component={NotFoundPage} />
                        </Switch>
                    </ConnectedRouter>
                </LanguageProvider>
            </MuiThemeProvider>
        </Provider>,
        MOUNT_NODE,
    );
};

// Hot reloadable translation json files
if (module.hot) {
    // modules.hot.accept does not accept dynamic dependencies,
    // have to be constants at compile-time
    module.hot.accept('./i18n', () => {
        render(translationMessages);
    });
}

// Chunked polyfill for browsers without Intl support
if (!window.Intl) {
    (new Promise((resolve) => {
        resolve(import('intl'));
    }))
        .then(() => Promise.all([
            import('intl/locale-data/jsonp/en.js'),
        ]))
        .then(() => render(translationMessages))
        .catch((err) => {
            throw err;
        });
} else {
    render(translationMessages);
}

registerServiceWorker();
