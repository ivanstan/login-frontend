import {Route} from 'react-router-dom';
import React from 'react';
import {Else, If, Then} from 'react-if';
import { Redirect } from "react-router-dom";

export class PrivateRoute extends React.Component<any, any> {
  render(): any {
    const {props} = this.props;

    return (
      <If condition={true}>
        <Then>
          <Route {...props} />
        </Then>
        <Else>
          <Redirect to="/login"/>
        </Else>
      </If>
    );
  }
}
