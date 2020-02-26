<template>
 <div class='container'>
   <SettingsUI />
 </div>
</template>
 
<script lang='ts'>
import { Component, Vue} from 'vue-property-decorator'; 
import SettingsUI from '@/components/Settings/SettingsUI.vue';

@Component({
  components: {
    SettingsUI,
  }
})
export default class  extends Vue {  }
</script>
 
<style>
</style>