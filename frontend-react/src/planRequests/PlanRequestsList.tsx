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
  PlanRequestStatusType,
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

  const getStatusColor = (instance: PlanRequest) => {
    switch (instance.status) {
      case PlanRequestStatusType.pending_modification:
        return 'warning';
      case PlanRequestStatusType.pending_approval:
        return 'warning';
      case PlanRequestStatusType.approved:
        return 'success';
      case PlanRequestStatusType.rejected:
        return 'error';
    }
  };

  return (
    <>
      <Title text='Plan Requests List' />

      <Paper variant='outlined' style={{ padding: 10 }}>
        <SubTitle text='Filter' />
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
            </Select>
          </FormControl>
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <DatePicker
              label='Date Requested From'
              value={dateFrom}
              onChange={(newValue) => setDateFrom(newValue)}
              renderInput={(params) => (
                <TextField style={{ maxWidth: '230px' }} {...params} />
              )}
            />
          </LocalizationProvider>
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <DatePicker
              label='Date Requested To'
              value={dateTo}
              onChange={(newValue) => setDateTo(newValue)}
              renderInput={(params) => (
                <TextField style={{ maxWidth: '230px' }} {...params} />
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
            content: (row) => (
              <Button variant='contained' color={getStatusColor(row)} fullWidth>
                {planRequestStatusDictionary[row.status]}
              </Button>
            ),
          },
          {
            header: 'Description',
            content: (row) => (
              <>
                {row.request_details.find(
                  (pr) => pr.status === PlanRequestDetailsStatusType.pending
                )?.internet_plan.description ||
                  row.request_details.find(
                    (pr) => pr.status === PlanRequestDetailsStatusType.approved
                  )?.internet_plan.description ||
                  row.request_details.find(
                    (pr) => pr.status === PlanRequestDetailsStatusType.rejected
                  )?.internet_plan.description}
              </>
            ),
          },
          {
            header: 'Date Requested',
            content: (row) => <>{formatDate(row.created_at)}</>,
          },
          {
            header: 'Isp',
            content: (row) => (
              <>{row.request_details[0].internet_plan.user.name}</>
            ),
          },
        ]}
        additionalActions={[
          {
            text: 'History',
            startIcon: <FeedIcon />,
            onClick: (row) => setSelectedPlan(row),
          },
          {
            text: 'Modify Plan',
            startIcon: <PublishedWithChangesIcon />,
            onClick: (row) => navigate(`/plan-modification/${row.id}`),
            hideOnCondition: (row) =>
              row.status === PlanRequestStatusType.approved,
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
          {selectedPlan?.status === PlanRequestStatusType.approved && (
            <Button
              onClick={() => navigate('/plan-modification/' + selectedPlan?.id)}
            >
              Modify Plan
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </>
  );
}
