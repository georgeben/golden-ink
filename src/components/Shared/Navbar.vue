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
            <ProfileDropdown
              v-if="currentUser"
              :profileImg="currentUser.profilePhotoUrl"
              class="md:hidden sm:mr-4"
              @logout="logUserOut"
            />
            <button
              type="button"
              class="block text-dark px-2 hover:text-dark-100 focus:text-dark-100 md:hidden focus:outline-none focus:shadow-outline"
              @click="isMobileNavOpen = !isMobileNavOpen"
              @blur="onBlur"
            >
              <svg
                class="h-8 w-8 sm:w-10 sm:h-10 fill-current"
                viewBox="0 0 24 24"
              >
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
              <img class="w-8 mr-3" src="../../assets/images/plus.png" alt="" />
              <span> New story</span>
            </div>
          </router-link>
          <router-link
            to="/notification"
            class="block p-2 rounded-sm hover:bg-light-green md:ml-2"
            v-if="currentUser"
          >
            <svg
              id="Capa_1"
              class="h-8 w-8 text-gray-700 fill-current"
              enable-background="new 0 0 512 512"
              height="512"
              viewBox="0 0 512 512"
              width="512"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="m450.201 407.453c-1.505-.977-12.832-8.912-24.174-32.917-20.829-44.082-25.201-106.18-25.201-150.511 0-.193-.004-.384-.011-.576-.227-58.589-35.31-109.095-85.514-131.756v-34.657c0-31.45-25.544-57.036-56.942-57.036h-4.719c-31.398 0-56.942 25.586-56.942 57.036v34.655c-50.372 22.734-85.525 73.498-85.525 132.334 0 44.331-4.372 106.428-25.201 150.511-11.341 24.004-22.668 31.939-24.174 32.917-6.342 2.935-9.469 9.715-8.01 16.586 1.473 6.939 7.959 11.723 15.042 11.723h109.947c.614 42.141 35.008 76.238 77.223 76.238s76.609-34.097 77.223-76.238h109.947c7.082 0 13.569-4.784 15.042-11.723 1.457-6.871-1.669-13.652-8.011-16.586zm-223.502-350.417c0-14.881 12.086-26.987 26.942-26.987h4.719c14.856 0 26.942 12.106 26.942 26.987v24.917c-9.468-1.957-19.269-2.987-29.306-2.987-10.034 0-19.832 1.029-29.296 2.984v-24.914zm29.301 424.915c-25.673 0-46.614-20.617-47.223-46.188h94.445c-.608 25.57-21.549 46.188-47.222 46.188zm60.4-76.239c-.003 0-213.385 0-213.385 0 2.595-4.044 5.236-8.623 7.861-13.798 20.104-39.643 30.298-96.129 30.298-167.889 0-63.417 51.509-115.01 114.821-115.01s114.821 51.593 114.821 115.06c0 .185.003.369.01.553.057 71.472 10.25 127.755 30.298 167.286 2.625 5.176 5.267 9.754 7.861 13.798z"
              />
            </svg>
          </router-link>
          <ProfileDropdown
            v-if="currentUser"
            :profileImg="currentUser.profilePhotoUrl"
            class="md:ml-2 hidden md:block"
            @logout="logUserOut"
          />
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
import { namespace } from 'vuex-class';
import { User } from '../../types';

const userNamespace = namespace('user');

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

  @userNamespace.State('currentUser') currentUser!: User;
  @userNamespace.State('isLoggedIn') isLoggedIn!: boolean;

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

.search-box input::placeholder {
  color: #4a5568;
}
</style>
