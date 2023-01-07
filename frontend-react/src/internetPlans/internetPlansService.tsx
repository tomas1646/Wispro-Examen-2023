import axios from 'axios';
import backEndUrl from '../environment';
import { ApiResponse } from '../utils/utils';

const internetPlansUrl = backEndUrl + '/internet_plans';

export interface InternetPlans {
  id: number;
  description: string;
  price: number;
  user: string;
}

export async function getPlansGroupedByIsp(): Promise<
  ApiResponse<Map<String, InternetPlans[]>>
> {
  const response: ApiResponse<Map<String, InternetPlans[]>> = (
    await axios.get(internetPlansUrl + '/grouped_by_isp')
  ).data;
  return response;
}

export async function getIspPlans(): Promise<ApiResponse<InternetPlans[]>> {
  const response: ApiResponse<InternetPlans[]> = (
    await axios.get(internetPlansUrl + '/isp_plans')
  ).data;
  return response;
}

export async function getIspPlansOffered(
  isp: string
): Promise<ApiResponse<InternetPlans[]>> {
  const response: ApiResponse<InternetPlans[]> = (
    await axios.get(internetPlansUrl + '/isp_plans_offered?isp=' + isp)
  ).data;
  return response;
}

export async function createPlan(
  description: string,
  price: number
): Promise<ApiResponse<InternetPlans>> {
  const response: ApiResponse<InternetPlans> = (
    await axios.post(internetPlansUrl, { description, price })
  ).data;
  return response;
}

export async function updatePlan(
  planId: number,
  description: string,
  price: number
): Promise<ApiResponse<InternetPlans>> {
  const response: ApiResponse<InternetPlans> = (
    await axios.put(internetPlansUrl + '/' + planId, { description, price })
  ).data;
  return response;
}
