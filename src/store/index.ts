import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user';
import stories from './modules/stories';
import VuexPersist from 'vuex-persist';

const vuexLocal = new VuexPersist({
  storage: window.localStorage,
  key: 'golden-ink',
})

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user,
    stories
  },
  plugins: [vuexLocal.plugin],
})
