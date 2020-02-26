<template>
  <div>
    <h1>Sign in</h1>
    <GoogleSignInButton buttonText='Continue with Google' />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import GoogleSignInButton from '@/components/Auth/GoogleSignInButton.vue';

@Component({
  components: {
    GoogleSignInButton,
  }
})
export default class SignIn extends Vue{

}
</script>

<style>

</style>