import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user';
import stories from './modules/stories';
import search from './modules/search';
import VuexPersist from 'vuex-persist';

const vuexLocal = new VuexPersist({
  storage: window.localStorage,
  key: 'golden-ink',
  reducer: (state: any) => ({
    user: state.user,
    stories: state.stories,
  }),
})

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user,
    stories,
    search,
  },
  plugins: [vuexLocal.plugin],
})
