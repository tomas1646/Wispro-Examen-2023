import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Grid,
  Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { formatDate } from '../utils/utils';
import { PlanRequestDetail } from '../planRequests/planRequestService';

export function PlanRequestHistory(props: PlanRequestDetail) {
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
          <Grid item xs={6}>
            <Typography>{props.internet_plan.description}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>Price:</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>{props.internet_plan.price}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>Status:</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>{props.status}</Typography>
          </Grid>
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
}
