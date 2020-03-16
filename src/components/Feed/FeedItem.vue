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
        <router-link
          :to="draft ? `/write/?draft=${story.slug}` : `/view/${story.slug}`"
        >
          <div class="flex items-center mt-2">
            <svg
              v-if="story.private"
              class="w-4 h-4 text-gray-700 fill-current mr-2"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path
                d="M437.333 192h-32v-42.667C405.333 66.99 338.344 0 256 0S106.667 66.99 106.667 149.333V192h-32A10.66 10.66 0 0064 202.667v266.667C64 492.865 83.135 512 106.667 512h298.667C428.865 512 448 492.865 448 469.333V202.667A10.66 10.66 0 00437.333 192zM287.938 414.823a10.67 10.67 0 01-10.604 11.844h-42.667a10.67 10.67 0 01-10.604-11.844l6.729-60.51c-10.927-7.948-17.458-20.521-17.458-34.313 0-23.531 19.135-42.667 42.667-42.667s42.667 19.135 42.667 42.667c0 13.792-6.531 26.365-17.458 34.313l6.728 60.51zM341.333 192H170.667v-42.667C170.667 102.281 208.948 64 256 64s85.333 38.281 85.333 85.333V192z"
              />
            </svg>
            <h1 class="text-xl font-bold">{{ story.title }}</h1>
          </div>
        </router-link>
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
              :class="liked ? 'text-red-600' : ''"
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
        <modal :show="displayModal" @close="displayModal = false">
          <h3 class="text-red-500 text-xl font-medium mb-4">Delete story?</h3>
          <p>
            Are you sure you want to delete <span>{{ story.title }}?</span>
          </p>

          <div class="mt-6">
            <button
              class="bg-red-500 hover:bg-red-600 text-white py-2 px-4 mr-6"
              @click="() => deleteStory(story.slug)"
            >
              Delete
            </button>
            <button @click="displayModal = false">
              Cancel
            </button>
          </div>
        </modal>
        <div
          class="feed-item-actions flex items-center right-0 my-2"
          v-if="modify"
        >
          <div class="mr-4" @click="displayModal = !displayModal">
            <svg
              class="text-gray-500 hover:text-red-600 fill-current w-6 h-6 cursor-pointer"
              height="427pt"
              viewBox="-40 0 427 427.00131"
              width="427pt"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="m232.398438 154.703125c-5.523438 0-10 4.476563-10 10v189c0 5.519531 4.476562 10 10 10 5.523437 0 10-4.480469 10-10v-189c0-5.523437-4.476563-10-10-10zm0 0"
              />
              <path
                d="m114.398438 154.703125c-5.523438 0-10 4.476563-10 10v189c0 5.519531 4.476562 10 10 10 5.523437 0 10-4.480469 10-10v-189c0-5.523437-4.476563-10-10-10zm0 0"
              />
              <path
                d="m28.398438 127.121094v246.378906c0 14.5625 5.339843 28.238281 14.667968 38.050781 9.285156 9.839844 22.207032 15.425781 35.730469 15.449219h189.203125c13.527344-.023438 26.449219-5.609375 35.730469-15.449219 9.328125-9.8125 14.667969-23.488281 14.667969-38.050781v-246.378906c18.542968-4.921875 30.558593-22.835938 28.078124-41.863282-2.484374-19.023437-18.691406-33.253906-37.878906-33.257812h-51.199218v-12.5c.058593-10.511719-4.097657-20.605469-11.539063-28.03125-7.441406-7.421875-17.550781-11.5546875-28.0625-11.46875h-88.796875c-10.511719-.0859375-20.621094 4.046875-28.0625 11.46875-7.441406 7.425781-11.597656 17.519531-11.539062 28.03125v12.5h-51.199219c-19.1875.003906-35.394531 14.234375-37.878907 33.257812-2.480468 19.027344 9.535157 36.941407 28.078126 41.863282zm239.601562 279.878906h-189.203125c-17.097656 0-30.398437-14.6875-30.398437-33.5v-245.5h250v245.5c0 18.8125-13.300782 33.5-30.398438 33.5zm-158.601562-367.5c-.066407-5.207031 1.980468-10.21875 5.675781-13.894531 3.691406-3.675781 8.714843-5.695313 13.925781-5.605469h88.796875c5.210937-.089844 10.234375 1.929688 13.925781 5.605469 3.695313 3.671875 5.742188 8.6875 5.675782 13.894531v12.5h-128zm-71.199219 32.5h270.398437c9.941406 0 18 8.058594 18 18s-8.058594 18-18 18h-270.398437c-9.941407 0-18-8.058594-18-18s8.058593-18 18-18zm0 0"
              />
              <path
                d="m173.398438 154.703125c-5.523438 0-10 4.476563-10 10v189c0 5.519531 4.476562 10 10 10 5.523437 0 10-4.480469 10-10v-189c0-5.523437-4.476563-10-10-10zm0 0"
              />
            </svg>
          </div>
          <div class="flex items-center">
            <svg
              class="text-gray-500 fill-current w-6 h-6 mr-2"
              viewBox="0 -28 512.00002 512"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="m471.382812 44.578125c-26.503906-28.746094-62.871093-44.578125-102.410156-44.578125-29.554687 0-56.621094 9.34375-80.449218 27.769531-12.023438 9.300781-22.917969 20.679688-32.523438 33.960938-9.601562-13.277344-20.5-24.660157-32.527344-33.960938-23.824218-18.425781-50.890625-27.769531-80.445312-27.769531-39.539063 0-75.910156 15.832031-102.414063 44.578125-26.1875 28.410156-40.613281 67.222656-40.613281 109.292969 0 43.300781 16.136719 82.9375 50.78125 124.742187 30.992188 37.394531 75.535156 75.355469 127.117188 119.3125 17.613281 15.011719 37.578124 32.027344 58.308593 50.152344 5.476563 4.796875 12.503907 7.4375 19.792969 7.4375 7.285156 0 14.316406-2.640625 19.785156-7.429687 20.730469-18.128907 40.707032-35.152344 58.328125-50.171876 51.574219-43.949218 96.117188-81.90625 127.109375-119.304687 34.644532-41.800781 50.777344-81.4375 50.777344-124.742187 0-42.066407-14.425781-80.878907-40.617188-109.289063zm0 0"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import Modal from '@/components/Widgets/Modal.vue';
import { Story, User } from '../../types';
import { namespace } from 'vuex-class';
import storyModule from '@/store/modules/stories';
import { getModule } from 'vuex-module-decorators';
const userNamespace = namespace('user');

@Component({
  components: {
    Modal,
  },
})
export default class FeedItem extends Vue {
  @Prop({ required: true }) story!: Story;
  @Prop({ type: Boolean, default: true }) actions!: boolean;
  @Prop({ type: Boolean, default: false }) modify!: boolean;
  @Prop({ default: false }) draft!: boolean;

  storiesStore = getModule(storyModule, this.$store);
  @userNamespace.State('currentUser') user!: User;

  displayModal = false;

  async deleteStory(){
    await this.storiesStore.deleteStory(this.story.slug);
  }

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
