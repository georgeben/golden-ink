<template>
  <div class="bg-gray-200 py-20 px-2">
    <div class="container mx-auto">
      <SearchBox class=" md:w-1/2 md:mx-auto sm:hidden" />
      <tabs>
        <tab name="Stories" :selected="selectedTab === 'stories'">
          <div
            v-if="searchResults.stories.length > 0"
            class="lg:w-5/6 lg:mx-auto"
          >
            <FeedItem
              v-for="story in searchResults.stories"
              :key="story.id"
              :story="story"
              :actions="true"
            />
          </div>
          <h1 class="text-center mt-8 font-medium" v-else>
            No story matched your search
          </h1>
        </tab>
        <tab name="Users" :selected="selectedTab === 'users'">
          <div
            v-if="searchResults.users.length > 0"
            class="lg:w-5/6 lg:mx-auto"
          >
            <UserCard
              v-for="user in searchResults.users"
              :key="user.id"
              :user="user"
              class="my-2"
            />
          </div>
          <h1 v-else class="text-center mt-8 font-medium">
            No writer matched your search
          </h1>
        </tab>
        <tab name="Topics" :selected="selectedTab === 'topics'">
          <div
            v-if="searchResults.topics.length > 0"
            class="lg:w-5/6 lg:mx-auto"
          >
            <TopicCard
              v-for="topic in searchResults.topics"
              :key="topic.slug"
              :topic="topic"
            />
          </div>
          <h1 v-else class="text-center mt-8 font-medium">
            No topic matched your search
          </h1>
        </tab>
      </tabs>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Tabs from '@/components/Tabs.vue';
import Tab from '@/components/Tab.vue';
import FeedItem from '@/components/Feed/FeedItem.vue';
import UserCard from '@/components/User/UserCard.vue';
import SearchBox from '@/components/Search/SearchBox.vue';
import TopicCard from '@/components/TopicCard.vue';
import { namespace } from 'vuex-class';
import { SearchResults as SearchRes } from '@/types';
const searchNamespace = namespace('search');

@Component({
  components: {
    Tabs,
    Tab,
    FeedItem,
    TopicCard,
    UserCard,
    SearchBox
  },
})
export default class SearchResults extends Vue {
  @searchNamespace.State('searchResults') searchResults!: SearchRes;

  selectedTab = 'stories';

  created() {
    const tab = this.$route.query.tab;
    if (tab) {
      switch (tab) {
        case 'stories':
          return (this.selectedTab = 'stories');
        case 'users':
          return (this.selectedTab = 'users');
        case 'topics':
          return (this.selectedTab = 'topics');
        default:
        //TODO Go to 404 page
      }
    } else {
      this.selectedTab = 'stories';
    }
  }
}
</script>

<style></style>
