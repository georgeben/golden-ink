<template>
  <div class="feed md:flex md:justify-between md:items-start px-4 bg-gray-200 pt-20 pb-64">
    <TopicList class="w-full md:w-1/6 mb-4" />
    <div class="main-feed w-full md:w-3/5 mb-4">
      <h3 class="text-lg font-semibold">Your Feed</h3>
      <FeedItem v-for="story in feed" :key="story.slug" :story="story" />
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
import { feed } from '../mock-data';
@Component({
  components: {
    FeedItem,
    TopicList,
    StoryCard,
  }
})
export default class Feed extends Vue { 
  feed: Story[] = feed;
 }
</script>

<style>

</style>