<template>
  <div>
    <label class="block text-gray-700 text-sm font-bold mb-2" for="input">{{
      label
    }}</label>
    <textarea
      class="border border-gray-400 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      :cols="colNum"
      :rows="rowNum"
      :placeholder="placeholder"
      :value="value"
      @input="handleInput"
    >
    </textarea>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
@Component
export default class TextAreaGroup extends Vue {
  @Prop({ type: String, required: true }) label!: string;
  @Prop({ type: Number, default: 30 }) colNum!: number;
  @Prop({ type: Number, default: 10 }) rowNum!: number;
  @Prop({ type: String }) placeholder!: number;
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
