<template>
  <div class="ml-auto relative">
    <button
      @click="isOpen = !isOpen"
      class="focus:outline-none focus:shadow-outline"
      id="triggerButton"
      @blur="onBlur"
    >
      <img
        :src="profileImg"
        alt="User profile image"
        class="w-8 h-8 sm:w-10 sm:h-10 object-cover rounded-full focus:outline-none focus:shadow-outline"
      />
    </button>
    <div
      class="bg-white py-2 absolute right-0 shadow-lg w-40 text-center rounded-lg"
      v-if="isOpen"
    >
      <p @click="isOpen = false">
        <router-link
          v-for="item in dropDownLinks"
          :key="item.title"
          :to="item.href"
          class="block px-3 hover:text-gray-600 mx-auto my-5"
          >{{ item.title }}
        </router-link>
      </p>

      <p
        @click="$emit('logout')"
        class="block px-3 text-red-600 mx-auto my-2 cursor-pointer"
      >
        Log out
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
@Component
export default class DropDown extends Vue {
  @Prop({ required: true, type: String }) profileImg!: string;
  isOpen = false;

  dropDownLinks = [
    {
      title: 'Your feed',
      href: '/feed',
    },
    {
      title: 'Your profile',
      href: '/profile',
    },
    {
      title: 'New Story',
      href: '/new-story',
    },
    {
      title: 'Drafts',
      href: '/saved?tab=drafts',
    },
    {
      title: 'Bookmarks',
      href: '/saved?tab=bookmarks',
    },
    {
      title: 'Favourites',
      href: '/saved?tab=favourites',
    },
    {
      title: 'Settings',
      href: '/settings',
    },
  ];

  handleEscape(e: KeyboardEvent) {
    if (e.key === 'Esc' || e.key === 'Escape') {
      this.isOpen = false;
    }
  }

  created() {
    document.addEventListener('keydown', this.handleEscape);
  }

  beforeDestroy() {
    document.removeEventListener('keydown', this.handleEscape);
  }

  onBlur() {
    setTimeout(() => {
      this.isOpen = false;
    }, 200);
  }
}
</script>

<style></style>
