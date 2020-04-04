<template>
  <div>
    <h3 class="text-lg font-semibold">Your Topics</h3>
    <div class="topic-list bg-white rounded-lg shadow-xl p-4 mt-4">
      <div class="flex md:flex-col overflow-x-scroll md:overflow-x-hidden">
        <p
          class="py-1 my-2 px-4 rounded-full topic mr-3"
          :class="`bg-${(col = getRandomColour())}-300 text-${col}-700`"
          v-for="topic in topics"
          :key="topic.slug"
        >
          #{{ topic.name }}
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Topic } from '../../types';
import { getTopics } from '@/api/topics';
@Component
export default class TopicList extends Vue {
  // TODO Get the topics from the vuex store
  topics: Topic[] = [];

  getRandomColour() {
    const colours = ['yellow', 'purple', 'blue', 'red', 'teal', 'orange'];
    const colourIndex: number = Math.floor(Math.random() * colours.length);
    const colour = colours[colourIndex];
    return colour;
  }
  async created() {
    const topics = await getTopics();
    this.topics = topics;
  }
}
</script>

<style scoped>
.topic {
  width: max-content;
}
</style>
