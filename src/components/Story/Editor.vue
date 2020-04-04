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
        <div class="mt-4 px-3">
          <input
            type="file"
            class="hidden"
            accept="image/*"
            ref="imageInput"
            @change="onFilePicked"
          />
          <button class="bg-accent text-white mr-4 p-2" @click="pickFile">
            Select picture
          </button>
          <span>Select a cover photo for your story</span>
        </div>
        <div v-if="selectedFile.imageUrl" class="mt-4 px-3 relative">
          <img
            class="mx-auto"
            :src="selectedFile.imageUrl"
            alt="Cover image for story"
          />
          <span
            class="absolute top-0 right-0 mr-6 mt-2 bg-white rounded-full px-2 cursor-pointer"
            @click="removeImage"
            >X</span
          >
        </div>
        <vue-editor
          class="h-screen"
          v-model="formattedContent"
          placeholder="Write your story"
          ref="vEditor"
        ></vue-editor>
        <div class="tags flex items-center">
          <label class="mr-4">Tag</label>
          <v-select
            class="w-full md:w-2/5"
            v-model="topic"
            :options="
              topics.map((topic) => {
                return { label: topic.name, slug: topic.slug };
              })
            "
            :reduce="(topic) => topic.slug"
          ></v-select>
        </div>
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
import vSelect from 'vue-select';
import { VueEditor } from 'vue2-editor';
import { NewStory, Story, Topic } from '@/types';
import newStorySchema from '@/schemas/newStorySchema';
import { getModule } from 'vuex-module-decorators';
import storiesModule from '@/store/modules/stories';
import { getUserStory } from '@/api/user-api-service';
import { getTopics } from '@/api/topics';

@Component({
  components: {
    VueEditor,
    vSelect,
  },
})
export default class Editor extends Vue {
  storiesStore = getModule(storiesModule, this.$store);
  existingStory: Story | null = null;
  title = '';
  formattedContent = '';
  selectedFile = {
    imageName: '',
    imageUrl: '',
    imageFile: '',
  };
  topic = '';
  topics: Topic[] = [];
  errorMessage = '';
  $refs!: {
    imageInput: HTMLFormElement;
    vEditor: any;
  };
  async created() {
    const storySlug = this.$route.query.story as string;
    if (storySlug) {
      try {
        const story = await getUserStory(storySlug);
        if (story) {
          this.existingStory = story;
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
        console.log('An error occurred while fetching draft');
      }
    }
    const topics = await getTopics();
    this.topics = topics;
  }

  pickFile(e: MouseEvent) {
    e.preventDefault();
    this.$refs.imageInput.click();
  }

  onFilePicked(e: any) {
    this.errorMessage = '';
    const files = e.target.files;
    if (files[0] !== undefined) {
      this.selectedFile.imageName = files[0].name;
      if (this.selectedFile.imageName.lastIndexOf('.') <= 0) {
        return;
      }
      const fr = new FileReader();
      fr.readAsDataURL(files[0]);
      fr.addEventListener('load', () => {
        this.selectedFile.imageUrl = fr.result as string;
        this.selectedFile.imageFile = files[0];
      });
    } else {
      this.selectedFile.imageName = '';
      this.selectedFile.imageFile = '';
      // this.selectedFile.photoURL = this.currentUser.profilePhotoUrl;
    }
  }

  removeImage() {
    this.selectedFile = {
      imageName: '',
      imageUrl: '',
      imageFile: '',
    };
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
      const newStoryForm = new FormData();
      Object.keys(story).forEach((key) => {
        newStoryForm.append(key, story[key]);
      });
      if (this.selectedFile.imageFile) {
        newStoryForm.append('coverPhoto', this.selectedFile.imageFile);
      }
      if (this.existingStory) {
        if(!this.selectedFile.imageUrl){
          newStoryForm.append('removeCover', 'true');
        }
        const updatedStory = await this.storiesStore.updateStory({
          story: newStoryForm,
          slug: this.existingStory.slug,
        });
        if(updatedStory){
          this.$router.push(`/view/${updatedStory.slug}`);
        }
      } else {
        const createdStory = await this.storiesStore.createStory(newStoryForm);
        if (createdStory) {
          this.$router.push(`/view/${createdStory.slug}`);
        }
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

.ql-snow .ql-tooltip {
  margin-left: 40%;
}
</style>
