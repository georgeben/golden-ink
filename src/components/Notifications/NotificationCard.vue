<template>
  <router-link :to="`/view/${notification.story.slug}`">
    <div
      class="container bg-white shadow-xl rounded-lg p-3 flex items-center mb-4"
      :class="notification.read? '': 'bg-blue-overlay'"
      @click="updatedNotificationReadStatus"
    >
      <div class="notification-image w-1/6 sm:w-1/12 mr-4">
        <img
          class=" w-12 h-12 md:w-16 md:h-16 object-cover rounded-full"
          :src="
            notification.fromUser
              ? notification.fromUser.profilePhotoUrl
              : notification.topic.imageUrl
          "
          alt=""
        />
      </div>
      <div class="w-5/6 sm:w-11/12">
        <div class="notification-details">
          <p>{{ notificationText }}</p>
        </div>
        <div class="text-xs text-gray-600">
          <p>{{new Date(notification.createdAt).toDateString()}}</p>
        </div>
      </div>
    </div>
  </router-link>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { Notification } from '../../types';
import notificationModule from '@/store/modules/notifications';
import { getModule } from 'vuex-module-decorators';
@Component
export default class NotificationCard extends Vue {
  notificationModule = getModule(notificationModule, this.$store);

  @Prop({ required: true }) notification!: Notification;
  // TODO Display correct date of notification
  // notificationTime = 'Yesterday';

  updatedNotificationReadStatus(){
    if(this.notification.read) return;
    this.notificationModule.updateNotificationReadStatus({
      actionType: this.notification.actionType,
      fromUser: this.notification.fromUser.id,
      story: this.notification.story.id,
    });
  }

  get notificationText() {
    let notificationText;
    switch (this.notification.actionType) {
      case 'NEW_STORY':
        if (
          this.notification.story &&
          this.notification.topic
        ) {
          notificationText = `${this.notification.fromUser.name} just published a story titled ${this.notification.story.title} in ${this.notification.topic.name}`;
        }
        break;
      case 'LIKE':
        if (this.notification.fromUser && this.notification.story) {
          if(this.notification.comment){
            return notificationText = `${this.notification.fromUser.name} liked a comment on your story ${this.notification.story.title}`
          }
          notificationText = `${this.notification.fromUser.name} liked your story ${this.notification.story.title}`;
        }
        break;
      case 'COMMENT': 
        notificationText = `${this.notification.fromUser.name} commented on your story ${this.notification.story.title}`;
        break;
    }

    return notificationText;
  }
}
</script>

<style></style>
