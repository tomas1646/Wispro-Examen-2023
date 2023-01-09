import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Paper,
} from '@mui/material';
import React, { useEffect } from 'react';
import { showErrorMessage } from '../components/SnackBar';
import { Title } from '../components/Title';
import { getMyPlanRequest } from './planRequestService';
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';
import FeedIcon from '@mui/icons-material/Feed';
import { Stack } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import { formatDate } from '../utils/utils';
import CommonTable from '../components/CommonTable';
import { PlanRequestHistory } from '../components/PlanRequestHistory';
import {
  PlanRequest,
  PlanRequestDetailsStatusType,
  planRequestStatusDictionary,
} from './model';

export default function PlanRequestsList() {
  const navigate = useNavigate();
  const [planRequests, setPlanRequests] = React.useState<PlanRequest[]>([]);
  const [selectedPlan, setSelectedPlan] = React.useState<PlanRequest>();

  useEffect(() => {
    getMyPlanRequest()
      .then((response) => {
        setPlanRequests(response.content);
      })
      .catch((err) => {
        showErrorMessage(err.response.data.message || 'Unexcpected Error');
      });
  }, []);

  const handleClose = () => {
    setSelectedPlan(undefined);
  };

  return (
    <>
      <Title text='Plan Requests List' />
      <Paper>
        <Title text='Filter Search' />
        <Stack direction='row' alignItems='center'>
          <input></input>
        </Stack>
      </Paper>

      <CommonTable<PlanRequest>
        data={planRequests}
        columns={[
          {
            header: 'Status',
            content: (row) => <>{planRequestStatusDictionary[row.status]}</>,
          },
          {
            header: 'Description',
            content: (row) => (
              <>
                {row.request_details.some(
                  (pr) => pr.status === PlanRequestDetailsStatusType.approved
                ) &&
                  row.request_details.find(
                    (pr) => pr.status === PlanRequestDetailsStatusType.approved
                  )?.internet_plan.description}
              </>
            ),
          },
          {
            header: 'Date Requested',
            content: (row) => <>{formatDate(row.created_at)}</>,
          },
        ]}
        additionalActions={[
          {
            text: 'History',
            startIcon: <FeedIcon />,
            onClick: (row) => setSelectedPlan(row),
          },
          {
            text: 'Request Plan Modification',
            startIcon: <PublishedWithChangesIcon />,
            onClick: (row) => navigate(`/plan-modification/${row.id}`),
            hideOnCondition: (row) =>
              row.request_details.some(
                (pr) => pr.status === PlanRequestDetailsStatusType.approved
              ) &&
              !row.request_details.some(
                (pr) => pr.status === PlanRequestDetailsStatusType.pending
              ),
          },
        ]}
      />

      <Dialog open={!!selectedPlan} onClose={handleClose} fullWidth>
        <DialogTitle>{'Plan History'}</DialogTitle>

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
          {selectedPlan?.request_details.some(
            (pr) => pr.status === PlanRequestDetailsStatusType.approved
          ) &&
            !selectedPlan.request_details.some(
              (pr) => pr.status === PlanRequestDetailsStatusType.pending
            ) && (
              <Button
                onClick={() =>
                  navigate('/plan-modification/' + selectedPlan?.id)
                }
              >
                Request Plan Modification
              </Button>
            )}
        </DialogActions>
      </Dialog>
    </>
  );
}
