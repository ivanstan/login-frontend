import React from 'react'
import {translate} from 'react-polyglot'
import {AppBar, IconButton, Menu, MenuItem, Typography} from "@material-ui/core";
import Toolbar from "@material-ui/core/Toolbar";
import {Link} from "react-router-dom";
import {AccountCircle} from "@material-ui/icons";
import {store} from "../services/stores/Store";

const userMenuId = 'primary-user-menu';

class Header extends React.Component<any, any> {

  private userMenu: React.RefObject<unknown> = React.createRef();

  public state: any = {
    userMenuAnchor: null,
  };

  public handleUserMenuOpen = (event: any) => {
    this.setState({userMenuAnchor: event.currentTarget});
  };

  public handleUserMenuClose = () => {
    this.setState({userMenuAnchor: null});
  };

  public logout: () => void = () => {
    store.logout();
    this.handleUserMenuClose();
  };

  public render = () => {
    const {userMenuAnchor} = this.state;
    const {t} = this.props;

    const userMenu = (
      <Menu
        anchorEl={userMenuAnchor}
        anchorOrigin={{vertical: 'top', horizontal: 'right'}}
        id={userMenuId}
        keepMounted
        transformOrigin={{vertical: 'top', horizontal: 'right'}}
        open={userMenuAnchor !== null}
        onClose={this.handleUserMenuClose}
      >
        <MenuItem onClick={this.handleUserMenuClose}>{t('Profile')}</MenuItem>
        <MenuItem onClick={this.logout}>{t('Logout')}</MenuItem>
      </Menu>
    );

    return (
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">
            {t('Application')}
          </Typography>

          <div>
            <Link to="/login">{t('Login')}</Link>
          </div>

          <div>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={userMenuId}
              aria-haspopup="true"
              onClick={this.handleUserMenuOpen}
              color="inherit"
            >
              <AccountCircle/>
            </IconButton>
          </div>

        </Toolbar>
        {userMenu}
      </AppBar>
    )
  };
}

export default translate()(Header)
