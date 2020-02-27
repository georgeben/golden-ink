import { httpClient } from '../utils/httpClient';
import { AxiosResponse } from 'axios';
import { User } from '../types';

const endpoint = '/users';

export async function googleSignIn(googleIdToken: string) {
  const apiResponse: AxiosResponse = await httpClient.post('/auth/google', {
    googleIdToken,
  });
  return apiResponse.data.data;
}

export async function fetchCurrentUserData(): Promise<User> {
  const apiResponse: AxiosResponse = await httpClient.get(endpoint);
  return apiResponse.data.data;
}