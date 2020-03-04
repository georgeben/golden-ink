import { httpClient } from '../utils/httpClient';
import { AxiosResponse } from 'axios';
import { User, Topic } from '../types';

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

export async function updateUserProfile(userProfile: any): Promise<User> {
  const apiResponse: AxiosResponse = await httpClient.put(`${endpoint}/profile`, userProfile);
  return apiResponse.data.data;
}

export async function followTopic(topicSlug: string): Promise<Topic[]> {
  const apiResponse: AxiosResponse = await httpClient.put(`${endpoint}/topics/${topicSlug}`);
  return apiResponse.data.data;
}

export async function unfollowTopic(topicSlug: string): Promise<Topic[]> {
  const apiResponse: AxiosResponse = await httpClient.delete(`${endpoint}/topics/${topicSlug}`);
  return apiResponse.data.data;
}