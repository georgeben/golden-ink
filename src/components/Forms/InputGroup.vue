<template>
  <div class="input-group">
    <label for="input">{{label}}</label>
    <input :type="type" :placeholder="placeholder" :value="value" @input="handleInput" >
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class InputGroup extends Vue{
  @Prop({ type: String, required: true }) label!: string;
  @Prop({ type: String, required: true }) placeholder!: string;
  @Prop({ type: String, required: true }) type!: string;
  @Prop({ required: true }) value!: any;

  handleInput(e: InputEvent){
    const target = e.target as HTMLInputElement;
    if(target){
      this.$emit('input', target.value)
    }
  }
}
</script>

<style>

</style>