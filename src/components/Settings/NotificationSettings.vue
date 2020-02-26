<template>
 <div class='container'>
   <div class="notification-option">
     <p>Alert me when a story is published</p>
     <switches v-model="updatedNotificationSettings.newStory" color="orange"></switches>
   </div>
   <div class="notification-option">
     <p>Daily email digest</p>
     <switches v-model="updatedNotificationSettings.daily" color="orange"></switches>
   </div>
   <div class="notification-option">
     <p>Weekly email digest</p>
     <switches v-model="updatedNotificationSettings.weekly" color="orange"></switches>
   </div>
   <div class="notification-option">
     <p>Alert me when someone reacts to my story</p>
     <switches v-model="updatedNotificationSettings.reactions" color="orange"></switches>
   </div>
 </div>
</template>
 
<script lang='ts'>
import { Component, Vue} from 'vue-property-decorator'; 
import Switches from 'vue-switches';

@Component({
  components: {
    Switches,
  }
})
export default class NotificationSettings extends Vue { 
  updatedNotificationSettings = {
    newStory: '',
    daily: '',
    weekly: '',
    reactions: '',
  }
 }
</script>
 
<style>
</style>