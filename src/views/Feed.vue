<template>
  <div class="feed">
    <h3>Feed</h3>
    <FeedItem v-for="story in feed" :key="story.slug" :story="story" />
    <TopicList />
    <div class="featured-stories">
      <h3>Featured</h3>
      <StoryCard :story="feed[0]" />
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