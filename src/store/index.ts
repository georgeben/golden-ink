import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user';
import stories from './modules/stories';
import search from './modules/search';
import notifications from './modules/notifications';
import VuexPersist from 'vuex-persist';

const vuexLocal = new VuexPersist({
  storage: window.localStorage,
  key: 'golden-ink',
  reducer: (state: any) => ({
    user: {
      currentUser: state.user.currentUser,
      isLoggedIn: state.user.isLoggedIn,
      userFeed: state.user.userFeed,
    },
    stories: state.stories,
  }),
})

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user,
    stories,
    search,
    notifications,
  },
  plugins: [vuexLocal.plugin],
})
