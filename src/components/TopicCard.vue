<template>
  <div
    class="topic bg-white shadow-xl rounded-md w-full mx-auto my-4"
  >
    <div class="topic-img">
      <img
        :src="topic.imageUrl"
        alt="Topic image"
        class="w-full h-56 rounded-t-md object-cover"
      />
    </div>
    <div class="topic-detail p-4 flex justify-between items-center">
      <router-link :to="`/topics/${topic.slug}`">
        <h1 class=" text-xl font-bold">{{ topic.name }}</h1>
      </router-link>
      <button
        class=" border-2 border-accent px-4 py-1 rounded-full focus:outline-none focus:shadow-outline"
        :class="
          isFollowing ? 'bg-accent border-accent text-white' : 'text-accent'
        "
        @click="handleFollow"
      >
        {{ isFollowing ? 'Unfollow' : 'Follow' }}
      </button>

      <!-- <p>{{topic.followerCount}}</p> -->
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { Topic, User } from '../types';
import { namespace } from 'vuex-class';
import { getModule } from 'vuex-module-decorators';
import userModule from '@/store/modules/user';
const userNamespace = namespace('user');
@Component
export default class TopicCard extends Vue {
  @Prop({ required: true }) topic!: Topic;
  @userNamespace.State('currentUser') user!: User;
  userStore = getModule(userModule, this.$store);

  async handleFollow() {
    if(!this.user){
      return this.$router.push('/signin')
    }
    if (this.isFollowing) {
      await this.userStore.unfollowTopic(this.topic.slug);
    } else {
      await this.userStore.followTopic(this.topic.slug);
    }
  }

  get isFollowing(): boolean {
    if(!this.user) return false;
    if (this.user.topics?.some((topic) => topic.id === this.topic.id)) {
      return true;
    }
    return false;
  }
}
</script>

<style></style>
