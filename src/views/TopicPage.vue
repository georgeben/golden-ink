<template>
  <div class="bg-gray-200 py-20 px-3">
    <div class="container mx-auto">
      <div class="bg-white p-3 rounded-lg shadow-lg">
        <div class="flex items-center">
          <img
            :src="topic.imageUrl"
            alt="Topic image"
            class="topic-img w-32 h-48 sm:w-48 md:w-64 rounded-md shadow-lg mr-4"
          />
          <div>
            <h2 class=" text-2xl font-semibold">{{ topic.name }}</h2>
            <button
              class=" border-2 border-accent px-4 py-1 mt-2 rounded-full focus:outline-none focus:shadow-outline"
              :class="
                isFollowing
                  ? 'bg-accent border-accent text-white'
                  : 'text-accent'
              "
              @click="handleFollow"
            >
              {{ isFollowing ? 'Unfollow' : 'Follow' }}
            </button>
          </div>
        </div>
        <div class="topic-stats mt-4">
          <p class="inline-block mr-6">
            <span class="font-medium">{{ topic.followers.length }}</span>
            followers
          </p>
          <p class="inline-block">
            <span class="font-medium">{{ topicStories.length }}</span>
            stories
          </p>

        </div>
      </div>

      <div class="topic-stories">
        <FeedItem
          v-for="story in topicStories"
          :key="story.slug"
          :story="story"
          :actions="true"
          :modify="false"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import FeedItem from '@/components/Feed/FeedItem.vue';
import { Topic, User, Story } from '../types';
import { getTopic, getTopicStories } from '@/api/topics';
import { namespace } from 'vuex-class';
import { getModule } from 'vuex-module-decorators';
import userModule from '@/store/modules/user';
const userNamespace = namespace('user');

@Component({
  components: {
    FeedItem,
  },
})
export default class TopicPage extends Vue {
  userStore = getModule(userModule, this.$store);
  @userNamespace.State('currentUser') user!: User;

  topic: Topic | null = null;
  topicStories: Story[] | null = null;
  async created() {
    const slug = this.$route.params.topic as string;
    try {
      const topic = await getTopic(slug);
      this.topic = topic;
      const topicStories = await getTopicStories(slug);
      this.topicStories = topicStories;
    } catch (error) {
      console.log('An error occurred while fetching topic', error);
    }
  }

  async handleFollow() {
    if(!this.user){
      return this.$router.push('/signin');
    }
    if (this.topic?.slug) {
      if (this.isFollowing) {
        await this.userStore.unfollowTopic(this.topic.slug);
      } else {
        await this.userStore.followTopic(this.topic.slug);
      }
    }
  }

  get isFollowing(): boolean {
    if(!this.user){
      return false;
    }
    if (this.user.topics?.some((topic) => topic.id === this.topic?.id)) {
      return true;
    }
    return false;
  }
}
</script>

<style></style>
