<template>
  <div class="input-group">
    <label for="input" class="block text-gray-700 text-sm font-bold mb-2">{{
      label
    }}</label>
    <input
      class="border border-gray-400 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      :type="type"
      :placeholder="placeholder"
      :value="value"
      @input="handleInput"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class InputGroup extends Vue {
  @Prop({ type: String, required: true }) label!: string;
  @Prop({ type: String, required: true }) placeholder!: string;
  @Prop({ type: String, required: true }) type!: string;
  @Prop({ required: true }) value!: any;

  handleInput(e: InputEvent) {
    const target = e.target as HTMLInputElement;
    if (target) {
      this.$emit('input', target.value);
    }
  }
}
</script>

<style></style>
