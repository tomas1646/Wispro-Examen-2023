import {
  Button,
  Card,
  CardActions,
  CardContent,
  Dialog,
  DialogActions,
  DialogTitle,
  Grid,
} from '@mui/material';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { showErrorMessage, showSuccessMessage } from '../components/SnackBar';
import { createPlanRequest } from '../planRequests/planRequestService';
import { useSessionUser } from '../store/userStore';
import { getPlansGroupedByIsp, InternetPlans } from './internetPlansService';
import EastIcon from '@mui/icons-material/East';
import { DefaultButton } from '../components/ButtonPanel';

export default function InternetPlansList() {
  const user = useSessionUser();
  const navigate = useNavigate();
  const isClient = user?.type === 'Client';
  const [internetPlans, setInternetPlans] = React.useState<
    Map<String, InternetPlans[]>
  >(new Map<string, InternetPlans[]>());
  const [selectedPlan, setSelectedPlan] = React.useState<InternetPlans>();

  useEffect(() => {
    getPlansGroupedByIsp()
      .then((response) => {
        const map = new Map<string, InternetPlans[]>(
          Object.entries(response.content)
        );
        setInternetPlans(map);
      })
      .catch((err) => {
        showErrorMessage(err.response.data.message || 'Unexcpected Error');
      });
  }, []);

  const handleClose = () => {
    setSelectedPlan(undefined);
  };

  const handleSubmit = () => {
    if (!selectedPlan) return;

    createPlanRequest(selectedPlan.id)
      .then((response) => {
        showSuccessMessage(response.message);
        navigate('/my-requests');
      })
      .catch((err) => {
        showErrorMessage(err.response.data.message || 'Unexcpected Error');
      });
  };

  return (
    <div>
      {internetPlans &&
        Array.from(internetPlans.keys()).map((key) => (
          <div key={'isp-' + key}>
            <h2>{key} internet plans:</h2>

            <Grid container spacing={2}>
              {internetPlans.get(key)?.map((plan) => (
                <Grid key={key + '-' + plan.description} item xs={4}>
                  <PlanCard
                    plan={plan}
                    isp={key}
                    isClient={isClient}
                    setPlan={setSelectedPlan}
                  />
                </Grid>
              ))}
            </Grid>
          </div>
        ))}
      <Dialog open={!!selectedPlan} onClose={handleClose} fullWidth>
        <DialogTitle>
          {'Confirm subscription to ' + selectedPlan?.description}
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
    </div>
  );
}

interface PlanCardProps {
  plan: InternetPlans;
  isp: String;
  isClient: boolean;
  setPlan: (plan: InternetPlans) => void;
}

export function PlanCard(props: PlanCardProps) {
  return (
    <Card elevation={6}>
      <CardContent>
        <h3>{props.plan.description}</h3>
        <p>
          Price per month: <b>${props.plan.price}</b>
        </p>
        <p>
          Isp: <b>{props.isp}</b>
        </p>
      </CardContent>

      {props.isClient && (
        <CardActions>
          <DefaultButton
            text='Request Plan'
            onClick={() => props.setPlan(props.plan)}
            endIcon={<EastIcon />}
          />
        </CardActions>
      )}
    </Card>
  );
}
