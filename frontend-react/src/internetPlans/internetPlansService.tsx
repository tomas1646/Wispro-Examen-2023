import axios from 'axios';
import backEndUrl from '../environment';
import { ApiResponse } from '../utils/utils';

const internetPlansUrl = backEndUrl + '/internet_plans';

export interface InternetPlans {
  id: number;
  description: string;
  price: number;
  user_id: number;
}

export async function GetPlansGroupedByIsp(): Promise<
  ApiResponse<Map<String, InternetPlans[]>>
> {
  const response: ApiResponse<Map<String, InternetPlans[]>> = (
    await axios.get(internetPlansUrl + '/grouped_by_isp')
  ).data;
  return response;
}

export async function GetIspPlans(): Promise<ApiResponse<InternetPlans[]>> {
  const response: ApiResponse<InternetPlans[]> = (
    await axios.get(internetPlansUrl + '/isp_plans')
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
