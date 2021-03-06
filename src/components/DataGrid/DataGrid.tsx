import React from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow
} from "@material-ui/core";
import { Pagination } from '@material-ui/lab';
import { activity } from "../../services/ActivityStore";
import { User } from "../../model/User";
import { If } from "react-if";
import { DataSource } from "../../services/data/DataSource";
import { Column } from "./Column";
import { Foreach } from "../Foreach";
import TablePaginationActions from "@material-ui/core/TablePagination/TablePaginationActions";

export interface DataGridPropsInterface {
  data: DataSource,
  columns: Column[]
}

export class DataGrid extends React.Component<DataGridPropsInterface, any> {

  public state = {
    member: [],
    total: 0,
    page: 1,
  };

  componentDidMount(): void {
    activity.add('get-users');
    this.props.data.collection({}).then((response: any) => {
      activity.remove('get-users');

      console.log(response);

      this.setState({
        member: response['hydra:member'] || [],
        total: response['hydra:totalItems'],
      });
    });
  }

  onPaginationChange = (event, page) => {

    this.setState({page: page});
  };

  render(): any {
    const { data, columns } = this.props;
    const { member, total, page } = this.state;

    return (
      <>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <Foreach items={columns}>
                  {(column: Column, key: number) => <TableCell key={key}>{column.title}</TableCell>}
                </Foreach>
              </TableRow>
            </TableHead>
            <TableBody>
              {member.map((row: User) => (
                <TableRow key={row.id ? row.id.toString(10) : ''}>
                  <TableCell component="th" scope="row">
                    {row.email}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <If condition={member.length < total}>
          <TablePagination
            rowsPerPageOptions={[]}
            labelRowsPerPage=''
            component="div"
            count={total}
            rowsPerPage={2}
            page={page}
            onChangePage={this.onPaginationChange}
          />
        </If>
      </>
    );
  }

}
