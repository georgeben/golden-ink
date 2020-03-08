import { VuexModule, Module, Action } from 'vuex-module-decorators';
import { NewStory, Story } from '@/types';
import { createStory } from '@/api/stories';

@Module({ namespaced: true, name: 'stories' })
class StoryStore extends VuexModule{
  
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
}

export default StoryStore;