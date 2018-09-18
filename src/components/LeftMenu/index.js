import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Drawer from 'material-ui/Drawer';
import { List, ListItem, makeSelectable } from 'material-ui/List';
import map from 'lodash/map';

import { configureThemeDark } from 'theme/configureTheme';
import storage from 'utils/storage';
import { MENU_ITEMS } from './constants';
import messages from './messages';
import logo from './bento_logo.png';


const styles = {
    menuItemStyle: {
        fontSize: 10,
        paddingLeft: 41,
        letterSpacing: 1.17,
        textTransform: 'uppercase',
        height: 46,
    },
    menuItemStyleSearch: {
        fontSize: 12,
        paddingLeft: 41,
        color: '#6F7380',
        letterSpacing: 1.17,
        textTransform: 'uppercase',
        height: 46,
    },
    menuLogoStyle: {
        display: 'block',
        maxWidth: '100%',
        height: 'auto',
        margin: '30px auto',
    },
};

const muiTheme = configureThemeDark();
const SelectableList = makeSelectable(List);

class LeftMenu extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

    constructor(props) {
        super(props);
        this.onMenuItemSelected = this.onMenuItemSelected.bind(this);
        this.renderMenuItem = this.renderMenuItem.bind(this);
    }

    onMenuItemSelected(event, value) {
        if (value === 'logout') {
            storage.removeUser();
            this.context.router.push('/login');
        } else {
            this.context.router.push(value);
        }
    }

    render() {
        return (
            <MuiThemeProvider muiTheme={muiTheme}>
                <Drawer
                    docked
                >
                    {this.renderMenu()}
                </Drawer>
            </MuiThemeProvider>
        );
    }

    renderMenu() {
        const { pathname } = this.props;
        return (
            <SelectableList
                value={pathname}
                onChange={this.onMenuItemSelected}
            >
                {this.renderLogo()}
                {map(MENU_ITEMS, this.renderMenuItem)}
                {this.renderLogout()}
            </SelectableList>
        );
    }

    renderLogo() {
        return (
            <img
                src={logo}
                alt="{logo}"
                style={styles.menuLogoStyle}
            />
        );
    }

    renderMenuItem(menuItem, index) {
        return (
            <ListItem
                key={menuItem.id}
                value={menuItem.pathname}
                style={(index % 2) ? styles.menuItemStyleSearch : styles.menuItemStyle}
            >
                <FormattedMessage {...messages[menuItem.id]} />
            </ListItem>
        );
    }

    renderLogout() {
        return (
            <ListItem
                style={styles.menuItemStyleSearch}
                value="logout"
            >
                Logout
      </ListItem>
        );
    }
}

LeftMenu.propTypes = {
    pathname: PropTypes.string,
};

LeftMenu.contextTypes = {
    router: PropTypes.object,
};

export default LeftMenu;
