import React from 'react';
import {
  Paper,
  Stack,
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
  header: string;
  content: (instance: T) => JSX.Element;
  customColor?: (instance: T) => string;
};

type ActionProps<T> = {
  text: string;
  startIcon?: React.ReactNode;
  onClick: (instance: T) => void;
  hideOnCondition?: (instance: T) => boolean;
};

type Props<T> = {
  data: T[];
  columns: ColumnDefinitionType<T>[];
  addItemAction?: () => void;
  editItemAction?: (item: T) => void;
  additionalActions?: ActionProps<T>[];
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
            {(props.editItemAction || props.additionalActions?.length) && (
              <TableCell style={{ fontWeight: 'bold' }}>Actions</TableCell>
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {props.data.map((row) => (
            <TableRow>
              {props.columns.map((column) => (
                <TableCell
                  style={{
                    color: column.customColor && column.customColor(row),
                  }}
                >
                  {column.content(row)}
                </TableCell>
              ))}

              <TableCell>
                <Stack direction='row' spacing={2}>
                  {props.editItemAction && (
                    <DefaultButton
                      text='Edit'
                      startIcon={<EditIcon />}
                      onClick={() =>
                        props.editItemAction && props.editItemAction(row)
                      }
                    />
                  )}
                  {props.additionalActions?.map((action) => {
                    if (action.hideOnCondition && !action.hideOnCondition(row))
                      return null;
                    return (
                      <DefaultButton
                        text={action.text}
                        startIcon={action.startIcon}
                        onClick={() => action.onClick(row)}
                      />
                    );
                  })}
                </Stack>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
