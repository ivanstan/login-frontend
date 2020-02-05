import React from 'react';
import { User } from '../../../services/stores/User';

export class UserCollection extends React.Component<any, any> {

  componentDidMount(): void {
    let reponse = User.get(3).then(user => {

      console.log(user)

      user.active = false;

      User.update(user).then(user2 => {

        console.log(user2)

      })

    });

  }

  render(): any {
    return <div></div>;
  }
}
