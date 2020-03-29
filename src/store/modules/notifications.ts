import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators';
import { Notification } from '@/types';
import storage from '@/utils/storage';
import socketIOClient from 'socket.io-client';
import sailsIOClient from 'sails.io.js';
import { updateNotificationReadStatus } from '@/api/user-api-service';
import config from '@/config';
const { serverURL } = config;

const io = sailsIOClient(socketIOClient);
io.sails.url = serverURL;
const token = storage.loadState('TOKEN');
io.sails.headers = {
  authorization: token
};

@Module({ namespaced: true, name: 'notifications' })
class NotificationStore extends VuexModule {
  notifications: Notification[] = [];
  unreadNotificationCount = 0;

  @Mutation
  SET_NOTIFICATIONS(notifications: Notification[]) {
    this.notifications = notifications;
    this.unreadNotificationCount = notifications.filter(
      (notification) => notification.read === false,
    ).length;
  }

  @Mutation
  ADD_NOTIFICATION(notification: Notification) {
    this.notifications.unshift(notification);
    this.unreadNotificationCount += 1;
  }

  @Mutation
  UPDATE_NOTIFICATION(notification: Notification) {
    this.notifications.forEach((item, i) => {
      if (item.id === notification.id) {
        this.notifications[i] = notification;
        this.unreadNotificationCount -= 1;
      }
    });
  }

  @Action
  getNotifications() {
    io.socket.get('/api/v1/users/notifications', (body: any, JWR: any) => {
      if (JWR.error) {
        console.error('Could not subscribe to notifications: ' + JWR.error);
        return;
      }

      console.log('Successfully subscribed.');
      this.context.commit('SET_NOTIFICATIONS', body.data);

      io.socket.on('notifications', (msg) => {
        console.log(`Got message`, msg);
        this.context.commit('ADD_NOTIFICATION', msg);
      });

      io.socket.on('stories', (msg) => {
        console.log(`Got new story notification!`, msg);
        this.context.commit('ADD_NOTIFICATION', msg);
      });
    });
  }

  @Action
  async updateNotificationReadStatus(id: number) {
    const updatedNotification = await updateNotificationReadStatus(id);
    console.log({ updatedNotification });
    this.context.commit('UPDATE_NOTIFICATION', updatedNotification);
  }

  /* get unreadNotificationCount(): number {
    return this.notifications.filter(
      (notification) => notification.read === false,
    ).length;
  } */
}

export default NotificationStore;