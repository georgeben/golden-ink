<template>
  <div class="profile-page">
    <UserProfileInfo />

    <h3>Your stories</h3>
    <FeedItem v-for="story in userStories" :key="story.slug" :story="story" :actions="false"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue} from 'vue-property-decorator'; 
import UserProfileInfo from '@/components/UserProfile/UserProfileInfo.vue';
import FeedItem from '@/components/Feed/FeedItem.vue';
import { feed } from '../mock-data';
import { Story } from '../types';
@Component({
  components: {
    UserProfileInfo,
    FeedItem,
  }
})
export default class UserProfile extends Vue { 
  userStories: Story[] = feed;
 }
</script>

<style>

</style>