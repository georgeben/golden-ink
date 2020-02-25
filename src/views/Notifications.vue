<template>
 <div class='container'>
   <NotificationCard :notification = "notification" />
 </div>
</template>
 
<script lang='ts'>
import { Component, Vue} from 'vue-property-decorator'; 
import NotificationCard from '@/components/Notifications/NotificationCard.vue';
// import { Notification } from '../types';
import { notification } from '../mock-data'
@Component({
  components: {
    NotificationCard,
  }
})
export default class Notifications extends Vue { 
  data(){
    return {
      notification,
    }
  }
}
</script>
 
<style>
</style>