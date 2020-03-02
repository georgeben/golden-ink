<template>
  <div class="bg-gray-200 py-24 md:px-10 px-3">
    <Editor />
  </div>
</template>

<script lang='ts'>
import { Component, Vue} from 'vue-property-decorator'; 
import Editor from '@/components/Story/Editor.vue';

@Component({
  components: {
    Editor,
  }
})
export default class NewStory extends Vue { 

 }
</script>

<style>

</style>