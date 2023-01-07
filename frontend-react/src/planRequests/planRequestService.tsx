import axios from 'axios';
import backEndUrl from '../environment';
import { InternetPlans } from '../internetPlans/internetPlansService';
import { User } from '../user/userService';
import { ApiResponse } from '../utils/utils';

const planRequestUrl = backEndUrl + '/plan_requests';

export interface PlanRequest {
  id: number;
  status: string;
  user: User;
  request_details: PlanRequestDetail[];
  created_at: string;
}

export interface PlanRequestDetail {
  id: number;
  status: string;
  internet_plan: InternetPlans;
  created_at: string;
}

export async function createPlanRequest(
  internet_plan_id: number
): Promise<ApiResponse<PlanRequest>> {
  const response: ApiResponse<PlanRequest> = (
    await axios.post(planRequestUrl, { internet_plan_id })
  ).data;
  return response;
}

export async function getPlanRequest(
  id: number
): Promise<ApiResponse<PlanRequest>> {
  const response: ApiResponse<PlanRequest> = (
    await axios.get(planRequestUrl + '/' + id)
  ).data;
  return response;
}

export async function getPendingRequest(): Promise<ApiResponse<PlanRequest[]>> {
  const response: ApiResponse<PlanRequest[]> = (
    await axios.get(planRequestUrl + '/pending_requests')
  ).data;
  return response;
}

export async function getMyPlanRequest(): Promise<ApiResponse<PlanRequest[]>> {
  const response: ApiResponse<PlanRequest[]> = (
    await axios.get(planRequestUrl + '/my_requests')
  ).data;
  return response;
}

export async function acceptPlanRequest(
  id: number
): Promise<ApiResponse<PlanRequest>> {
  const response: ApiResponse<PlanRequest> = (
    await axios.put(planRequestUrl + '/' + id + '/accept_request')
  ).data;
  return response;
}

export async function rejectPlanRequest(
  id: number
): Promise<ApiResponse<PlanRequest>> {
  const response: ApiResponse<PlanRequest> = (
    await axios.put(planRequestUrl + '/' + id + '/reject_request')
  ).data;
  return response;
}

export async function modifyPlanRequest(
  id: number,
  internet_plan_id: number
): Promise<ApiResponse<PlanRequest>> {
  const response: ApiResponse<PlanRequest> = (
    await axios.put(planRequestUrl + '/' + id + '/modify_plan', {
      internet_plan_id,
    })
  ).data;
  return response;
}
