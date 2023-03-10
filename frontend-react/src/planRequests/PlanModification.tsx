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
import { getPlanRequest, modifyPlanRequest } from './planRequestService';
import {
  InternetPlans,
  searchInternetPlans,
} from '../internetPlans/internetPlansService';
import { PlanCard } from '../internetPlans/InternetPlansList';
import { showErrorMessage, showSuccessMessage } from '../components/SnackBar';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { DefaultButton } from '../components/ButtonPanel';
import { PlanRequestHistory } from '../components/PlanRequestHistory';
import { PlanRequest } from './model';

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

      searchInternetPlans(
        response.content.request_details[0].internet_plan.user.name
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
        navigate('/my-requests');
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
        planRequest.request_details.map((rd, index) => (
          <PlanRequestHistory key={'RequestHistory-' + index} {...rd} />
        ))}

      <SubTitle text='Choose New Plan from the same Isp' />

      <Grid container spacing={2}>
        {internetPlans.map((ip) => (
          <Grid key={'plan' + ip.id} item xs={4}>
            <PlanCard
              isClient
              plan={ip}
              isp={internetPlans[0].user.name}
              setPlan={setSelectedPlan}
            />
          </Grid>
        ))}
      </Grid>

      <Dialog open={!!selectedPlan} onClose={handleClose} fullWidth>
        <DialogTitle>
          {'Please confirm plan modification to ' + selectedPlan?.description}
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
