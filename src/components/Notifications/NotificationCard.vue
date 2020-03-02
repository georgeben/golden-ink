<template>
  <div
    class="container bg-white shadow-xl rounded-lg p-3 flex items-center mb-4"
  >
    <div class="notification-image">
      <img
        class=" w-16 h-16 object-cover rounded-full mr-4"
        :src="
          notification.fromUser
            ? notification.fromUser.profilePhotoUrl
            : notification.topic.imageUrl
        "
        alt=""
      />
    </div>
    <div class="">
      <div class="notification-details">
        <p>{{ notificationText }}</p>
      </div>
      <div class="text-xs text-gray-600">
        <p>{{ notificationTime }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { Notification } from '../../types';
@Component
export default class NotificationCard extends Vue {
  @Prop({ required: true }) notification!: Notification;
  notificationTime = 'Yesterday';

  get notificationText() {
    let notificationText;
    switch (this.notification.actionType) {
      case 'NEW_STORY':
        console.log('New story notification');
        if (
          this.notification.fromUser &&
          this.notification.story &&
          this.notification.topic
        ) {
          notificationText = `${this.notification.fromUser.name} just published a story titled ${this.notification.story.title} in ${this.notification.topic.name}`;
        }
        break;
      default:
        notificationText = "I don't know what to put here";
    }

    return notificationText;
  }
}
</script>

<style></style>
