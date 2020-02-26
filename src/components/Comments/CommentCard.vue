<template>
  <div class="container">
    <div class="author-info">
      <img
        class=" w-8 rounded-full"
        src="https://img.favpng.com/8/19/8/united-states-avatar-organization-information-png-favpng-J9DvUE98TmbHSUqsmAgu3FpGw.jpg"
        alt=""
      />
      <p>
        {{ comment.user.name }}
      </p>
    </div>
    <p>
      {{comment.content}}
    </p>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop} from 'vue-property-decorator'; 
import { Comment } from '../../types';

@Component
export default class CommentCard extends Vue { 
  @Prop({ required: true }) comment!: Comment;
 }
</script>

<style></style>
