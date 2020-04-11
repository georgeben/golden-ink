<template>
  <div>
    <h3 class="text-lg font-semibold">Your Topics</h3>
    <div class="topic-list bg-white rounded-lg shadow-xl p-4 mt-4">
      <p v-if="user.topics.length <= 0">
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
          v-for="topic in user.topics"
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
import { Topic, User } from '../../types';
import { getTopics } from '@/api/topics';
import { namespace } from 'vuex-class';
const userNamespace = namespace('user');
@Component
export default class TopicList extends Vue {
  // TODO Get the topics from the vuex store
  @userNamespace.State('currentUser') user!: User;
}
</script>

<style scoped>
.topic {
  width: max-content;
}
</style>
