<template>
  <div>
    <form>
      <InputGroup label="Name" type="text" placeholder="Enter your name" v-model="name" />
      <InputGroup label="Username" type="text" placeholder="Select a username" v-model="username" />
      <InputGroup label="Headline" type="text" placeholder="Select a headline" v-model="headline" />
      <TextAreaGroup label="bio" placeholder="A short description of yourself" v-model="bio" />
    </form>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import InputGroup from '../Forms/InputGroup.vue';
import TextAreaGroup from '../Forms/TextAreaGroup.vue';

@Component({
  components: {
    InputGroup,
    TextAreaGroup,
  }
})
export default class CompleteProfile extends Vue{
  name = '';
  username = '';
  headline = '';
  bio = '';
}
</script>

<style>

</style>