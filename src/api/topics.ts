import { httpClient } from '../utils/httpClient';
import { AxiosResponse  } from 'axios';
import { Topic, Story } from '../types';

const endpoint = '/topics'

export async function getTopics(): Promise<Topic[]> {
  const apiResponse: AxiosResponse = await httpClient.get(endpoint);
  return apiResponse.data.data;
}

export async function getTopic(slug: string): Promise<Topic> {
  const apiResponse: AxiosResponse = await httpClient.get(`${endpoint}/${slug}`);
  return apiResponse.data.data;
}

export async function getTopicStories(slug: string): Promise<Story[]> {
  const apiResponse: AxiosResponse = await httpClient.get(`${endpoint}/${slug}/stories`);
  return apiResponse.data.data;
}