<template>
  <div class="bg-white shadow-lg rounded-md p-3">
    <div class="flex">
      <img
        class="w-12 h-12 object-cover mr-4 rounded-full"
        :src="user.profilePhotoUrl"
        alt="User's profile image"
      />
      <div>
        <h3 class=" text-xl font-semibold">{{ user.name }}</h3>
        <p class="text-sm text-gray-600">{{ user.username }}</p>
        <h4>{{ user.headline }}</h4>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { User } from '@/types';
@Component
export default class UserCard extends Vue {
  @Prop({ required: true }) user!: User;
}
</script>

<style></style>
