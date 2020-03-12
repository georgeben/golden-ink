<template>
  <div class="bookmark">
    <input
      type="checkbox"
      class="checkbox hidden"
      id="bookmark"
      :checked="value"
      @input="handleInput"
    />
    <label for="bookmark">
      <svg
        class="w-6 h-6 text-gray-500 fill-current"
        :class="value ? 'text-blue-500' : ''"
        height="404pt"
        viewBox="-58 0 404 404.54135"
        width="404pt"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="m277.527344 0h-267.257813c-5.523437 0-10 4.476562-10 10v374.527344c-.011719 7.503906 4.183594 14.378906 10.855469 17.804687 6.675781 3.429688 14.707031 2.832031 20.796875-1.550781l111.976563-80.265625 111.976562 80.269531c6.097656 4.367188 14.121094 4.960938 20.792969 1.535156 6.667969-3.425781 10.863281-10.292968 10.863281-17.792968v-374.527344c0-5.523438-4.480469-10-10.003906-10zm0 0"
        />
      </svg>
    </label>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
@Component
export default class Bookmark extends Vue {
  @Prop({ required: true }) value!: boolean;

  handleInput(e: InputEvent) {
    const target = e.target as HTMLInputElement;
    this.$emit('input', target.checked);
  }
}
</script>

<style scoped></style>
