<template>
  <div
    v-if="show"
    @click="close"
    class="fixed inset-0 z-10 w-full px-2 h-screen flex items-center justify-center bg-dark-transparent"
  >
    <div class="w-full max-w-2xl bg-white shadow-lg rounded-md p-6">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
@Component
export default class Modal extends Vue {
  @Prop({ default: false }) show!: boolean;

  close(){
    this.$emit('close');
  }
}
</script>

<style></style>
