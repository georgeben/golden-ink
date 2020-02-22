<template>
  <div>
    <h1>Here are some topics you can follow..</h1>
    <TopicCard v-for="topic in topics" :key="topic.slug" :topic="topic" />
  </div>
</template>

<script lang="ts">
import { Component, Vue} from 'vue-property-decorator'; 
import { Topic } from '../../types';
import TopicCard from '../TopicCard.vue';
@Component({
  components: { 
    TopicCard,
  }
})
export default class Interests extends Vue { 
  topics: Topic[] = [
    {
      id: 1,
      name: 'Tech',
      imageUrl: 'https://digitalbarker.com/wp-content/uploads/2019/09/2018-07-10-image-35.jpg',
      slug: 'tech',
      followerCount: 30, 
    },
    {
      id: 1,
      name: 'Finance',
      imageUrl: 'https://www.wbcsd.org/var/site/storage/images/media/images/finance_img/25992-1-eng-GB/finance_img_i1140.jpg',
      slug: 'finance',
      followerCount: 50, 
    },
  ]
 }
</script>

<style scoped>

</style>