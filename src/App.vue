<template>
  <div id="app" class="app antialiased text-gray-800 ">
    <div class=" <Navbar  /> ">
       <Navbar/>
    </div>
    <router-view/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Navbar from '@/components/Shared/Navbar.vue';

@Component({
  components: {
    Navbar,
  }
})
export default class App extends Vue{

}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
} 

</style>
