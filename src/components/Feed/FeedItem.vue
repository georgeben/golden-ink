<template>
  <div class="feed-item xs:flex bg-white shadow-xl rounded-lg my-4 p-3">
    <div class="story-image w-full mb-3 xs:w-2/5 md:w-1/4">
      <img
        class="w-full rounded-lg"
        src="../../assets/images/writing.jpeg"
        alt="Story image"
      />
    </div>
    <div class="feed-details px-3 w-3/4 flex flex-col justify-between">
      <div class="story-details">
         <p class="tag text-sm mt-2 bg-blue-300 text-blue-700 px-3 rounded-full inline-block">#{{story.topic.name}}</p>
        <h1 class="text-xl font-bold">{{ story.title }}</h1>
        <p class="text-gray-600">{{ story.content.slice(0, 300) }}</p>
      </div>
      <div class="flex justify-between flex-wrap">
        <div class="author-info flex items-center my-2">
          <img
            class=" w-8 h-8 object-cover mr-2 rounded-full"
            src="https://i.pinimg.com/originals/03/3f/c5/033fc537c42bfe4e2eb5b6e128a2d083.png"
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
          <button title="Bookmark" class="mr-4">
            <svg
              class="w-5 h-5 text-gray-600 fill-current"
              viewBox="-58 0 404 404.54235"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="m277.527344 0h-267.257813c-5.519531 0-10 4.476562-10 10v374.527344c-.007812 7.503906 4.183594 14.378906 10.855469 17.808594 6.675781 3.425781 14.707031 2.828124 20.796875-1.550782l111.976563-80.269531 111.980468 80.265625c6.09375 4.371094 14.117188 4.964844 20.789063 1.539062 6.667969-3.425781 10.863281-10.296874 10.863281-17.792968v-374.527344c0-5.523438-4.480469-10-10.003906-10zm-10 384.523438-117.796875-84.441407c-3.484375-2.496093-8.171875-2.496093-11.652344 0l-117.800781 84.445313v-364.527344h247.25zm0 0"
              />
            </svg>
          </button>
          <button title="Add to favourites" class="flex items-center">
            <svg
              class="w-5 h-5 text-gray-600 fill-current mr-2"
              viewBox="0 -28 512.001 512"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M256 455.516c-7.29 0-14.316-2.641-19.793-7.438-20.684-18.086-40.625-35.082-58.219-50.074l-.09-.078c-51.582-43.957-96.125-81.918-127.117-119.313C16.137 236.81 0 197.172 0 153.871c0-42.07 14.426-80.883 40.617-109.293C67.121 15.832 103.488 0 143.031 0c29.555 0 56.621 9.344 80.446 27.77C235.5 37.07 246.398 48.453 256 61.73c9.605-13.277 20.5-24.66 32.527-33.96C312.352 9.344 339.418 0 368.973 0c39.539 0 75.91 15.832 102.414 44.578C497.578 72.988 512 111.801 512 153.871c0 43.3-16.133 82.938-50.777 124.738-30.993 37.399-75.532 75.356-127.106 119.309-17.625 15.016-37.597 32.039-58.328 50.168a30.046 30.046 0 01-19.789 7.43zM143.031 29.992c-31.066 0-59.605 12.399-80.367 34.914-21.07 22.856-32.676 54.45-32.676 88.965 0 36.418 13.535 68.988 43.883 105.606 29.332 35.394 72.961 72.574 123.477 115.625l.093.078c17.66 15.05 37.68 32.113 58.516 50.332 20.961-18.254 41.012-35.344 58.707-50.418 50.512-43.051 94.137-80.223 123.469-115.617 30.344-36.618 43.879-69.188 43.879-105.606 0-34.516-11.606-66.11-32.676-88.965-20.758-22.515-49.3-34.914-80.363-34.914-22.758 0-43.653 7.235-62.102 21.5-16.441 12.719-27.894 28.797-34.61 40.047-3.452 5.785-9.53 9.238-16.261 9.238s-12.809-3.453-16.262-9.238c-6.71-11.25-18.164-27.328-34.61-40.047-18.448-14.265-39.343-21.5-62.097-21.5zm0 0"
              />
            </svg>
            <span>200</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { Story } from '../../types';
@Component
export default class FeedItem extends Vue {
  @Prop({ required: true }) story!: Story;
  @Prop({ type: Boolean, default: true }) actions!: boolean;
}
</script>

<style></style>
