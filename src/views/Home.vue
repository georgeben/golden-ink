<template>
  <div class="mx-auto home">
    <div class="jumbotron px-12 lg:mx-4 rounded-b-md shadow-xl py-20 mb-12">
      <div class="flex">
        <div class="intro-text mt-20">
          <h1
            class="font-black text-gray-800 my-6 leading-tight text-3xl md:text-5xl border-gray-400"
          >
            The Best Platform for<br />
            <span class="text-accent underline">writers</span>
          </h1>
          <p
            class="text-xl text-gray-800 leading-relaxed mb-6 w-11/12 md:w-1/2"
          >
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Excepturi
            eligendi teri duant.
          </p>
          <router-link to="/new-story">
            <button
              class="cta bg-accent hover:bg-blue-600 w-40 text-white p-3 shadow-xl rounded-md"
            >
              Write a story
            </button>
          </router-link>
        </div>

        <div class="editor-img mt-24">
          <img
            src="../assets/images/editor.jpg"
            alt="Text editor"
            class="shadow-xl"
          />
        </div>
      </div>
    </div>
    <div class="container mx-3 xs:mx-auto">
      <div class="stories flex flex-wrap my-8">
        <StoryCard v-for="story in stories" :key="story.slug" :story="story" />
      </div>

      <div class="topics flex flex-wrap">
        <TopicCard v-for="topic in topics" :key="topic.slug" :topic="topic" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import TopicCard from '@/components/TopicCard.vue';
import StoryCard from '@/components/Story/StoryCard.vue';
import { Topic, Story, User } from '../types';
import { Component, Vue } from 'vue-property-decorator';
import { getStories } from '../api/stories';
import { getTopics } from '../api/topics';
import { getModule } from 'vuex-module-decorators';
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

  topic: Topic = {
    id: 1,
    name: 'Tech',
    imageUrl:
      'https://cdn.dribbble.com/users/879147/screenshots/7906715/media/1b1d2ef35dab525ed63b8b5816813132.jpg',
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
  topics: Topic[] = [];

  async created(): Promise<void> {
    try {
      const stories = await getStories();
      console.log(stories);
      this.stories = stories;

      const topics = await getTopics();
      this.topics = topics;
    } catch (error) {
      console.log('Fuck! an error', error);
    }
  }
}
</script>

<style scoped>
.jumbotron {
  background-image: url('../assets/images/golden_inkbg.png');
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
}
</style>
