import { VuexModule, Module, Action, Mutation } from 'vuex-module-decorators';
import { NewStory, Story } from '@/types';
import { createStory } from '@/api/stories';
import { getUserStories } from '@/api/user-api-service';

@Module({ namespaced: true, name: 'stories' })
class StoryStore extends VuexModule{
  userStories: Story[] = []

  @Mutation
  SET_USER_STORIES(stories: Story[]) {
    this.userStories = stories;
  }
    
  @Action
  async createStory(newStory: NewStory) {
    try {
      const story: Story  = await createStory(newStory);
      // Maybe add the story to the stories section of the currentUser in the user store
      return story;
    } catch (error) {
      console.log('An error occurred while creating a story', error)
      console.log(error.response.data)
    }
  }

  @Action
  async getUserStories() {
    try {
      const stories = await getUserStories();
      this.context.commit('SET_USER_STORIES', stories)

    } catch (error) {
      console.log('An error occurred while fetching user stories', error);
    }
  }

  get userPublishedStories(): Story[]{
    return this.userStories.filter(story => story.draft === false)
  }
}

export default StoryStore;