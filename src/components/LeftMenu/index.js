import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Drawer from 'material-ui/Drawer';
import Divider from 'material-ui/Divider';
import { List, ListItem, makeSelectable } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import map from 'lodash/map';

import { configureThemeDark } from 'configureTheme';
import storage from 'utils/storage';
import { MENU_ITEMS } from './constants';
import messages from './messages';
import logo from './bento_logo.png';

const styles = {
  menuItemSubHeaderStyle: {
    fontSize: 12,
    letterSpacing: 1.17,
    textTransform: 'uppercase',
    height: 46,
    cursor: 'default',
  },
  menuItemStyle: {
    fontSize: 12,
    paddingLeft: 61,
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

class LeftMenu extends React.PureComponent {
  constructor(props) {
    super(props);
    this.onMenuItemSelected = this.onMenuItemSelected.bind(this);
    this.renderMenuItem = this.renderMenuItem.bind(this);
  }

  onMenuItemSelected(event, value) {
    const { history } = this.props;
    if (value === 'logout') {
      storage.removeUser();
      history.push('/login');
    } else {
      history.push(value);
    }
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <Drawer docked>{this.renderMenu()}</Drawer>
      </MuiThemeProvider>
    );
  }

  renderMenu() {
    const { pathname } = this.props;
    return (
      <SelectableList value={pathname} onChange={this.onMenuItemSelected}>
        {this.renderLogo()}
        {map(MENU_ITEMS, this.renderMenuItem)}
        <Divider />
        {this.renderLogout()}
      </SelectableList>
    );
  }

  renderLogo() {
    return <img src={logo} alt="Logo" style={styles.menuLogoStyle} />;
  }

  renderMenuItem(menuItem) {
    if (menuItem.pathname === '') {
      return (
        <Subheader key={menuItem.id} style={styles.menuItemSubHeaderStyle}>
          <FormattedMessage {...messages[menuItem.id]} />
        </Subheader>
      );
    }
    return (
      <ListItem key={menuItem.id} value={menuItem.pathname} style={styles.menuItemStyle}>
        <FormattedMessage {...messages[menuItem.id]} />
      </ListItem>
    );
  }

  renderLogout() {
    return (
      <ListItem style={styles.menuItemStyle} value="logout">
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

export default withRouter(LeftMenu);
