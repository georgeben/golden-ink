<template>
  <div class="topic shadow-xl rounded-md w-4/5 mx-auto my-4 sm:w-5/12 md:w-32p lg:w-1/4">
    <div class="topic-img">
      <img
        :src="topic.imageUrl"
        alt="Topic image"
        class="w-full rounded-t-md"
      />
    </div>
    <div class="topic-detail p-4 flex justify-between items-center">
      <h1 class=" text-xl font-bold">{{ topic.name }}</h1>
      <button
        class=" border-2 border-accent px-5 py-1 rounded-full focus:outline-none focus:shadow-outline"
        :class="isFollowing? 'bg-accent border-accent text-white': 'text-accent'"
        @click="handleFollow"
      >
        {{ isFollowing ? 'Unfollow' : 'Follow' }}
      </button>

      <!-- <p>{{topic.followerCount}}</p> -->
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { Topic } from '../types';
@Component
export default class TopicCard extends Vue {
  @Prop({ required: true }) topic!: Topic;
  isFollowing = true;

  handleFollow() {
    if (this.isFollowing) {
      return (this.isFollowing = false);
      // Un-follow the topic
    }
    this.isFollowing = true;
  }
}
</script>

<style></style>
