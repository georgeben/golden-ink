<template>
  <div class="bg-gray-200 py-24 md:px-10 px-3">
    <div class="editor md:w-3/4 md:mx-auto">
      <div class="options flex justify-end hidden xs:flex">
        <button
          class="mr-3 border-2 text-accent border-accent py-1 px-4 hover:bg-gray-300"
          @click="createStory('private')"
        >
          Save as Private
        </button>
        <button
          class="mr-3 border-2 text-accent border-accent py-1 px-4 hover:bg-gray-300"
          @click="createStory('draft')"
        >
          Save as draft
        </button>
        <button
          class="mr-3 border-2 text-accent border-accent py-1 px-4 hover:bg-gray-300"
          @click="createStory('publish')"
        >
          Publish
        </button>
      </div>

      <div class="editor-area bg-white shadow-xl rounded-lg mt-6 p-2">
        <p v-if="errorMessage" class="mb-4 text-sm text-red-600">
          {{ errorMessage }}
        </p>
        <input
          type="text"
          class="title text-3xl px-3 font-semibold w-full border-b"
          placeholder="Title"
          v-model="title"
        />
        <vue-editor
          class="h-screen"
          v-model="formattedContent"
          placeholder="Write your story"
          ref="vEditor"
        ></vue-editor>
      </div>
      <div class="mt-4 xs:hidden">
        <div class="options flex flex-col justify-end">
          <button
            class="mr-3 mb-3 border-2 text-accent border-accent py-1 px-4 hover:bg-gray-300"
            @click="createStory('private')"
          >
            Save as Private
          </button>
          <button
            class="mr-3 mb-3 border-2 text-accent border-accent py-1 px-4 hover:bg-gray-300"
            @click="createStory('draft')"
          >
            Save as draft
          </button>
          <button
            class="mr-3 mb-3 border-2 text-accent border-accent py-1 px-4 hover:bg-gray-300"
            @click="createStory('publish')"
          >
            Publish
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { VueEditor } from 'vue2-editor';
import { NewStory, Story } from '@/types';
import newStorySchema from '@/schemas/newStorySchema';
import { getModule } from 'vuex-module-decorators';
import storiesModule from '@/store/modules/stories';
import { getUserStory } from '@/api/user-api-service';

@Component({
  components: {
    VueEditor,
  },
})
export default class Editor extends Vue {
  storiesStore = getModule(storiesModule, this.$store);
  draft: Story | null = null;
  title = '';
  formattedContent = '';
  selectedFile = {
    imageName: '',
    imageUrl: '',
    imageFile: '',
  };
  topic = 'tech';
  errorMessage = '';

  async created() {
    const draft = this.$route.query.draft as string;
    if (draft) {
      try {
        const story = await getUserStory(draft);
        if (story) {
          this.draft = story;
          this.title = story.title;
          this.formattedContent = story.formattedContent;
          if (story.imageUrl) {
            this.selectedFile.imageUrl = story.imageUrl;
          }
          this.topic = story.topic.slug;
        } else {
          // TODO Route to 404 page
        }
      } catch (error) {
        console.log('An error occured while fetching draft');
      }
    }
  }

  async createStory(storyType = 'private') {
    const content = this.$refs.vEditor.quill.getText();
    const story: NewStory = {
      title: this.title,
      content: content,
      formattedContent: this.formattedContent,
      topicSlug: this.topic,
    };
    if (storyType === 'private') {
      story.private = true;
      story.draft = false;
    } else if (storyType === 'draft') {
      story.draft = true;
    } else if (storyType === 'publish') {
      story.private = false;
      story.draft = false;
    }
    // TODO Implement image selection
    if (this.selectedFile.imageUrl) {
      story.imageUrl = this.selectedFile.imageUrl;
    }

    // Validate the schema
    try {
      await newStorySchema.validate(story, { abortEarly: true });
      if (this.draft) {
        const updatedStory = await this.storiesStore.updateStory({story, slug: this.draft.slug});
        return this.$router.push('/feed');
      } else {
        console.log('About to create a effin story');

        const createdStory = await this.storiesStore.createStory(story);
        console.log('Yaay new story created', createdStory);
        this.$router.push('/feed');
      }
    } catch (error) {
      if (error.name === 'ValidationError') {
        this.errorMessage = error.message;
        return;
      }
    }
  }
}
</script>

<style>
.ql-container.ql-snow {
  border: none !important;
}

.ql-toolbar.ql-snow {
  /* border: none !important; */
  border-top: none !important;
  border-left: none !important;
  border-right: none !important;
  border-bottom: 1px solid #e2e8f0 !important;
}
</style>
