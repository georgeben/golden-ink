<template>
  <div class="lg:px-4 flex items-start pb-40 pt-40 sign-in">
    <div class="image hidden md:block w-1/2">
      <img
        class="w-full shadow-xl"
        src="../assets/images/writing.jpeg"
        alt="A person writing"
      />
    </div>
    <form
      class="bg-white shadow-xl rounded-lg p-4 w-11/12 md:w-5/12 mx-auto py-20"
    >
      <h1 class="text-center text-xl font-semibold pb-4 mx-auto">Sign in</h1>
        <ul class="mb-4 ml-4 leading-relaxed list-disc">
          <li>Get started easily by signing in with your Google account</li>
          <li>Make use of our powerful WYSIWYG editor</li>
          <li>Get realtime updates when readers interact with your stories</li>
          <li>Follow your favourite topics.</li>
        </ul>
      <GoogleLogIn
        :params="params"
        :renderParams="renderParams"
        :onSuccess="onSuccess"
        :onFailure="onFailure"
      ></GoogleLogIn>
    </form>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import GoogleLogIn from 'vue-google-login';
import { getModule } from 'vuex-module-decorators';
import { namespace } from 'vuex-class';
import { User } from '../types';
import userModule from '@/store/modules/user';
import notificationModule from '@/store/modules/notifications';
const userNamespace = namespace('user');

@Component({
  components: {
    GoogleLogIn,
  },
})
export default class SignIn extends Vue {
  userStore = getModule(userModule, this.$store);
  notificationStore = getModule(notificationModule, this.$store);
  @userNamespace.State
  public currentUser!: User;

  params = {
    // eslint-disable-next-line @typescript-eslint/camelcase
    client_id: process.env.VUE_APP_GOOGLE_CLIENT_ID,
  };

  renderParams = {
    width: 250,
    height: 50,
    longtitle: true,
  };

  async onSuccess(googleUser: any) {
    const token = googleUser.getAuthResponse().id_token;
    await this.userStore.googleSignIn(token);

    if (this.currentUser) {
      // User signed in
      this.notificationStore.getNotifications();
      if (
        this.currentUser.bio &&
        this.currentUser.username &&
        this.currentUser.headline
      ) {
        if (!this.$route.query.redirect) {
          return this.$router.replace('/');
        }
        return this.$router.replace(this.$route.query.redirect as string);
      } 
      this.$router.push('/profile/edit')
    }
  }

  onFailure(error: any) {
    console.log('Google sign in failed', error);
  }
}
</script>

<style>
.sign-in {
  background-image: url('../assets/images/golden_inkbg.png');
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
}
</style>
