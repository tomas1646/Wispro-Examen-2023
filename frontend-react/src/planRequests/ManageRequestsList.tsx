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
  acceptPlanRequest,
  getPendingRequest,
  rejectPlanRequest,
} from './planRequestService';
import FlakyIcon from '@mui/icons-material/Flaky';
import CommonTable from '../components/CommonTable';
import { PlanRequestHistory } from '../components/PlanRequestHistory';
import {
  PlanRequest,
  PlanRequestDetailsStatusType,
  planRequestStatusDictionary,
} from './model';

export default function ManageRequestsList() {
  const [planRequests, setPlanRequests] = React.useState<PlanRequest[]>([]);
  const [selectedPlan, setSelectedPlan] = React.useState<PlanRequest>();
  const [updateData, setUpdateData] = React.useState<number>(Math.random());

  useEffect(() => {
    getPendingRequest()
      .then((response) => {
        setPlanRequests(response.content);
      })
      .catch((err) => {
        showErrorMessage(err.response.data.message || 'Unexcpected Error');
      });
  }, [updateData]);

  const handleClose = () => {
    setSelectedPlan(undefined);
  };

  const handleAccept = () => {
    if (!selectedPlan) return;

    acceptPlanRequest(selectedPlan.id)
      .then((response) => {
        showSuccessMessage(response.message);
        setUpdateData(Math.random());
        handleClose();
      })
      .catch((err) => {
        showErrorMessage(err.response.data.message || 'Unexcpected Error');
      });
  };

  const handleReject = () => {
    if (!selectedPlan) return;

    rejectPlanRequest(selectedPlan.id)
      .then((response) => {
        showSuccessMessage(response.message);
        setUpdateData(Math.random());
        handleClose();
      })
      .catch((err) => {
        showErrorMessage(err.response.data.message || 'Unexcpected Error');
      });
  };

  return (
    <>
      <Title text='Manage Pending Requests' />

      {planRequests.length ? (
        <CommonTable<PlanRequest>
          data={planRequests}
          columns={[
            {
              header: 'User',
              content: (row) => <>{row.user.name}</>,
            },
            {
              header: 'Status',
              content: (row) => (
                <Button variant='contained' color='warning' fullWidth>
                  {planRequestStatusDictionary[row.status]}
                </Button>
              ),
            },
            {
              header: 'Description',
              content: (row) => (
                <>
                  {
                    row.request_details.find(
                      (pr) => pr.status === PlanRequestDetailsStatusType.pending
                    )?.internet_plan.description
                  }
                </>
              ),
            },
          ]}
          additionalActions={[
            {
              text: 'Accept | Reject',
              startIcon: <FlakyIcon />,
              onClick: (row) => setSelectedPlan(row),
            },
          ]}
        />
      ) : (
        <h3>There are no pending plan requests</h3>
      )}

      <Dialog open={!!selectedPlan} onClose={handleClose} fullWidth>
        <DialogTitle>
          {'Accept | Reject ' + selectedPlan?.user.name + ' request'}
        </DialogTitle>

        <DialogContent>
          <h4>Request History</h4>
          {selectedPlan?.request_details.map((rd) => (
            <PlanRequestHistory {...rd} />
          ))}
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose} color='error'>
            Close
          </Button>
          <Button onClick={handleReject} color='error'>
            Reject
          </Button>
          <Button onClick={handleAccept} autoFocus>
            Accept
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
