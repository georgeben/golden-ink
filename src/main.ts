import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/css/tailwind.css';
import userModule from '@/store/modules/user';
import storiesModule from '@/store/modules/stories';
import notificationModule from '@/store/modules/notifications';
import { getModule } from 'vuex-module-decorators';
import storage from '@/utils/storage';
import { TOKEN } from './constants';
import { setAuthHeader } from '@/utils/httpClient';

const userStore = getModule(userModule, store);
const storiesStore = getModule(storiesModule, store);
const notificationStore = getModule(notificationModule, store);

const token = storage.loadState(TOKEN);

if (token) {
  setAuthHeader();
  userStore.fetchCurrentUserData();
  storiesStore.getUserStories();
  notificationStore.getNotifications();
}

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
