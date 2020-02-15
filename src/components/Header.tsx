import React from 'react'
import {translate} from 'react-polyglot'
import {AppBar, IconButton, Menu, MenuItem, Typography} from "@material-ui/core";
import Toolbar from "@material-ui/core/Toolbar";
import {Link} from "react-router-dom";
import {AccountCircle} from "@material-ui/icons";

class Header extends React.Component<any, any> {

  public state: any = {
    anchorEl: null
  };

  isMenuOpen = Boolean(this.state.anchorEl);

  handleProfileMenuOpen = (event: any) => {
    this.setState({anchorEl: event.currentTarget});
  };

  handleMenuClose = () => {
    this.setState({
      anchorEl: null
    });
  };

  public render() {
    const {anchorEl} = this.state;
    const {t} = this.props;

    const menuId = 'primary-search-account-menu';
    const renderMenu = (
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{vertical: 'top', horizontal: 'right'}}
        id={menuId}
        keepMounted
        transformOrigin={{vertical: 'top', horizontal: 'right'}}
        open={this.isMenuOpen}
        onClose={this.handleMenuClose}
      >
        <MenuItem onClick={this.handleMenuClose}>Profile</MenuItem>
        <MenuItem onClick={this.handleMenuClose}>My account</MenuItem>
      </Menu>
    );

    return (
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">
            Application
          </Typography>


          <div>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={this.handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle/>
            </IconButton>
          </div>


          <Link to="/login">Login</Link>
        </Toolbar>
        {renderMenu}
      </AppBar>
    )
  }
}

export default translate()(Header)
