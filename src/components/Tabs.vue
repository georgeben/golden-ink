<template>
  <div>
    <div class="tabs lg:w-5/6 lg:mx-auto">
      <ul class="flex justify-around pt-2">
        <li v-for="tab in tabs" class="mb-2" :class="tab.isActive ? ' font-medium' : ''" :key="tab.name">
          <a class="cursor-pointer" :href="tab.href" @click="selectTab(tab)">{{ tab.name }}</a>
          <div v-if="tab.isActive" class="underline h-1 bg-gray-600"></div>
        </li>
      </ul>
    </div>

    <div class="tabs-details">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue} from 'vue-property-decorator';
@Component
export default class Tabs extends Vue {
    tabs: any[] =  [] 
    created() {
      this.tabs = this.$children;
    }

    selectTab(selectedTab: any){
      this.$router.push({ path: `${this.$route.name}`, query: { tab: `${selectedTab.name.toLowerCase()}` }})
      this.tabs.forEach(tab => {
        tab.isActive = (tab.name == selectedTab.name);
      });
    }
 }
</script>

<style>
</style>
