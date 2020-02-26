<template>
 <div class='container'>
   <div class="side-nav">
     <p @click="updatePage(1)">
       Profile
     </p>
     <p>
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
 </div>
</template>
 
<script lang='ts'>
import { Component, Vue} from 'vue-property-decorator'; 
import ProfileSettings from './ProfileSettings.vue';

@Component({
  components:{
    ProfileSettings,
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