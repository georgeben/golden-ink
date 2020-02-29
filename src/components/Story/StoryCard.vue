<template>
  <div class="story-card rounded-story mt-4 shadow-xl p-3" :class="fullWidth? ' w-full': 'w-4/5 mx-auto xs:w-45p md:w-32p'">
    <div class="story-image">
      <img src="../../assets/images/tech_bg.png" alt="story image" class="rounded-story">
    </div>
    <div class="story-details my-1">
      <p class="tag text-sm mt-2 bg-blue-300 text-blue-700 px-3 rounded-full inline-block">#{{story.topic.name}}</p>
      <router-link to="/view-story"><h1 class="text-xl font-bold">{{story.title}}</h1></router-link>
      <p class=" text-gray-600">{{story.content.slice(0, 50)}}..</p>

      <div class="author-info flex items-center">
        <img class="w-8 h-8 rounded-full object-cover mr-2" src="https://i.pinimg.com/originals/03/3f/c5/033fc537c42bfe4e2eb5b6e128a2d083.png" alt="">
        <p class="text-gray-700 text-base font-medium">
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
  @Prop({ default: false }) fullWidth!: boolean;
}
</script>

<style>

</style>