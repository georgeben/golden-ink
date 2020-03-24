import { httpClient } from '../utils/httpClient';
import { AxiosResponse } from 'axios';

const endpoint = '/search';

export async function search(query: string) {
  const apiResponse: AxiosResponse = await httpClient.get(`${endpoint}?query=${query}`);
  return apiResponse.data.data;
}