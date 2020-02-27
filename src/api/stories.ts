import { httpClient } from '../utils/httpClient';
import { AxiosResponse  } from 'axios';
import { Story } from '../types';
const endpoint = '/stories'

export async function getStories(): Promise<Story[]> {
  const apiResponse: AxiosResponse = await httpClient.get(endpoint);
  return apiResponse.data.data;
}

export async function getSingleStory(slug: string): Promise<Story> {
  const apiResponse: AxiosResponse = await httpClient.get(`${endpoint}/${slug}`);
  return apiResponse.data.data;
}