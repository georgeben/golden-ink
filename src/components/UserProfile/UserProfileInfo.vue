<template>
  <div class="bg-white p-4 shadow-xl rounded-lg">
    <div class="profile-info flex flex-wrap">
      <div class="profile-photo w-1/3">
        <img
          class="w-16 h-16 xs:w-32 xs:h-32 rounded-full mx-auto object-cover"
          :src="user.profilePhotoUrl"
          alt="User profile photo"
        />
      </div>

      <div>
        <h3 class="text-lg md: text-xl font-bold">{{ user.name }}</h3>
        <p class="text-gray-600 mb-2 text-sm">@{{ user.username }}</p>
        <p class="headline md:text-lg font-medium">{{ user.headline }}</p>
        <p>{{ user.bio }}</p>
      </div>

    </div>
    <div class="sm:w-2/3 ml-auto">

      <div class="interests flex flex-wrap my-3" v-if="user.topics.length > 0">
        <p
          class="tag text-sm mt-2 bg-blue-300 text-blue-700 px-3 rounded-full mr-3"
          v-for="topic in user.topics"
          :key="topic.slug"
        >
          #{{ topic.name }}
        </p>
      </div>
      <p v-else class="text-gray-600">You haven't followed any topic yet. <router-link class="text-blue-500" to="/topics/interests">Explore topics</router-link></p>
    </div>
    <router-link to="/profile/edit">
      <button
        class="mt-4 text-sm border-2 border-gray-500 py-1 px-3 rounded-sm block sm:ml-1/3"
      >
        Edit profile
      </button>
    </router-link>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { User } from '../../types';
import { namespace } from 'vuex-class';
const userNamespace = namespace('user');
@Component
export default class UserProfileInfo extends Vue {
  @userNamespace.State('currentUser') user!: User;
}
</script>

<style></style>
