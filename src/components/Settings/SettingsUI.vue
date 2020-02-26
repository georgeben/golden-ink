<template>
 <div class='container'>
   <div class="side-nav">
     <p @click="updatePage(1)">
       Profile
     </p>
     <p @click="updatePage(2)">
       Notifications
     </p>
     <p>
       Content
     </p>
     <p>
       Account
     </p>
   </div>
   <ProfileSettings v-if="page == 1" />
   <NotificationSettings v-if="page == 2" />
 </div>
</template>
 
<script lang='ts'>
import { Component, Vue} from 'vue-property-decorator'; 
import ProfileSettings from './ProfileSettings.vue';
import NotificationSettings from './NotificationSettings.vue';

@Component({
  components:{
    ProfileSettings,
    NotificationSettings,
  }
})
export default class SettingsUI extends Vue { 
  page = 1;
  updatePage(pageNum: number): void{
    this.page = pageNum;
  }
 }
</script>
 
<style>
</style>