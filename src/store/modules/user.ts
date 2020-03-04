import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators';
import { User, Topic } from '../../types';
import {
  googleSignIn,
  fetchCurrentUserData,
  updateUserProfile,
  followTopic,
  unfollowTopic
} from '../../api/user-api-service';
import storage from '@/utils/storage';
import { TOKEN } from '@/constants';
import { setAuthHeader, removeAuthHeader } from '@/utils/httpClient';

@Module({ namespaced: true, name: 'user' })
class UserStore extends VuexModule {
  currentUser: User | null = null;
  isLoggedIn = false;
  name = 'Hello baby';

  @Mutation
  public SET_USER(user: User): void {
    this.currentUser = user;
  }

  @Mutation
  public SET_LOGGED_IN_STATUS(status: boolean): void {
    this.isLoggedIn = status;
  }

  @Mutation SET_USER_TOPICS(topics: Topic[]): void {
    if (this.currentUser) {
      this.currentUser.topics = topics;
    }
  }

  @Mutation
  RESET_STATE(): void {
    this.currentUser = null;
    this.isLoggedIn = false;
  }

  @Action
  async googleSignIn(googleIdToken: string) {
    try {
      const result = await googleSignIn(googleIdToken);
      const { user, token } = result;
      console.log({ user });
      console.log({ token });
      this.context.commit('SET_USER', user);
      this.context.commit('SET_LOGGED_IN_STATUS', true);
      storage.updateState(TOKEN, token);

      setAuthHeader();
    } catch (error) {
      console.log('An error occurred while signing in');
    }
  }

  @Action
  async fetchCurrentUserData() {
    try {
      const user: User = await fetchCurrentUserData();
      console.log({ user });
      this.context.commit('SET_USER', user);
    } catch (error) {
      console.log('An error occurred while fetching user data');
    }
  }

  @Action
  async updateUserProfile(userProfile: any) {
    try {
      const user: User = await updateUserProfile(userProfile);
      this.context.commit('SET_USER', user);
      return user;
    } catch (error) {
      console.log('An error occurred while updating profile', error)
    }
  }

  @Action
  async followTopic(topicSlug: string) {
    try {
      const updatedTopics = await followTopic(topicSlug);
      this.context.commit('SET_USER_TOPICS', updatedTopics);
    } catch (error) {
      console.log('An error occured while following a topic', error)
    }
  }

  @Action
  async unfollowTopic(topicSlug: string) {
    try {
      const updatedTopics = await unfollowTopic(topicSlug);
      this.context.commit('SET_USER_TOPICS', updatedTopics);
    } catch (error) {
      console.log('An error occured while unfollowing a topic', error)
    }
  }

  @Action
  logout() {
    this.context.commit('RESET_STATE');
    removeAuthHeader();
    storage.removeState(TOKEN);
  }

  get isProfileComplete(): boolean {
    if (this.currentUser) {
      return this.currentUser.username
        ? this.currentUser.bio
          ? this.currentUser.headline
            ? true
            : false
          : false
        : false;
    }
    return false;
  }
}

export default UserStore;
