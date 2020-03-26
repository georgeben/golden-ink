<template>
  <div class="bg-gray-200 py-20 px-2 md:px-10">
    <div class="lg:w-9/12 lg:mx-auto">
      <h1 class="text-lg font-semibold mb-4">Notifications</h1>
      <NotificationCard
        v-for="notification in notifications"
        :key="notification.id"
        :notification="notification"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import NotificationCard from '@/components/Notifications/NotificationCard.vue';
import storage from '@/utils/storage';
import socketIOClient from 'socket.io-client';
import sailsIOClient from 'sails.io.js';
const io = sailsIOClient(socketIOClient);
io.sails.url = 'http://localhost:1337';
io.sails.headers = {
  authorization: storage.loadState('TOKEN'),
};

@Component({
  components: {
    NotificationCard,
  },
})
export default class Notifications extends Vue {
  data() {
    return {
      notifications: '',
    };
  }

  created() {
    io.socket.get('/api/v1/users/notifications', (body: any, JWR: any) => {
      if (JWR.error) {
        console.error(
          'Could not subscribe to notifications: ' + JWR.error,
        );
        return;
      }

      console.log('Successfully subscribed.');
      this.notifications = body.data;
    });

    io.socket.on('notifications', (msg) => {
      console.log(`Got message`, msg);
      this.notifications.push(msg);
    });

    io.socket.on('stories', (msg) => {
      console.log(`Got new story notification!`, msg);
      this.notifications.push(msg);
    });
  }
}
</script>

<style></style>
