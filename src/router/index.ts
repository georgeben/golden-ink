import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import SignIn from '../views/SignIn.vue';
import Onboarding from '../views/Onboarding.vue';
import CompleteProfile from '@/components/Onboarding/CompleteProfile.vue';
import Interests from '@/components/Onboarding/Interests.vue';
import Feed from '../views/Feed.vue';
import UserProfile from '../views/UserProfile.vue';
import NewStory from '../views/NewStory.vue';
import Notifications from '../views/Notifications.vue';
import Saved from '../views/Saved.vue';
import Settings from '../views/Settings.vue';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/signin',
    component: SignIn
  },
  {
    path: '/onboarding',
    name: 'Onboarding',
    component: Onboarding,
    children: [
      {
        path: 'profile',
        name: 'complete-profile',
        component: CompleteProfile,
      },
      {
        path: 'interests',
        name: 'follow-topics',
        component: Interests,
      },
    ]
  },
  {
    path: '/feed',
    name: 'feed',
    component: Feed,
  },
  {
    path: '/profile',
    name: 'profile',
    component: UserProfile,
  },
  {
    path: '/saved',
    name: 'saved',
    component: Saved,
  },
  {
    path: '/settings',
    name: 'settings',
    component: Settings,
  },
  {
    path: '/notification',
    name: 'notification',
    component: Notifications,
  },
  {
    path: '/new-story',
    name: 'new-story',
    component: NewStory,
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  routes,
  mode: 'history',
})

export default router
