import { httpClient } from '../utils/httpClient';
import { AxiosResponse } from 'axios';
import { User, Topic, Story } from '../types';

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

export async function likeStory(storySlug: string) {
  const apiResponse: AxiosResponse = await httpClient.put(`${endpoint}/likes/${storySlug}`);
  return apiResponse.data.data;
}

export async function unlikeStory(storySlug: string): Promise<Story[]> {
  const apiResponse: AxiosResponse = await httpClient.delete(`${endpoint}/likes/${storySlug}`);
  return apiResponse.data.data;
}

export async function getUserFeed(): Promise<Story[]>{
  const apiResponse: AxiosResponse = await httpClient.get(`${endpoint}/feed`);
  return apiResponse.data.data;
}

export async function getUserStories(): Promise<Story[]> {
  const apiResponse: AxiosResponse = await httpClient.get(`${endpoint}/stories`);
  return apiResponse.data.data;
}

export async function addStoryToBookMarks(storySlug: string): Promise<Story[]> {
  const apiResponse: AxiosResponse = await httpClient.put(`${endpoint}/bookmarks/${storySlug}`);
  return apiResponse.data.data;
}

export async function removeStoryFromBookMarks(storySlug: string): Promise<Story[]> {
  const apiResponse: AxiosResponse = await httpClient.delete(`${endpoint}/bookmarks/${storySlug}`);
  return apiResponse.data.data;
}

export async function getUserStory(storySlug: string): Promise<Story> {
  const apiResponse: AxiosResponse = await httpClient.get(`${endpoint}/stories/${storySlug}`);
  return apiResponse.data.data;
}