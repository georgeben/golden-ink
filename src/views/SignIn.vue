<template>
  <div>
    <h1>Sign in</h1>
    <GoogleSignInButton buttonText='Continue with Google' @done="loginWithGoogle" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import GoogleSignInButton from '@/components/Auth/GoogleSignInButton.vue';
import { getModule } from 'vuex-module-decorators';
import userModule from '@/store/modules/user';

@Component({
  components: {
    GoogleSignInButton,
  }
})
export default class SignIn extends Vue{
  userStore = getModule(userModule, this.$store);
  async loginWithGoogle(googleIdToken: string){
    await this.userStore.googleSignIn(googleIdToken);
  }
}
</script>

<style>

</style>