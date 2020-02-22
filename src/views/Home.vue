<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <h1 class=" text-2xl">{{text}}</h1>
    <TopicCard :topic="topic" />
  </div>
</template>

<script lang='ts'>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import TopicCard from '@/components/TopicCard.vue';
import { Topic } from '../types'
import { Component, Vue } from 'vue-property-decorator'

/* export default {
  name: 'Home',
  components: {
    // HelloWorld
  }
} */
@Component({
  components: {
    TopicCard,
  }
})
export default class Home extends Vue{
  private text = 'This is my homepage. Yeah';
  topic: Topic = {
    id: 1,
    name: 'Tech',
    imageUrl: 'https://digitalbarker.com/wp-content/uploads/2019/09/2018-07-10-image-35.jpg',
    slug: 'tech',
    followerCount: 30, 
  }
}
</script>

<style scoped>

</style>
