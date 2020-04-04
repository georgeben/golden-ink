<template>
  <div class="vieq-profile-page bg-gray-200 py-20 px-3">
    <div class="mb-6 md:w-3/4 mx-auto">
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
          <div
            class="interests flex flex-wrap my-3"
            v-if="user.topics.length > 0"
          >
            <p
              class="tag text-sm mt-2 bg-blue-300 text-blue-700 px-3 rounded-full mr-3"
              v-for="topic in user.topics"
              :key="topic.slug"
            >
              #{{ topic.name }}
            </p>
          </div>
          <p v-else class="text-gray-600">
            {{user.name}} hasn't followed any topic yet.
          </p>
        </div>
      </div>
    </div>

    <div class="user-activity md:w-3/4 mx-auto">
      <h3 class="text-lg font-semibold">{{user.name.split(' ').shift()}}'s stories</h3>
      <FeedItem
        v-for="story in userStories"
        :key="story.slug"
        :story="story"
        :actions="true"
        :modify="false"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { User, Story } from '../types';
import { getUserProfile, getStoriesByUser } from '@/api/user-api-service';
import FeedItem from '@/components/Feed/FeedItem.vue';

@Component({
  components: {
    FeedItem
  }
})
export default class ViewProfile extends Vue {
  user: User | null = null;
  userStories: Story[] | null = null;

  async created(){
    try {
      const username = this.$route.params.username;
      const profile = await getUserProfile(username);
      this.user = profile;
      const userStories = await getStoriesByUser(username);
      this.userStories = userStories;
    } catch (error) {
      console.log('Error while fetching user\'s profile');
    }
  }
}
</script>
