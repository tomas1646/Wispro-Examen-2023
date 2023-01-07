import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
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
import FormTextField from '../components/TextField';
import FormNumberField from '../components/TextField';
import CommonTable from '../components/CommonTable';

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

      <CommonTable<InternetPlans>
        data={internetPlans}
        columns={[
          { key: 'description', header: 'Description' },
          { key: 'price', header: 'Price' },
        ]}
        addItemAction={() => {
          setFormAction(FormActions.New);
          handleFormOpen({ description: '', price: 0 } as InternetPlans);
        }}
        editItemAction={(item: InternetPlans) => {
          setFormAction(FormActions.Edit);
          handleFormOpen(item);
        }}
      />
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
