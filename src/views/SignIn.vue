<template>
  <div class="lg:px-4 flex items-start pb-40 pt-40 sign-in">
    <div class="image hidden md:block w-1/2">
      <img class="w-full shadow-xl" src="../assets/images/writing.jpeg" alt="A person writing">
    </div>
    <form class="bg-white shadow-xl rounded-lg p-4 w-9/12 md:w-5/12 mx-auto py-20">
      <h1 class="text-center text-xl font-semibold pb-4 mx-auto">Sign in</h1>
      <p class="mb-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam vel aut nisi consectetur.</p>
      <GoogleSignInButton buttonText='Continue with Google' @done="loginWithGoogle" />
    </form>
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
  user = this.userStore.currentUser;
  async loginWithGoogle(googleIdToken: string){
    await this.userStore.googleSignIn(googleIdToken);

    if(this.user){
      // User signed in
      this.$router.push('/feed');
    }
  }
}
</script>

<style>
.sign-in{
  background-image: url('../assets/images/golden_inkbg.png');
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
}
</style>