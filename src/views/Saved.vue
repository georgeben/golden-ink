<template>
  <div class="bg-gray-200 h-screen py-24 md:px-10">
    <tabs>
      <tab name="Drafts" :selected="selectedTab === 'drafts'">
        <div v-if="drafts.length > 0" class="lg:w-5/6 lg:mx-auto">
          <FeedItem
            v-for="draft in drafts"
            :key="draft.id"
            :story="draft"
            :actions="false"
            :draft="true"
          />
        </div>
        <h1 class="text-center mt-8 font-medium" v-else>You have no drafts currently</h1>
      </tab>
      <tab name="Bookmarks" :selected="selectedTab === 'bookmarks'">
        <div v-if="bookmarks.length > 0" class="lg:w-5/6 lg:mx-auto">
          <FeedItem
            v-for="bookmark in bookmarks"
            :key="bookmark.id"
            :story="bookmark"
            :actions="false"
          />
        </div>
        <h1 class="text-center mt-8 font-medium" v-else>You have no bookmarks currently</h1>
      </tab>
      <tab name="Favourites" :selected="selectedTab === 'favourites'">
        <div v-if="favourites.length > 0" class="lg:w-5/6 lg:mx-auto">
          <FeedItem
            v-for="favourites in favourites"
            :key="favourites.id"
            :story="favourites"
            :actions="false"
          />
        </div>
        <h1 v-else class="text-center mt-8 font-medium">
          You have no favourites currently
        </h1>
      </tab>
    </tabs>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Tabs from '@/components/Tabs.vue';
import Tab from '@/components/Tab.vue';
import { Story } from '@/types';
import FeedItem from '@/components/Feed/FeedItem.vue';
import { namespace } from 'vuex-class';

const storiesNamespace = namespace('stories');
const userNamespace = namespace('user');
@Component({
  components: {
    Tabs,
    Tab,
    FeedItem,
  },
})
export default class Saved extends Vue {
  @storiesNamespace.Getter('userDrafts') drafts!: Story[];
  @userNamespace.Getter('userBookmarks') bookmarks!: Story[];
  @userNamespace.Getter('userFavourites') favourites!: Story[];

  selectedTab = '';

  created() {
    const tab = this.$route.query.tab;
    if (tab) {
      switch (tab) {
        case 'bookmarks':
          return (this.selectedTab = 'bookmarks');
        case 'favourites':
          return (this.selectedTab = 'favourites');
        case 'drafts':
          return (this.selectedTab = 'drafts');
        default:
        //TODO Go to 404 page
      }
    } else {
      this.selectedTab = 'drafts';
    }
  }
}
</script>

<style></style>
