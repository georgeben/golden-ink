import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators';
import { User } from '../../types';
import { googleSignIn, fetchCurrentUserData } from '../../api/user-api-service';
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
