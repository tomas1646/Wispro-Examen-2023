import axios from 'axios';
import backEndUrl from '../environment';
import { ApiResponse } from '../utils/utils';
import { PlanRequest } from './model';

const planRequestUrl = backEndUrl + '/plan_requests';

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
    await axios.get(planRequestUrl + '/pending')
  ).data;
  return response;
}

export async function getMyPlanRequest(
  status?: string,
  dateFrom?: string,
  dateTo?: string
): Promise<ApiResponse<PlanRequest[]>> {
  const query = new URLSearchParams();
  if (typeof status != 'undefined' && status !== '')
    query.append('q[status_eq]', status);

  if (dateFrom) query.append('q[created_at_gteq]', dateFrom);
  if (dateTo) query.append('q[created_at_lteq]', dateTo + ' 23:59:59');

  const response: ApiResponse<PlanRequest[]> = (
    await axios.get(planRequestUrl + '/my_requests?' + query)
  ).data;
  return response;
}

export async function acceptPlanRequest(
  id: number
): Promise<ApiResponse<PlanRequest>> {
  const response: ApiResponse<PlanRequest> = (
    await axios.put(planRequestUrl + '/' + id + '/accept')
  ).data;
  return response;
}

export async function rejectPlanRequest(
  id: number
): Promise<ApiResponse<PlanRequest>> {
  const response: ApiResponse<PlanRequest> = (
    await axios.put(planRequestUrl + '/' + id + '/reject')
  ).data;
  return response;
}

export async function modifyPlanRequest(
  id: number,
  internet_plan_id: number
): Promise<ApiResponse<PlanRequest>> {
  const response: ApiResponse<PlanRequest> = (
    await axios.put(planRequestUrl + '/' + id + '/modify', {
      internet_plan_id,
    })
  ).data;
  return response;
}
