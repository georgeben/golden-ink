<template>
  <div>
    <h3 class="text-lg font-semibold">Your Topics</h3>
    <div class="topic-list bg-white rounded-lg shadow-xl p-4 mt-4">
      <p v-if="topics.length <= 0">
        You haven't followed any topic yet.
        <router-link class="text-blue-500" to="/topics/interests"
          >Explore topics</router-link
        >
      </p>
      <div
        v-else
        class="flex md:flex-col overflow-x-scroll md:overflow-x-hidden"
      >
        <router-link
          :to="`/topics/${topic.slug}`"
          v-for="topic in topics"
          :key="topic.slug"
        >
          <p
            class="py-1 my-2 px-4 rounded-full topic mr-3 bg-blue-300 text-blue-700"
          >
            #{{ topic.name }}
          </p>
        </router-link>
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
