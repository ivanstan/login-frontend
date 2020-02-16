import React from 'react'
import {translate} from 'react-polyglot'
import {AppBar, IconButton, Menu, MenuItem, Typography} from "@material-ui/core";
import Toolbar from "@material-ui/core/Toolbar";
import {Link} from "react-router-dom";
import {AccountCircle} from "@material-ui/icons";
import {store} from "../services/stores/Store";
import {withStyles} from '@material-ui/core/styles';
import {If} from "react-if";

const userMenuId = 'primary-user-menu';

const useStyles: any = theme => ({
  container: {
    display: 'flex',
  },
  title: {
    marginRight: theme.spacing(2),
  },
  mainMenu: {
    flexGrow: 1
  }
});

class Header extends React.Component<any, any> {

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
    const {t, classes} = this.props;
    const anon = store.user === null;

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
        <MenuItem onClick={this.logout}>{t('Logout')}</MenuItem>
      </Menu>
    );

    return (
      <AppBar position="static">
        <Toolbar className={classes.container}>
          <Typography variant="h6" className={classes.title}>
            {t('Application')}
          </Typography>

          <div className={classes.mainMenu}>
            <If condition={anon}>
              <Link to="/login">{t('Login')}</Link>
            </If>
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

export default translate()(withStyles(useStyles)(Header))
