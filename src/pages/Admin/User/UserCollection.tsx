import React from 'react';
import { userStore } from '../../../services/stores/User';

export class UserCollection extends React.Component<any, any> {
  componentDidMount(): void {

    userStore.collection().then(users => {


      console.log(users);

    });

    // userStore.get(2).then(user => {
    //   if (user === null) {
    //     return;
    //   }
    //
    //   console.log(user);
    //
    //   user.active = false;
    //
    //   userStore.update(user).then(user2 => {
    //     console.log(user2);
    //   });
    // });
  }

  render(): any {
    return <div />;
  }
}
