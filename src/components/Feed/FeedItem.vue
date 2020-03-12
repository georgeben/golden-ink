<template>
  <div class="feed-item xs:flex bg-white shadow-xl rounded-lg my-4 p-3">
    <div class="story-image w-full mb-3 xs:w-2/5 md:w-1/5">
      <img
        class="w-full rounded-lg"
        src="../../assets/images/writing.jpeg"
        alt="Story image"
      />
    </div>
    <div class="feed-details px-3 w-3/4 flex flex-col justify-between">
      <div class="story-details">
        <p
          class="tag text-sm mt-2 bg-blue-300 text-blue-700 px-3 rounded-full inline-block"
          v-if="story.topic.name"
        >
          #{{ story.topic.name }}
        </p>
        <router-link :to="`/view/${story.slug}`"
          ><h1 class="text-xl font-bold">{{ story.title }}</h1></router-link
        >
        <p class="text-gray-600">{{ story.content.slice(0, 300) }}</p>
      </div>
      <div class="flex justify-between flex-wrap">
        <div class="author-info flex items-center my-2">
          <img
            class=" w-8 h-8 object-cover mr-2 rounded-full"
            :src="story.author.profilePhotoUrl"
            alt=""
          />
          <p class="text-gray-700 text-base font-medium">
            {{ story.author.name }}
          </p>
        </div>
        <div
          class="feed-item-actions flex items-center right-0 my-2"
          v-if="actions"
        >
          <div class="mr-4">
            <svg
              class="w-6 h-6 text-gray-500 fill-current"
              :class="bookmarked ? 'text-blue-500' : ''"
              height="404pt"
              viewBox="-58 0 404 404.54135"
              width="404pt"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="m277.527344 0h-267.257813c-5.523437 0-10 4.476562-10 10v374.527344c-.011719 7.503906 4.183594 14.378906 10.855469 17.804687 6.675781 3.429688 14.707031 2.832031 20.796875-1.550781l111.976563-80.265625 111.976562 80.269531c6.097656 4.367188 14.121094 4.960938 20.792969 1.535156 6.667969-3.425781 10.863281-10.292968 10.863281-17.792968v-374.527344c0-5.523438-4.480469-10-10.003906-10zm0 0"
              />
            </svg>
          </div>
          <div class="flex items-center">
            <svg
            class="text-gray-500 fill-current w-6 h-6 mr-2"
            :class="liked? 'text-red-600': ''"
              viewBox="0 -28 512.00002 512"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="m471.382812 44.578125c-26.503906-28.746094-62.871093-44.578125-102.410156-44.578125-29.554687 0-56.621094 9.34375-80.449218 27.769531-12.023438 9.300781-22.917969 20.679688-32.523438 33.960938-9.601562-13.277344-20.5-24.660157-32.527344-33.960938-23.824218-18.425781-50.890625-27.769531-80.445312-27.769531-39.539063 0-75.910156 15.832031-102.414063 44.578125-26.1875 28.410156-40.613281 67.222656-40.613281 109.292969 0 43.300781 16.136719 82.9375 50.78125 124.742187 30.992188 37.394531 75.535156 75.355469 127.117188 119.3125 17.613281 15.011719 37.578124 32.027344 58.308593 50.152344 5.476563 4.796875 12.503907 7.4375 19.792969 7.4375 7.285156 0 14.316406-2.640625 19.785156-7.429687 20.730469-18.128907 40.707032-35.152344 58.328125-50.171876 51.574219-43.949218 96.117188-81.90625 127.109375-119.304687 34.644532-41.800781 50.777344-81.4375 50.777344-124.742187 0-42.066407-14.425781-80.878907-40.617188-109.289063zm0 0"
              />
            </svg>
            <span>{{ story.likedBy.length }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { Story, User } from '../../types';
import { namespace } from 'vuex-class';
const userNamespace = namespace('user');
@Component
export default class FeedItem extends Vue {
  @Prop({ required: true }) story!: Story;
  @Prop({ type: Boolean, default: true }) actions!: boolean;

  @userNamespace.State('currentUser') user!: User;

  get bookmarked(): boolean {
    return this.user.bookmarks?.some(
      (bookmark) => bookmark.id === this.story?.id,
    ) as boolean;
  }

  get liked(): boolean {
    return this.story?.likedBy?.some(
      (user) => user.id === this.user.id,
    ) as boolean;
  }
}
</script>

<style></style>
