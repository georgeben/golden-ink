<template>
  <div>
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