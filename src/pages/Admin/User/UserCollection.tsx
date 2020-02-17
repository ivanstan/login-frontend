import React from 'react';
import { userDataSource } from '../../../services/data/UserDataSource';
import Header from '../../../components/Header';
import { observer } from "mobx-react";
import { Container } from "@material-ui/core";
import { DataGrid } from "../../../components/DataGrid/DataGrid";
import { Column } from "../../../components/DataGrid/Column";
import { translate } from "react-polyglot";
import { withStyles } from "@material-ui/core/styles";

const useStyles: any = theme => ({});

@observer
class UserCollection extends React.Component<any, any> {

  private columns: Column[] = [];

  constructor(props) {
    super(props);

    const { t } = this.props;

    this.columns = [
      new Column('email', t('Email', {primary: true}))
    ];
  }

  render(): any {

    return (
      <>
        <Header/>
        <Container>
          <DataGrid data={userDataSource} columns={this.columns}/>
        </Container>
      </>
    );
  }
}

export default translate()(withStyles(useStyles)(UserCollection))
