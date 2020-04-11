<template>
  <div class="bg-gray-200 py-20 px-3">
    <div class="container mx-auto">
      <h1 class="text-xl font-semibold pb-4">
        Here are some topics you can follow..
      </h1>
      <div class="topics grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <TopicCard v-for="topic in topics" :key="topic.slug" :topic="topic" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Topic } from '../../types';
import TopicCard from '../TopicCard.vue';
import { getModule } from 'vuex-module-decorators';
import { getTopics } from '@/api/topics';
@Component({
  components: {
    TopicCard,
  },
})
export default class Interests extends Vue {
  topics: Topic[] = [];

  async created() {
    const topics = await getTopics();
    this.topics = topics;
  }
}
</script>

<style scoped></style>
