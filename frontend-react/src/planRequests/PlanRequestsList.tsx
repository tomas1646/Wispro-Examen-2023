import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  TextField,
} from '@mui/material';
import React, { useEffect } from 'react';
import { showErrorMessage } from '../components/SnackBar';
import { SubTitle, Title } from '../components/Title';
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
import { DefaultButton } from '../components/ButtonPanel';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { Dayjs } from 'dayjs';

export default function PlanRequestsList() {
  const navigate = useNavigate();
  const [planRequests, setPlanRequests] = React.useState<PlanRequest[]>([]);
  const [selectedPlan, setSelectedPlan] = React.useState<PlanRequest>();
  const [searchStatus, setSearchStatus] = React.useState<string>('');
  const [dateFrom, setDateFrom] = React.useState<Dayjs | null>(null);
  const [dateTo, setDateTo] = React.useState<Dayjs | null>(null);

  useEffect(() => {
    console.log(searchStatus);
    getMyPlanRequest(
      searchStatus,
      dateFrom?.format('YYYY-MM-DD'),
      dateTo?.format('YYYY-MM-DD')
    )
      .then((response) => {
        setPlanRequests(response.content);
      })
      .catch((err) => {
        showErrorMessage(err.response.data.message || 'Unexcpected Error');
      });
  }, [searchStatus, dateFrom, dateTo]);

  const handleClose = () => {
    setSelectedPlan(undefined);
  };

  const resetFilters = () => {
    setSearchStatus('');
    setDateFrom(null);
    setDateTo(null);
  };

  return (
    <>
      <Title text='Plan Requests List' />

      <Paper>
        <SubTitle text='Filter Search' />
        <Stack direction='row' alignItems='center' spacing={3}>
          <FormControl fullWidth style={{ maxWidth: '200px' }}>
            <InputLabel>Plan Request Status</InputLabel>
            <Select
              value={searchStatus}
              label='Plan Request Status'
              onChange={(e: SelectChangeEvent) =>
                setSearchStatus(e.target.value)
              }
            >
              <MenuItem value=''>
                <em>None</em>
              </MenuItem>
              <MenuItem value={0}>Pending Approval</MenuItem>
              <MenuItem value={1}>Pending Modification</MenuItem>
              <MenuItem value={2}>Approved</MenuItem>
              <MenuItem value={3}>Rejected</MenuItem>
              <MenuItem value={4}>Finished</MenuItem>
            </Select>
          </FormControl>
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <DatePicker
              label='Date From'
              value={dateFrom}
              onChange={(newValue) => setDateFrom(newValue)}
              renderInput={(params) => (
                <TextField style={{ maxWidth: '200px' }} {...params} />
              )}
            />
          </LocalizationProvider>
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <DatePicker
              label='Date To'
              value={dateTo}
              onChange={(newValue) => setDateTo(newValue)}
              renderInput={(params) => (
                <TextField style={{ maxWidth: '200px' }} {...params} />
              )}
            />
          </LocalizationProvider>
          <DefaultButton text='Reset' onClick={resetFilters} />
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
