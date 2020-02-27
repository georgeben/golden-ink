<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <h1 class=" text-2xl">{{ username }}</h1>
    <TopicCard :topic="topic" />
    <StoryCard v-for="story in stories" :key="story.slug" :story="story" />
  </div>
</template>

<script lang="ts">
import TopicCard from '@/components/TopicCard.vue';
import StoryCard from '@/components/Story/StoryCard.vue';
import { Topic, Story, User } from '../types';
import { Component, Vue } from 'vue-property-decorator';
import { getStories } from '../api/stories';
import { getModule } from 'vuex-module-decorators'
import UserModule from '../store/modules/user';

@Component({
  components: {
    TopicCard,
    StoryCard,
  },
})
export default class Home extends Vue {
  private text = 'This is my homepage. Yeah';
  userModule = getModule(UserModule, this.$store);
  username = this.userModule.name;


  topic: Topic = {
    id: 1,
    name: 'Tech',
    imageUrl:
      'https://digitalbarker.com/wp-content/uploads/2019/09/2018-07-10-image-35.jpg',
    slug: 'tech',
    followerCount: 30,
  };

  user: User = {
    createdAt: 1582057187505,
    updatedAt: 1582295056415,
    id: 1,
    name: 'George Kurobara',
    email: 'surplusforreal@gmail.com',
    username: 'changedman',
    slug: 'george-kurobara',
    headline: 'Software Craftsman',
    bio: 'A really soft boy',
    profilePhotoUrl:
      'https://lh6.googleusercontent.com/-oreYI0JA7Yw/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3rdk3M5DboNPVfg5dgyw4ikm57WcAA/s96-c/photo.jpg',
    emailNotificationSettings: {
      daily: false,
      weekly: true,
      reactions: true,
    },
  };

  stories: Story[] = [];

  async created(): Promise<void> {
    try {
      const stories = await getStories();
      console.log(stories);
      this.stories = stories;
    } catch (error) {
      console.log('Fuck! an error', error);
    }
  }
}
</script>

<style scoped></style>
