import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  Grid,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { SubTitle, Title } from '../components/Title';
import {
  getPlanRequest,
  modifyPlanRequest,
  PlanRequest,
} from './planRequestService';
import { PlanRequestHistory } from './components';
import {
  getIspPlansOffered,
  InternetPlans,
} from '../internetPlans/internetPlansService';
import { PlanCard } from '../internetPlans/InternetPlansList';
import { showErrorMessage, showSuccessMessage } from '../components/SnackBar';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { DefaultButton } from '../components/ButtonPanel';

export default function PlanModification() {
  const params = useParams();
  const navigate = useNavigate();
  const [planRequest, setPlanRequest] = useState<PlanRequest>();
  const [internetPlans, setInternetPlans] = useState<InternetPlans[]>([]);
  const [selectedPlan, setSelectedPlan] = React.useState<InternetPlans>();

  useEffect(() => {
    if (!params.id) {
      navigate('/plan-requests');
    }

    getPlanRequest(Number(params.id)).then((response) => {
      setPlanRequest(response.content);

      getIspPlansOffered(
        response.content.request_details[0].internet_plan.user
      ).then((response) => {
        setInternetPlans(response.content);
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClose = () => {
    setSelectedPlan(undefined);
  };

  const handleSubmit = () => {
    if (!selectedPlan) return;

    modifyPlanRequest(Number(params.id), selectedPlan.id)
      .then((response) => {
        showSuccessMessage(response.message);
        navigate('/my_requests');
      })
      .catch((err) => {
        showErrorMessage(err.response.data.message || 'Unexcpected Error');
      });
  };

  return (
    <>
      <Title text='Plan Modification' />

      <DefaultButton
        text='Go Back'
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate(-1)}
      />

      <SubTitle text='Plan Request History' />

      {planRequest &&
        planRequest.request_details.map((rd) => <PlanRequestHistory {...rd} />)}

      <SubTitle text='Choose New Plan from the same Isp' />

      <Grid container spacing={2}>
        {internetPlans.map((ip) => (
          <Grid item xs={4}>
            <PlanCard
              isClient
              plan={ip}
              isp={internetPlans[0].user}
              setPlan={setSelectedPlan}
            />
          </Grid>
        ))}
      </Grid>

      <Dialog open={!!selectedPlan} onClose={handleClose}>
        <DialogTitle>
          {'Confirm plan modification to ' + selectedPlan?.description + '?'}
        </DialogTitle>

        <DialogActions>
          <Button onClick={handleClose} color='error'>
            Cancel
          </Button>
          <Button onClick={handleSubmit} autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
