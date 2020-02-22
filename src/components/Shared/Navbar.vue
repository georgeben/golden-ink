<template>
  <nav>
    <div class="brand-name">
      <h1>Golden ink</h1>
    </div>

    <div class="links">
      <router-link to='/login'>Get started</router-link>
    </div>
  </nav>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Navbar extends Vue{

}
</script>

<style>

</style>