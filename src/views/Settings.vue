<template>
 <div class="bg-gray-200 pt-20 px-3">
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