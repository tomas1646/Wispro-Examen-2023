import axios from 'axios';
import backEndUrl from '../environment';
import { updateSessionUser } from '../store/userStore';
import { ApiResponse } from '../utils/utils';

const userUrl = backEndUrl + '/users';

export interface User {
  id: number;
  token: string;
  type: string;
  name: string;
  user_name: string;
  avatar_url: string;
}

export async function login(
  username: string,
  password: string
): Promise<ApiResponse<User>> {
  const response: ApiResponse<User> = (
    await axios.post(userUrl + '/login', { username, password })
  ).data;

  updateSessionUser(response.content);
  return response;
}

export async function register(
  username: string,
  password: string,
  name: string,
  email: string,
  type: string
): Promise<ApiResponse<User>> {
  const response: ApiResponse<User> = (
    await axios.post(userUrl, { name, username, password, email, type })
  ).data;

  return response;
}

export async function getById(id: number): Promise<ApiResponse<User>> {
  const response: ApiResponse<User> = (await axios.get(userUrl + '/' + id))
    .data;

  return response;
}
