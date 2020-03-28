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
import { Notification } from '@/types';
import { namespace } from 'vuex-class';
const notificationsNamespace = namespace('notifications');

@Component({
  components: {
    NotificationCard,
  },
})
export default class Notifications extends Vue {
  @notificationsNamespace.State('notifications') notifications !: Notification[];

}
</script>

<style></style>
