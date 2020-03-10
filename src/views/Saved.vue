<template>
 <div class= "bg-gray-200 h-screen py-24 md:px-10">
   <tabs>
    <tab name="Drafts" :selected="true">
      <div v-if="drafts.length > 0" class="lg:w-5/6 lg:mx-auto">
        <FeedItem v-for="draft in drafts" :key="draft.id" :story="draft" :actions="false" />
      </div>
      <h1 v-else>You have no drafts currently</h1>
    </tab>
    <tab name="Bookmarks">
      <div v-if="bookmarks.length > 0" class="lg:w-5/6 lg:mx-auto">
        <FeedItem v-for="bookmark in bookmarks" :key="bookmark.id" :story="bookmark" />
      </div>
      <h1 v-else class="text-center mt-8 font-medium">You have no bookmarks currently</h1>
    </tab>
    <tab name="Favourites">
      <div v-if="favourites.length > 0" class="lg:w-5/6 lg:mx-auto">
        <FeedItem v-for="fav in favourites" :key="fav.id" :story="fav" />
      </div>
      <h1 v-else class="text-center mt-8 font-medium">You have no favourites currently</h1>
    </tab>
  </tabs>
 </div>
</template>
 
<script lang='ts'>
import { Component, Vue} from 'vue-property-decorator'; 
import Tabs from '@/components/Tabs.vue';
import Tab from '@/components/Tab.vue';
import { feed } from '../mock-data';
import { Story } from '@/types';
import FeedItem from '@/components/Feed/FeedItem.vue';
import { namespace } from 'vuex-class';

const storiesNamespace = namespace('stories');
@Component({
  components: {
    Tabs,
    Tab,
    FeedItem,
  }
})
export default class Saved extends Vue { 
  bookmarks = [];
  favourites = [];
  @storiesNamespace.Getter('userDrafts') drafts!: Story[];
 }
</script>
 
<style>
</style>