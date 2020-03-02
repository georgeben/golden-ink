<template>
  <div class="editor md:w-3/4 md:mx-auto">
    <div class="options flex justify-end hidden xs:flex">
      <button class="mr-3 border-2 text-accent border-accent py-1 px-4 hover:bg-gray-300">Save as Private</button>
      <button class="mr-3 border-2 text-accent border-accent py-1 px-4 hover:bg-gray-300">Save as draft</button>
      <button class="mr-3 border-2 text-accent border-accent py-1 px-4 hover:bg-gray-300">Publish</button>
    </div>

    <div class="editor-area bg-white shadow-xl rounded-lg mt-6">
      <input type="text" class="title text-3xl px-3 font-semibold w-full border-b" placeholder="Title" v-model="story.title">
      <vue-editor class="h-screen" v-model="story.content" placeholder="Write your story"></vue-editor>
    </div>
    <div class="mt-4 xs:hidden">
      <div class="options flex flex-col justify-end">
      <button class="mr-3 mb-3 border-2 text-accent border-accent py-1 px-4 hover:bg-gray-300">Save as Private</button>
      <button class="mr-3 mb-3 border-2 text-accent border-accent py-1 px-4 hover:bg-gray-300">Save as draft</button>
      <button class="mr-3 mb-3 border-2 text-accent border-accent py-1 px-4 hover:bg-gray-300">Publish</button>
    </div>
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
.ql-container.ql-snow{
  border: none !important;
}

.ql-toolbar.ql-snow{
  /* border: none !important; */
  border-top: none !important;
  border-left: none !important;
  border-right: none !important;
  border-bottom: 1px solid #e2e8f0 !important;
}
</style>