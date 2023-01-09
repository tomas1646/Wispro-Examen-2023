import { InternetPlans } from '../internetPlans/internetPlansService';
import { User } from '../user/userService';
import { EnumDictionary } from '../utils/utils';

export interface PlanRequest {
  id: number;
  status: PlanRequestStatusType;
  user: User;
  request_details: PlanRequestDetail[];
  created_at: string;
}

export interface PlanRequestDetail {
  id: number;
  status: PlanRequestDetailsStatusType;
  internet_plan: InternetPlans;
  created_at: string;
}

export enum PlanRequestStatusType {
  pending_approval = 'pending_approval',
  pending_modification = 'pending_modification',
  approved = 'approved',
  rejected = 'rejected',
  finished = 'finshed',
}
export enum PlanRequestDetailsStatusType {
  pending = 'pending',
  approved = 'approved',
  rejected = 'rejected',
  finished = 'finished',
}

export const planRequestStatusDictionary: EnumDictionary<
  PlanRequestStatusType,
  string
> = {
  [PlanRequestStatusType.pending_approval]: 'Pending Approval',
  [PlanRequestStatusType.pending_modification]: 'Pending Modification',
  [PlanRequestStatusType.approved]: 'Approved',
  [PlanRequestStatusType.rejected]: 'Rejected',
  [PlanRequestStatusType.finished]: 'Finished',
};

export const planRequestDetailsStatusDictionary: EnumDictionary<
  PlanRequestDetailsStatusType,
  string
> = {
  [PlanRequestDetailsStatusType.pending]: 'Pending',
  [PlanRequestDetailsStatusType.approved]: 'Approved',
  [PlanRequestDetailsStatusType.rejected]: 'Rejected',
  [PlanRequestDetailsStatusType.finished]: 'Finished',
};
