<template>
  <div class="story-card w-full bg-white rounded-story mt-4 shadow-lg p-3">
    <div v-if="story.imageUrl" class="story-image">
      <!-- <img :src="story.imageUrl" alt="story image" class="rounded-story"> -->
      <cld-image :publicId="story.imageCloudinaryId" width="300" crop="scale" />
    </div>
    <div class="story-details my-1 flex flex-col justify-center">
      <div class="heading">
        <p class="tag text-sm mt-2 bg-blue-300 text-blue-700 px-3 rounded-full inline-block">#{{story.topic.name}}</p>
        <router-link :to="`/view/${story.slug}`"><h1 class="text-xl font-bold">{{story.title}}</h1></router-link>
        <p class=" text-gray-600">{{story.content.slice(0, story.imageUrl? 80: 300)}}..</p>
      </div>

      <div class="author-info flex items-center">
        <img class="w-8 h-8 rounded-full object-cover mr-2" :src="story.author.profilePhotoUrl" alt="Author image">
        <div>
          <p class="text-gray-700 text-base font-medium">
            {{story.author.name}}
          </p>
          <p class="text-xs text-gray-600">
            {{new Date(story.createdAt).toDateString()}}
          </p>
        </div>
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
  // @Prop({ default: false }) fullWidth!: boolean;
}
</script>

<style>

</style>