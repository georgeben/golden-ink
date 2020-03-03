<template>
  <div class="md:w-3/4 mx-auto">
    <h1 class="text-xl font-semibold mb-6">Settings</h1>
    <div class=" bg-white shadow-xl rounded-md p-4">
      <div class="mb-8">
        <h3 class="text-lg font-semibold mb-4">Content</h3>
        <div class="">
          <p class="text-gray-600">Manage the topics you follow</p>
          <router-link to="/topics/interests">
            <button class="bg-accent text-white py-2 px-6 mt-4">
              Manage topics
            </button>
          </router-link>
        </div>
      </div>
      <div>
        <h3 class="text-lg font-semibold mb-8">Notifications</h3>
        <div>
          <div class="notification-option flex items-center">
            <p class=" w-11/12 mb-4 text-gray-600">
              Alert me when a story is published
            </p>
            <switches
              v-model="updatedNotificationSettings.newStory"
              :color="switchColour"
              theme="bulma"
            ></switches>
          </div>
          <div class="notification-option flex items-center">
            <p class=" w-11/12 mb-4 text-gray-600">Daily email digest</p>
            <switches
              v-model="updatedNotificationSettings.daily"
              :color="switchColour"
              theme="bulma"
            ></switches>
          </div>
          <div class="notification-option flex items-center">
            <p class=" w-11/12 mb-4 text-gray-600">Weekly email digest</p>
            <switches
              v-model="updatedNotificationSettings.weekly"
              :color="switchColour"
              theme="bulma"
            ></switches>
          </div>
          <div class="notification-option flex items-center">
            <p class=" w-11/12 mb-4 text-gray-600">
              Alert me when someone reacts to my story
            </p>
            <switches
              v-model="updatedNotificationSettings.reactions"
              :color="switchColour"
              theme="bulma"
            ></switches>
          </div>
        </div>
      </div>
      <div>
        <h3 class="text-lg font-semibold mb-4">Account</h3>
        <button class="bg-red-600 text-white py-2 px-6">
          Deactivate account
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Switches from 'vue-switches';

@Component({
  components: {
    Switches,
  },
})
export default class SettingsUI extends Vue {
  updatedNotificationSettings = {
    newStory: '',
    daily: '',
    weekly: '',
    reactions: '',
  };
  switchColour = 'blue';
}
</script>

<style scoped>
.edit-profile {
  padding-top: 0;
  padding: 0;
}
</style>
