import { httpClient } from '../utils/httpClient';
import { AxiosResponse  } from 'axios';
import { Topic } from '../types';

const endpoint = '/topics'

export async function getTopics(): Promise<Topic[]> {
  const apiResponse: AxiosResponse = await httpClient.get(endpoint);
  return apiResponse.data.data;
}