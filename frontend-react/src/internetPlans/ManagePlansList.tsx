import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import React, { useEffect } from 'react';
import { showErrorMessage, showSuccessMessage } from '../components/SnackBar';
import { Title } from '../components/Title';
import {
  createPlan,
  GetIspPlans,
  InternetPlans,
  updatePlan,
} from './internetPlansService';
import EditIcon from '@mui/icons-material/Edit';
import FormTextField from '../components/TextField';
import FormNumberField from '../components/TextField';
import AddIcon from '@mui/icons-material/Add';

enum FormActions {
  Edit = 'Edit',
  New = 'New',
}

export default function ManagePlansList() {
  const [selectedPlan, setSelectedPlan] = React.useState<InternetPlans>();
  const [descriptionField, setDescriptionField] = React.useState<string>('');
  const [priceField, setPriceField] = React.useState<number>(0);
  const [internetPlans, setInternetPlans] = React.useState<InternetPlans[]>([]);
  const [updateData, setUpdateData] = React.useState<number>(Math.random());
  const [formAction, setFormAction] = React.useState<FormActions>();

  useEffect(() => {
    GetIspPlans()
      .then((response) => {
        setInternetPlans(response.content);
      })
      .catch((err) => {
        showErrorMessage(err.response.data.message || 'Unexcpected Error');
      });
  }, [updateData]);

  const handleFormOpen = (ip: InternetPlans) => {
    setSelectedPlan(ip);
    setDescriptionField(ip.description);
    setPriceField(ip.price);
  };

  const handleFormClose = () => {
    setSelectedPlan(undefined);
    setDescriptionField('');
    setPriceField(0);
    setFormAction(undefined);
  };

  const handleFormSubmit = () => {
    if (!descriptionField || !priceField) {
      showErrorMessage('Inputs cannot be empty');
      return;
    }

    if (formAction === FormActions.Edit) {
      handleEdit();
    }

    if (formAction === FormActions.New) {
      handleNew();
    }
  };

  const handleEdit = () => {
    if (!selectedPlan) return;

    updatePlan(selectedPlan.id, descriptionField, priceField)
      .then((response) => {
        showSuccessMessage(response.message);
        handleFormClose();
        setUpdateData(Math.random());
      })
      .catch((err) =>
        showErrorMessage(err.response.data.message || 'Unexcpected Error')
      );
  };

  const handleNew = () => {
    createPlan(descriptionField, priceField)
      .then((response) => {
        showSuccessMessage(response.message);
        handleFormClose();
        setUpdateData(Math.random());
      })
      .catch((err) =>
        showErrorMessage(err.response.data.message || 'Unexcpected Error')
      );
  };

  return (
    <>
      <Title text='Manage Plans' />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
          <TableHead>
            <Button
              variant='outlined'
              startIcon={<AddIcon />}
              onClick={() => {
                setFormAction(FormActions.New);
                handleFormOpen({ description: '', price: 0 } as InternetPlans);
              }}
            >
              Add New
            </Button>
            <TableRow>
              <TableCell style={{ fontWeight: 'bold' }}>Description</TableCell>
              <TableCell style={{ fontWeight: 'bold' }}>Price</TableCell>
              <TableCell style={{ fontWeight: 'bold' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {internetPlans.map((row) => (
              <TableRow key={row.description}>
                <TableCell>{row.description}</TableCell>
                <TableCell>{row.price}</TableCell>
                <TableCell>
                  <Button
                    variant='outlined'
                    startIcon={<EditIcon />}
                    onClick={() => {
                      setFormAction(FormActions.Edit);
                      handleFormOpen(row);
                    }}
                  >
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={!!selectedPlan} onClose={handleFormClose} fullWidth>
        <DialogTitle>{formAction} Plan</DialogTitle>
        <DialogContent>
          <FormTextField
            title='Description'
            label='Description'
            name='description'
            value={descriptionField}
            setValue={setDescriptionField}
          />
          <FormNumberField
            title='Price'
            label='Price'
            name='price'
            value={priceField.toString()}
            setValue={setPriceField}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleFormClose}>Cancel</Button>
          <Button onClick={handleFormSubmit}>Confirm</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
