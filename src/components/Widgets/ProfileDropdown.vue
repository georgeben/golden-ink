<template>
  <div class="ml-auto relative">
    <button
      @click="isOpen = !isOpen"
      class="focus:outline-none focus:shadow-outline"
      id="triggerButton"
      @blur="onBlur"
    >
      <img
        src="../../assets/images/userPhoto.jpeg"
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

      <router-link to="/profile" class="block px-3 text-red-600 mx-auto my-2"
        >Log out
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
@Component
export default class DropDown extends Vue {
  isOpen = false;

  dropDownLinks = [
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
      href: '/saved',
    },
    {
      title: 'Bookmarks',
      href: '/saved',
    },
    {
      title: 'Favourites',
      href: '/saved',
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
