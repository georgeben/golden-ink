<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <h1 class=" text-2xl">{{text}}</h1>
    <TopicCard :topic="topic" />
    <StoryCard :story="story" />
  </div>
</template>

<script lang='ts'>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import TopicCard from '@/components/TopicCard.vue';
import StoryCard from '@/components/Story/StoryCard.vue';
import { Topic, Story, User } from '../types'
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
    StoryCard,
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

  user: User = {
    createdAt: 1582057187505,
    updatedAt: 1582295056415,
    id: 1,
    name: "George Kurobara",
    email: "surplusforreal@gmail.com",
    username: "changedman",
    slug: "george-kurobara",
    headline: "Software Craftsman",
    bio: "A really soft boy",
    profilePhotoUrl: "https://lh6.googleusercontent.com/-oreYI0JA7Yw/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3rdk3M5DboNPVfg5dgyw4ikm57WcAA/s96-c/photo.jpg",
    emailNotificationSettings: {
      daily: false,
      weekly: true,
      reactions: true
    }
  }

  story: Story = {
      comments: [],
      likedBy: [],
      createdAt: 1582122128804,
      updatedAt: 1582122198939,
      id: 2,
      title: "Public announcement",
      content: "This is a public announcement",
      slug: "public-announcement",
      private: false,
      draft: false,
      topic: this.topic,
      author: {
        createdAt: 1582057187505,
        updatedAt: 1582295056415,
        id: 1,
        name: "George Kurobara",
        email: "surplusforreal@gmail.com",
        username: "changedman",
        slug: "george-kurobara",
        headline: "Software Craftsman",
        bio: "A really soft boy",
        profilePhotoUrl: "https://lh6.googleusercontent.com/-oreYI0JA7Yw/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3rdk3M5DboNPVfg5dgyw4ikm57WcAA/s96-c/photo.jpg",
        emailNotificationSettings: {
          daily: false,
          weekly: true,
          reactions: true
        }
      }
  }
}
</script>

<style scoped>

</style>
