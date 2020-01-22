import React from 'react'
import {translate} from 'react-polyglot'
import {AppBar, Button, Typography} from "@material-ui/core";
import Toolbar from "@material-ui/core/Toolbar";
import {Link} from "react-router-dom";

class Header extends React.Component<any, any> {
  public render() {
    const {t} = this.props;

    return (
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">
            Application
          </Typography>
          <Link to="/login">Login</Link>
        </Toolbar>
      </AppBar>
    )
  }
}

export default translate()(Header)
