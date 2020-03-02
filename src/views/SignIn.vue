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
      <p class="mb-4">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam vel aut
        nisi consectetur.
      </p>
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
const userNamespace = namespace('user');

@Component({
  components: {
    GoogleLogIn,
  },
})
export default class SignIn extends Vue {
  userStore = getModule(userModule, this.$store);
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
       if(!this.$route.query.redirect){
        this.$router.replace('/')
      }
      this.$router.replace((this.$route.query.redirect as string))
    }
  }

  onFailure(error: any) {
    console.log('Google sign in failed');
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
