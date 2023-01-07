import React from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import { DefaultButton } from './ButtonPanel';

type ColumnDefinitionType<T> = {
  key: keyof T;
  header: string;
};

type Props<T> = {
  data: T[];
  columns: ColumnDefinitionType<T>[];
  addItemAction?: () => void;
  editItemAction?: (item: T) => void;
};

export default function CommonTable<T>(props: Props<T>) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label='simple table'>
        <TableHead>
          {props.addItemAction && (
            <DefaultButton
              text='Add New'
              startIcon={<AddIcon />}
              onClick={props.addItemAction}
            />
          )}
          <TableRow>
            {props.columns.map((column) => (
              <TableCell style={{ fontWeight: 'bold' }}>
                {column.header}
              </TableCell>
            ))}
            {props.editItemAction && (
              <TableCell style={{ fontWeight: 'bold' }}>Actions</TableCell>
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {props.data.map((row, index) => (
            <TableRow>
              {props.columns.map((column, index2) => (
                //@ts-ignore
                <TableCell>{row[column.key]}</TableCell>
              ))}

              {props.editItemAction && (
                <TableCell>
                  <DefaultButton
                    text='Edit'
                    startIcon={<EditIcon />}
                    onClick={() =>
                      props.editItemAction && props.editItemAction(row)
                    }
                  />
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
