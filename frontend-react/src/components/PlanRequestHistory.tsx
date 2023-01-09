import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Grid,
  Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { formatDate } from '../utils/utils';
import {
  PlanRequestDetail,
  planRequestDetailsStatusDictionary,
  PlanRequestDetailsStatusType,
} from '../planRequests/model';
import { Stack } from '@mui/system';

export function PlanRequestHistory(props: PlanRequestDetail) {
  const getStatusColor = (status: PlanRequestDetailsStatusType) => {
    switch (status) {
      case PlanRequestDetailsStatusType.pending:
        return 'warning';
      case PlanRequestDetailsStatusType.rejected:
        return 'error';
      case PlanRequestDetailsStatusType.approved:
        return 'success';
      case PlanRequestDetailsStatusType.finished:
        return 'info';
    }
  };

  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography>{props.internet_plan.description}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography sx={{ color: 'text.secondary' }}>
              {formatDate(props.created_at)}
            </Typography>
          </Grid>
        </Grid>
      </AccordionSummary>
      <AccordionDetails>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography>Plan:</Typography>
          </Grid>
          <Grid item xs={6} textAlign='center'>
            <Typography>{props.internet_plan.description}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>Price:</Typography>
          </Grid>
          <Grid item xs={6} textAlign='center'>
            <Typography>{props.internet_plan.price}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>Status:</Typography>
          </Grid>
          <Grid item xs={6}>
            <Stack direction='row' justifyContent='center' alignItems='center'>
              <Button
                variant='contained'
                color={getStatusColor(props.status)}
                fullWidth
                style={{ maxWidth: '300px' }}
              >
                {planRequestDetailsStatusDictionary[props.status]}
              </Button>
            </Stack>
          </Grid>
          <Grid item xs={6}>
            <Typography>Isp:</Typography>
          </Grid>
          <Grid item xs={6} textAlign='center'>
            <Typography>{props.internet_plan.user.name}</Typography>
          </Grid>
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
}
