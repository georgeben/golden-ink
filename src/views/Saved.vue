<template>
 <div class='container'>
   <tabs>
    <tab name="Drafts" :selected="true">
      <h1>Drafts go here</h1>
    </tab>
    <tab name="Bookmarks">
      <h1>Bookmarks go here</h1>
    </tab>
    <tab name="Favourites">
      <h1>Favourite articles go here</h1>
    </tab>
  </tabs>
 </div>
</template>
 
<script lang='ts'>
import { Component, Vue} from 'vue-property-decorator'; 
import Tabs from '@/components/Tabs.vue';
import Tab from '@/components/Tab.vue';
@Component({
  components: {
    Tabs,
    Tab,
  }
})
export default class Saved extends Vue { 

 }
</script>
 
<style>
</style>