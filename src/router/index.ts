import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import SignIn from '../views/SignIn.vue';
import ViewProfile from '../views/ViewProfile.vue';
import UpdateProfile from '@/components/UserProfile/UpdateProfile.vue';
import FollowTopics from '@/components/Topic/FollowTopics.vue';
import Feed from '../views/Feed.vue';
import UserProfile from '../views/UserProfile.vue';
import Notifications from '../views/Notifications.vue';
import Saved from '../views/Saved.vue';
import Settings from '../views/Settings.vue';
import ViewStory from '../views/ViewStory.vue';
import Editor from '@/components/Story/Editor.vue'
import TopicPage from '@/views/TopicPage.vue';
import SearchResults from '@/views/SearchResults.vue';
import PageNotFound from '@/views/PageNotFound.vue';
import store from '../store';
import userModule from '../store/modules/user';
import { getModule } from 'vuex-module-decorators';

const userStore = getModule(userModule, store);

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/signin',
    component: SignIn,
    meta: {
      guest: true
    }
  },
  {
    path: '/topics/interests',
    name: 'interests',
    component: FollowTopics,
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: '/topics/:topic',
    name: 'topic-page',
    component: TopicPage,
  },
  {
    path: '/feed',
    name: 'feed',
    component: Feed,
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: '/search',
    name: 'search',
    component: SearchResults
  },
  {
    path: '/writers/:username',
    name: 'view-profile',
    component: ViewProfile,
  },
  {
    path: '/profile',
    name: 'profile',
    component: UserProfile,
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: '/profile/edit',
    name: 'edit-profile',
    component: UpdateProfile,
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: '/saved',
    name: 'saved',
    component: Saved,
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: '/view/:story',
    name: 'view-story',
    component: ViewStory,
  },
  {
    path: '/draft/:story',
    name: 'draft',
    component: ViewStory,
  },
  {
    path: '/settings',
    name: 'settings',
    component: Settings,
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: '/notification',
    name: 'notification',
    component: Notifications,
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: '/write',
    name: 'write-story',
    component: Editor,
    meta: {
      requiresAuth: true,
      completeProfile: true,
    },
  },
  {
    path: '*',
    name: 'page-not-found',
    component: PageNotFound
  }
]

const router = new VueRouter({
  routes,
  mode: 'history',
})

router.beforeEach((to, from, next) => {
  const loggedIn = userStore.isLoggedIn;
  const user = userStore.currentUser;
  // Don't allow logged in users to view pages for only guests e.g signup, login
  if (loggedIn && user && to.matched.some(record => record.meta.guest)) {
    next({
      path: '/'
    })
  }

  if (loggedIn && user && to.matched.some(record => record.meta.completeProfile)) {
    if (!user.bio || !user.headline) {
      next({
        path: '/profile/edit',
      })
    }
  }

  // Don't allow guests (people who have not signed in to view protected routes)
  if (!loggedIn && !user && to.matched.some(record => record.meta.requiresAuth)) {
    next({
      path: '/signin',
      query: {
        redirect: to.fullPath
      }
    })
  }

  next()
});

export default router
