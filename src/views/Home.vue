<template>
  <div class="home bg-gray-200">
    <div
      class="jumbotron px-3 xs:px-6 md:px-8 rounded-b-md shadow-xl py-20 mb-12"
    >
      <div class=" md:flex">
        <div class="intro-text mt-20 md:w-3/5 lg:w-1/2">
          <h1
            class="font-black text-gray-800 my-6 leading-tight text-3xl md:text-5xl border-gray-400"
          >
            The Best Platform for <br class="hidden lg:inline" />
            <span class="text-accent underline">writers</span>
          </h1>
          <div class="editor-img my-6 md:hidden">
            <img
              src="../assets/images/editor.png"
              alt="Text editor"
              class="shadow-xl"
            />
          </div>
          <p
            class="text-xl text-gray-800 leading-relaxed mb-6 w-11/12 md:w-1/2"
          >
            Share your stories with the world, follow the topics you care about without all the noise.
          </p>
          <router-link to="/write">
            <button
              class="cta bg-accent hover:bg-blue-600 w-40 text-white p-3 shadow-xl rounded-md"
            >
              Write a story
            </button>
          </router-link>
        </div>

        <div class="editor-img hidden md:block sm:w-2/5 lg:w-1/2 mt-24">
          <img
            src="../assets/images/editor.png"
            alt="Text editor"
            class="shadow-xl"
          />
        </div>
      </div>
    </div>
    <div class="container xs:mx-auto px-2">
      <div class="stories grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 my-8">
        <StoryCard class=" h-auto" v-for="story in stories" :key="story.slug" :story="story" />
      </div>
      <button
        v-if="loadMoreStories && stories.length > 0"
        class=" border border-accent text-accent rounded-full py-2 px-3 block mx-auto"
        @click="loadStories"
      >
        Load more
      </button>

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

  stories: Story[] = [];
  topics: Topic[] = [];
  limit = 16;
  offset = 0;
  loadMoreStories = true;
  async created(){
    try {
      const { stories, count } = await getStories({
        offset: this.offset,
        limit: this.limit,
      });
      this.stories = stories;
      if (this.stories.length >= count) {
        this.loadMoreStories = false;
      }

      const topics = await getTopics();
      this.topics = topics;
    } catch (error) {
      console.log('Fuck! an error', error);
    }
  }

  async loadStories() {
    if (!this.loadMoreStories) return;
    this.offset += this.limit;
    const { stories, count } = await getStories({
      offset: this.offset,
      limit: this.limit,
    });
    this.stories = [...this.stories, ...stories];
    if (this.stories.length >= count) {
      this.loadMoreStories = false;
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
