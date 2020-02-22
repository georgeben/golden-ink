<template>
  <div class="topic">
    <div class="topic-img">
      <img :src="topic.imageUrl" alt="Topic image" width="200">
    </div>
    <div class="topic-detail">
      <h1>{{topic.name}}</h1>
      <button>
        Follow
      </button>

      <p>{{topic.followerCount}}</p>
    </div>
  </div>
</template>

<script lang='ts'>
import { Vue, Component, Prop } from 'vue-property-decorator';
import { Topic } from '../types';
@Component
export default class TopicCard extends Vue{
  @Prop({ required: true }) topic!: Topic;
}
</script>

<style>

</style>