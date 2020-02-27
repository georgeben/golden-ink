import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/css/tailwind.css';
import userModule from '@/store/modules/user';
import { getModule } from 'vuex-module-decorators';
import storage from '@/utils/storage';
import { TOKEN } from './constants';
import { setAuthHeader } from '@/utils/httpClient';

const userStore = getModule(userModule, store);

const isLoggedIn = userStore.isLoggedIn;
const token = storage.loadState(TOKEN);

if (isLoggedIn && token) {
  setAuthHeader();
  userStore.fetchCurrentUserData();
}

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
