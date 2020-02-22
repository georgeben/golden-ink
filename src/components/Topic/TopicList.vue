<template>
  <div class="topic-list">
    <h3>Your Topics</h3>
    <ul>
      <li v-for="topic in topics" :key="topic.slug">#{{topic.name}}</li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Vue} from 'vue-property-decorator'; 
import { topics } from '../../mock-data';
import { Topic } from '../../types';
@Component
export default class TopicList extends Vue {  
// TODO Get the topics from the vuex store
  topics: Topic[] = topics;
}
</script>

<style>

</style>