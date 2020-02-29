<template>
  <div class="bg-gray-200 py-20">
    <form class="bg-white w-11/12 md:w-10/12 mx-auto shadow-xl rounded-lg p-4">
      <div class="md:flex">
        <div class="profile-img mb-4 md:w-2/5">
          <img
            class=" h-56 w-56 object-cover rounded-full mx-auto"
            src="../../assets/images/userPhoto.jpeg"
            alt=""
          />
          <button class="block mx-auto mt-3 border-2 border-gray-500 py-2 px-4 text-gray-700">
            Change photo
          </button>
        </div>
        <div class="inputs md:w-3/5">
          <InputGroup
            class="mb-4"
            label="Name"
            type="text"
            placeholder="Enter your name"
            v-model="name"
          />
          <InputGroup
            class="mb-4"
            label="Username"
            type="text"
            placeholder="Select a username"
            v-model="username"
          />
          <InputGroup
            class="mb-4"
            label="Headline"
            type="text"
            placeholder="Select a headline"
            v-model="headline"
          />
          <TextAreaGroup
            label="Bio"
            placeholder="A short description of yourself"
            v-model="bio"
          />

          <button class="bg-accent text-white py-2 px-6 shadow-xl mt-4">
            Save
          </button>
        </div>
      </div>
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
  },
})
export default class CompleteProfile extends Vue {
  name = '';
  username = '';
  headline = '';
  bio = '';
}
</script>

<style></style>
