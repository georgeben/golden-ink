<template>
  <div class="container">
    <vue-editor
      v-model="story.content"
      :disabled="true"
      :editorOptions="editorOptions"
    >
    </vue-editor>
    <div class="story-details">
      <p>Published in {{story.topic.name}}</p>
      <div class="likes">
        <label> 200 likes</label>
        <button>
          Like
        </button>
      </div>
      <div class="actions">
        <button>
          Bookmark
        </button>
        <button>
          Add to favourites
        </button>
      </div>

      <div class="author-details">
        <img class=" w-8 rounded-full" src="https://img.favpng.com/8/19/8/united-states-avatar-organization-information-png-favpng-J9DvUE98TmbHSUqsmAgu3FpGw.jpg" alt="">
        <p>
          {{story.author.name}}
        </p>
      </div>

      <div class="add-comment">
        <textarea cols="30" rows="10" placeholder="Add a comment"></textarea>
      </div>

      <div class="comments">
        <CommentCard v-for="comment in story.comments" :key="comment.id" :comment="comment" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { VueEditor } from 'vue2-editor';
import { user, feed } from '../mock-data';
import CommentCard from '@/components/Comments/CommentCard.vue';
import { getSingleStory } from '../api/stories';

@Component({
  components: {
    VueEditor,
    CommentCard,
  },
})
export default class ViewStory extends Vue {
  story = {
    content: '<h1>This is my story, this is my song</h1>',
    topic: {
      name: 'Fantasy'
    },
    author: {
      name: 'George Benjamin'
    }
  };
  editorOptions = {
    modules: {
      toolbar: false,
    },
  };

  comments = [
    {
      id: 1,
      user: user,
      content: 'Whats up man',
      story: feed[0],

    }
  ]

  async created(): Promise<void>{
    const storySlug: string = this.$route.params.story;
    // Get the story
    try {
      const story = await getSingleStory(storySlug);
      this.story = story;
    } catch (error) {
      console.log('Oh no an error', error)
    }
  }
}
</script>

<style></style>
