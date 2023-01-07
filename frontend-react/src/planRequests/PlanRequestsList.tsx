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
import { showErrorMessage } from '../components/SnackBar';
import { Title } from '../components/Title';
import { getMyPlanRequest, PlanRequest } from './planRequestService';
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';
import FeedIcon from '@mui/icons-material/Feed';
import { Stack } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import { PlanRequestHistory } from './components';

export default function PlanRequestsList() {
  const navigate = useNavigate();
  const [planRequests, setPlanRequests] = React.useState<PlanRequest[]>([]);
  const [selectedPlan, setSelectedPlan] = React.useState<PlanRequest>();
  const [updateData, setUpdateData] = React.useState<number>(Math.random());

  useEffect(() => {
    getMyPlanRequest()
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

  return (
    <>
      <Title text='Plan Requests List' />

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell style={{ fontWeight: 'bold' }}>User</TableCell>
              <TableCell style={{ fontWeight: 'bold' }}>Status</TableCell>
              <TableCell style={{ fontWeight: 'bold' }}>Description</TableCell>
              <TableCell style={{ fontWeight: 'bold' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {planRequests.map((row) => (
              <TableRow>
                <TableCell>{row.user.name}</TableCell>
                <TableCell>{row.status}</TableCell>

                {row.request_details.some((pr) => pr.status === 'approved') ? (
                  <TableCell>
                    {
                      row.request_details.find((pr) => pr.status === 'approved')
                        ?.internet_plan.description
                    }
                  </TableCell>
                ) : (
                  <TableCell></TableCell>
                )}

                <TableCell>
                  <Stack direction='row' spacing={2}>
                    {row.request_details.some(
                      (pr) => pr.status === 'approved'
                    ) && (
                      <Button
                        variant='outlined'
                        startIcon={<PublishedWithChangesIcon />}
                        onClick={() => navigate('/plan_modification/' + row.id)}
                      >
                        Request Plan Modification
                      </Button>
                    )}
                    <Button
                      variant='outlined'
                      startIcon={<FeedIcon />}
                      onClick={() => setSelectedPlan(row)}
                    >
                      History
                    </Button>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
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
            (pr) => pr.status === 'approved'
          ) && (
            <Button
              onClick={() => navigate('/plan_modification/' + selectedPlan?.id)}
            >
              Request Plan Modification
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </>
  );
}
