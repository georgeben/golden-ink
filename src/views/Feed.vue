<template>
  <div class="feed md:flex md:justify-between md:items-start px-4 bg-gray-200 pt-20 pb-64">
    <TopicList class="w-full md:w-1/6 mb-4" />
    <div class="main-feed w-full md:w-3/5 mb-4">
      <h3 class="text-lg font-semibold">Your Feed</h3>
      <div v-if="feed.length <= 0" class="mt-4 bg-white shadow-xl rounded-lg pt-3">
        <h3 class=" text-lg text-center mb-3">Your feed is empty, follow some topics to begin</h3>
        <img src="../assets/images/emptyfeed.png" class="" alt="Empty feed image">
      </div>
      <FeedItem v-for="story in feed" :key="story.slug" :story="story" />
      <button v-if="loadMore" class="bg-accent text-white py-2 px-3 block mx-auto" @click="loadFeed">Load more</button>
    </div>
    <div class="featured-stories w-full md:w-1/5">
      <h3 class="text-lg font-semibold">Featured</h3>
      <StoryCard :story="feed[0]" :fullWidth="true" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue} from 'vue-property-decorator'; 
import { Story } from '../types';
import FeedItem from '@/components/Feed/FeedItem.vue';
import TopicList from '@/components/Topic/TopicList.vue';
import StoryCard from '@/components/Story/StoryCard.vue';
import { namespace } from 'vuex-class';
import { getModule } from 'vuex-module-decorators';
import userModule from '@/store/modules/user';

const userNamespace = namespace('user');
@Component({
  components: {
    FeedItem,
    TopicList,
    StoryCard,
  }
})
export default class Feed extends Vue { 
  userStore = getModule(userModule, this.$store);
  // feed: Story[] = feed;
  @userNamespace.State('userFeed') feed!: Story[];
  @userNamespace.State('loadMoreFeedActivity') loadMore!: boolean;
  limit = 15;
  offset = 0;

  async created() {
    if(this.feed.length > 0){
      this.userStore.getUserFeed({ offset: this.offset, limit: this.limit });
    } else {
      await this.userStore.getUserFeed({ offset: this.offset, limit: this.limit });
    }
  }

  async loadFeed(){
    if(!this.loadMore) return;
    this.offset += this.limit;
    this.userStore.getUserFeed({ offset: this.offset, limit: this.limit });
  }
 }
</script>

<style>

</style>