import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import React, { useEffect } from 'react';
import { showErrorMessage, showSuccessMessage } from '../components/SnackBar';
import { Title } from '../components/Title';
import {
  acceptPlanRequest,
  getPendingRequest,
  PlanRequest,
  rejectPlanRequest,
} from './planRequestService';
import FlakyIcon from '@mui/icons-material/Flaky';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

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
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label='simple table'>
            <TableHead>
              <TableRow>
                <TableCell style={{ fontWeight: 'bold' }}>User</TableCell>
                <TableCell style={{ fontWeight: 'bold' }}>Status</TableCell>
                <TableCell style={{ fontWeight: 'bold' }}>
                  Description
                </TableCell>
                <TableCell style={{ fontWeight: 'bold' }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {planRequests.map((row) => (
                <TableRow>
                  <TableCell>{row.user.name}</TableCell>
                  <TableCell>{row.status}</TableCell>

                  {row.request_details.some((pr) => pr.status === 'pending') ? (
                    <TableCell>
                      {
                        row.request_details.find(
                          (pr) => pr.status === 'pending'
                        )?.internet_plan.description
                      }
                    </TableCell>
                  ) : (
                    <TableCell></TableCell>
                  )}

                  <TableCell>
                    <Button
                      variant='outlined'
                      startIcon={<FlakyIcon />}
                      onClick={() => setSelectedPlan(row)}
                    >
                      Accept | Reject
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
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
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Typography>{rd.internet_plan.description}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography sx={{ color: 'text.secondary' }}>
                      {new Date(rd.created_at).toDateString()}
                    </Typography>
                  </Grid>
                </Grid>
              </AccordionSummary>
              <AccordionDetails>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Typography>Plan:</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography>{rd.internet_plan.description}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography>Price:</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography>{rd.internet_plan.price}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography>Status:</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography>{rd.status}</Typography>
                  </Grid>
                </Grid>
              </AccordionDetails>
            </Accordion>
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
