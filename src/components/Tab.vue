<template>
 <div class='container'>
    <div v-show="isActive"><slot></slot></div>
 </div>
</template>
 
<script lang='ts'>
import { Component, Vue, Prop} from 'vue-property-decorator'; 
@Component
export default class Tab extends Vue { 
  @Prop({ type: String, required: true }) name!: string;
  @Prop({ default: false }) selected!: boolean;

  isActive = false;

  mounted(){
    this.isActive = this.selected;
  }
}
</script>
 
<style>
</style>