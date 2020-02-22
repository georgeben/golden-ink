<template>
  <div class="story-card">
    <div class="story-image">
      <img src="../../assets/logo.png" alt="story image">
    </div>
    <div class="story-details">
      <p class="tag">#{{story.topic.name}}</p>
      <router-link to="/view-story"><h1>{{story.title}}</h1></router-link>
      <p>{{story.content.slice(0, 10)}}..</p>

      <div class="author-info">
        <img class=" w-8 rounded-full" src="https://img.favpng.com/8/19/8/united-states-avatar-organization-information-png-favpng-J9DvUE98TmbHSUqsmAgu3FpGw.jpg" alt="">
        <p>
          {{story.author.name}}
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { Story } from '../../types';

@Component
export default class StoryCard extends Vue {
  @Prop({ required: true }) story!: Story;
}
</script>

<style>

</style>