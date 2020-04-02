import { VuexModule, Module, Action, Mutation } from 'vuex-module-decorators';
import { NewStory, Story } from '@/types';
import { createStory, updateStory } from '@/api/stories';
import { getUserStories, deleteStory } from '@/api/user-api-service';

@Module({ namespaced: true, name: 'stories' })
class StoryStore extends VuexModule {
  userStories: Story[] = [];

  @Mutation
  SET_USER_STORIES(stories: Story[]) {
    this.userStories = stories;
  }

  @Mutation
  UPDATE_STORY(story: Story) {
    this.userStories.forEach((item, i) => {
      if (item.id === story.id) {
        this.userStories[i] = story;
      }
    })
  }

  @Mutation
  DELETE_STORY(story: Story) {
    this.userStories.forEach((item, i) => {
      if (item.id === story.id) {
        this.userStories.splice(i, 1);
      }
    })
  }

  @Action
  async createStory(newStory: FormData) {
    try {
      const story: Story = await createStory(newStory);
      this.userStories.push(story);
      return story;
    } catch (error) {
      console.log('An error occurred while creating a story', error);
      console.log(error.response.data);
    }
  }

  @Action
  async updateStory(payload: { story: NewStory; slug: string }) {
    try {
      const updatedStory: Story = await updateStory(
        payload.story,
        payload.slug,
      );
      this.context.commit('UPDATE_STORY', updatedStory);
      return updatedStory;
    } catch (error) {
      console.log('An error occurred while creating a story', error);
      console.log(error.response.data);
    }
  }

  @Action
  async deleteStory(storySlug: string) {
    try {
      const deletedStory = await deleteStory(storySlug);
      this.context.commit('DELETE_STORY', deletedStory);
    } catch (error) {
      console.log('Error while deleting story', error);
    }
  }

  @Action
  async getUserStories() {
    try {
      const stories = await getUserStories();
      this.context.commit('SET_USER_STORIES', stories);
    } catch (error) {
      console.log('An error occurred while fetching user stories', error);
    }
  }

  get userPublishedStories(): Story[] {
    return this.userStories.filter((story) => story.draft === false);
  }

  get userDrafts(): Story[] {
    return this.userStories.filter((story) => story.draft === true);
  }
}

export default StoryStore;
