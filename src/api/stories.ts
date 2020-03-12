import { httpClient } from '../utils/httpClient';
import { AxiosResponse  } from 'axios';
import { Story, NewStory } from '../types';
const endpoint = '/stories'

export async function getStories(): Promise<Story[]> {
  const apiResponse: AxiosResponse = await httpClient.get(endpoint);
  return apiResponse.data.data;
}

export async function getSingleStory(slug: string): Promise<Story| undefined> {
  const apiResponse: AxiosResponse = await httpClient.get(`${endpoint}/${slug}`);
  return apiResponse.data.data;
}

export async function createStory(newStory: NewStory): Promise<Story> {
  const apiResponse: AxiosResponse = await httpClient.post(`${endpoint}`, newStory);
  return apiResponse.data.data;
}

export async function updateStory( story: NewStory, slug: string): Promise<Story> {
  const apiResponse: AxiosResponse = await httpClient.put(`users/stories/${slug}`, story);
  return apiResponse.data.data;
}