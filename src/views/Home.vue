<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <h1 class=" text-2xl">{{text}}</h1>
  </div>
</template>

<script lang='ts'>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import { Component, Vue } from 'vue-property-decorator'

/* export default {
  name: 'Home',
  components: {
    // HelloWorld
  }
} */
@Component
export default class Home extends Vue{
  private text = 'This is my homepage. Yeah';
}
</script>

<style scoped>

</style>
