<template>
  <div class="editor h-screen">
    <div class="options flex justify-end">
      <button class="mr-3 border-2 text-accent border-accent py-1 px-4 hover:bg-gray-300">Save as Private</button>
      <button class="mr-3 border-2 text-accent border-accent py-1 px-4 hover:bg-gray-300">Save as draft</button>
      <button class="mr-3 border-2 text-accent border-accent py-1 px-4 hover:bg-gray-300">Publish</button>
    </div>

    <div class="editor-area bg-white shadow-xl rounded-lg mt-6">
      <input type="text" class="title text-3xl px-3 font-semibold w-full border border-gray-400" placeholder="Title" v-model="story.title">
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