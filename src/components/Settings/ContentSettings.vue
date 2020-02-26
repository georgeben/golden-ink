<template>
 <div class='container'>
   <TopicCard v-for="topic in topics" :key="topic.slug" :topic="topic" />
 </div>
</template>
 
<script lang='ts'>
import { Component, Vue} from 'vue-property-decorator'; 
import TopicCard from '../TopicCard.vue';
import { topics } from '../../mock-data';

@Component({
  components: {
    TopicCard,
  }
})
export default class ContentSettings extends Vue { 
  topics = topics;
 }
</script>
 
<style>
</style>