<template>
  <div class="profile-page bg-gray-200 py-20 px-3">
    <UserProfileInfo class="mb-6 md:w-3/4 mx-auto" />

    <div class="user-activity md:w-3/4 mx-auto">
      <h3 class="text-lg font-semibold">Your stories</h3>
      <FeedItem
        v-for="story in userStories"
        :key="story.slug"
        :story="story"
        :actions="false"
        :modify="true"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import UserProfileInfo from '@/components/UserProfile/UserProfileInfo.vue';
import FeedItem from '@/components/Feed/FeedItem.vue';
import { Story } from '../types';
import { namespace } from 'vuex-class';
import { getModule } from 'vuex-module-decorators';
import storiesModule from '@/store/modules/stories';

const storiesNamespace = namespace('stories');

@Component({
  components: {
    UserProfileInfo,
    FeedItem,
  },
})
export default class UserProfile extends Vue {
  storiesStore = getModule(storiesModule, this.$store);
  @storiesNamespace.Getter('userPublishedStories') userStories!: Story[];

  async created() {
    this.storiesStore.getUserStories();
  }
}
</script>

<style></style>
