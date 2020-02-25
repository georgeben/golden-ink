<template>
  <div class="editor">
    <div class="options">
      <button>Save as Private</button>
      <button>Save as draft</button>
      <button>Publish</button>
    </div>

    <div class="editor-area">
      <input type="text" class="title" placeholder="Title" v-model="story.title">
      <vue-editor v-model="story.content" placeholder="Write your story"></vue-editor>
    </div>
  </div>
</template>

<script lang='ts'>
import { Component, Vue} from 'vue-property-decorator'; 
import { VueEditor } from 'vue2-editor';

@Component({
  components: {
    VueEditor,
  }
})
export default class Editor extends Vue { 
  data(){
    return {
      story: {
        title: '',
        content: '',
      }
    }
  }
 }

</script>

<style>

</style>