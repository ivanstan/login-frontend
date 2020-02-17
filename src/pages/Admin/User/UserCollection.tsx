import React from 'react';
import { userStore } from '../../../services/stores/User';
import Header from '../../../components/Header';
import { DataGrid } from 'tubular-react/dist';
import { ColumnModel } from 'tubular-common';
import { IconButton } from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import { activity } from "../../../services/ActivityStore";
import { observer } from "mobx-react";

const columns = [new ColumnModel('id', {
  label: 'test',
  sortable: true


}), new ColumnModel('email')];

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
        <DataGrid columns={columns} dataSource={this.state.member} gridName="Users">


          <IconButton color="default" onClick={() => alert('I can help you to add features to your datagrid.')}>
            <AddIcon/>
          </IconButton>
        </DataGrid>
      </>
    );
  }
}
