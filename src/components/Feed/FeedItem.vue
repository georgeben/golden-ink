<template>
  <div class="feed-item">
    <div class="story-image">
      <img src="../../assets/logo.png" alt="Story image">
    </div>
    <div class="feed-details">
      <h1>{{story.title}}</h1>
      <p>{{story.content.slice(0, 300)}}</p>
      <div class="author-info">
        <img class=" w-8 rounded-full" src="https://img.favpng.com/8/19/8/united-states-avatar-organization-information-png-favpng-J9DvUE98TmbHSUqsmAgu3FpGw.jpg" alt="">
        <p>
          {{story.author.name}}
        </p>
      </div>
      <div class="feed-item-actions">
        <button>
          Bookmark
        </button>
        <button>
          Add to favourites
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop} from 'vue-property-decorator'; 
import { Story } from '../../types';
@Component
export default class FeedItem extends Vue { 
  @Prop({ required: true }) story!: Story;
}
</script>

<style>

</style>