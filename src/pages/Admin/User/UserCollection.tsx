import React from 'react';
import { userStore } from '../../../services/stores/User';
import Header from '../../../components/Header';
import { activity } from "../../../services/ActivityStore";
import { observer } from "mobx-react";

@observer
export class UserCollection extends React.Component<any, any> {

  public state: any = {
    member: [],
  };

  componentDidMount(): void {
    activity.add('get-users');
    userStore.collection().then((users: any) => {
      activity.remove('get-users');

      console.log(users['hydra:member']);

      this.setState({
        member: users['hydra:member']
      });
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
    return (
      <>
        <Header/>

      </>
    );
  }
}
