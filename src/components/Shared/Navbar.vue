<template>
  <header>
    <nav
      class="navbar fixed top-0 left-0 right-0 w-full z-10 lg:mx-4"
      :class="[
        showNavbar ? '' : 'navbar-hidden',
        lastScrollPosition > navbarHeight ? 'nav-solid' : '',
        isMobileNavOpen ? 'nav-solid' : '',
      ]"
    >
      <div
        class="container mx-auto py-2 md:flex md:justify-between md:items-center"
      >
        <div class="flex items-center md:w-1/2">
          <div class="">
            <router-link to="/">
              <img class=" w-12 px-2" src="../../assets/logo.png" alt="Logo" />
            </router-link>
          </div>

          <div class="search-box w-2/3">
            <input
              type="search"
              placeholder="Search"
              class=" shadow-lg w-10/12 ml-3 py-1 px-4  rounded-full focus:outline-none focus:shadow-outline bg-white"
            />
          </div>

          <div class="flex">
            <ProfileDropdown v-if="currentUser" :profileImg="currentUser.profilePhotoUrl" class="md:hidden sm:mr-4" @logout="logUserOut" />
            <button
              type="button"
              class="block text-dark px-2 hover:text-dark-100 focus:text-dark-100 md:hidden focus:outline-none focus:shadow-outline"
              @click="isMobileNavOpen = !isMobileNavOpen"
              @blur="onBlur"
            >
              <svg class="h-8 w-8 sm:w-10 sm:h-10 fill-current" viewBox="0 0 24 24">
                <path
                  v-if="isMobileNavOpen"
                  fill-rule="evenodd"
                  d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z"
                />
                <path
                  v-else
                  fill-rule="evenodd"
                  d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
                />
              </svg>
            </button>
          </div>
        </div>
        <div
          class="text-sm mt-2 md:flex"
          :class="isMobileNavOpen ? '' : 'hidden'"
        >
          <router-link
            to="/new-story"
            class="block p-2 rounded-sm hover:bg-light-green md:ml-2"
            >
            <div class="flex items-center">
              <img class="w-8 mr-3" src="../../assets/images/plus.png" alt="">
              <span> New story</span>
            </div>
          </router-link
          >
          <router-link
            to="/notification"
            class="block p-2 rounded-sm hover:bg-light-green md:ml-2"
            v-if="currentUser"
            >Notifications</router-link
          >
          <ProfileDropdown v-if="currentUser" :profileImg="currentUser.profilePhotoUrl" class="md:ml-2 hidden md:block" @logout="logUserOut" />
        </div>
      </div>
    </nav>
  </header>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { getModule } from 'vuex-module-decorators';
import userModule from '@/store/modules/user';
import ProfileDropdown from '../Widgets/ProfileDropdown.vue';

@Component({
  components: {
    ProfileDropdown,
  },
})
export default class Navbar extends Vue {
  userStore = getModule(userModule, this.$store);

  isMobileNavOpen = false;
  showNavbar = true;
  lastScrollPosition = 0;
  navbarHeight = 61;
  isLoggedIn = this.userStore.isLoggedIn;
  currentUser = this.userStore.currentUser;

  handleScroll() {
    const currentScrollPosition =
      window.pageYOffset || document.documentElement.scrollTop;
    if (currentScrollPosition < 0) {
      // Mobile devices scroll up with momentum and may go off the page
      return;
    }
    this.showNavbar = currentScrollPosition < this.lastScrollPosition;
    this.lastScrollPosition = currentScrollPosition;
  }

  async logUserOut() {
    this.userStore.logout();
    this.$router.push('/');
  }

  mounted() {
    window.addEventListener('scroll', this.handleScroll);
  }
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  onBlur() {
    setTimeout(() => {
      this.isMobileNavOpen = false;
    }, 200);
  }
}
</script>

<style scoped>
.navbar {
  transform: translate3d(0, 0, 0);
  transition: 0.3s all ease-out;
}
.navbar.navbar-hidden {
  box-shadow: none;
  transform: translate3d(0, -100%, 0);
}

.search-box input::placeholder{
  color: #4a5568
}
</style>
