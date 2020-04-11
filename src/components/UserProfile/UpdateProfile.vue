<template>
  <div class="bg-gray-200 py-20">
    <form class="bg-white w-11/12 md:w-10/12 mx-auto shadow-xl rounded-lg p-4">
      <div class="md:flex">
        <div class="profile-img mb-4 md:w-2/5">
          <img
            class=" h-56 w-56 object-cover rounded-full mx-auto"
            :src="selectedFile.photoURL"
            alt=""
          />
          <input
            type="file"
            class="hidden"
            accept="image/*"
            ref="imageInput"
            @change="onFilePicked"
          />
          <button
            class="block mx-auto mt-3 border-2 border-gray-500 py-2 px-4 text-gray-700"
            @click="pickFile"
          >
            Change photo
          </button>
        </div>
        <div class="inputs md:w-3/5">
          <p v-if="errorMessage" class="mb-4 text-sm text-red-600">
            {{errorMessage}}
          </p>
          <p v-if="successMessage" class="mb-4 text-sm text-green-600">
            {{successMessage}}
          </p>
          <InputGroup
            class="mb-4"
            label="Name"
            type="text"
            placeholder="Enter your name"
            v-model="currentUser.name"
          />
          <InputGroup
            class="mb-4"
            label="Username"
            type="text"
            placeholder="Select a username"
            v-model="currentUser.username"
          />
          <InputGroup
            class="mb-4"
            label="Headline"
            type="text"
            placeholder="Select a headline"
            v-model="currentUser.headline"
          />
          <TextAreaGroup
            label="Bio"
            placeholder="A short description of yourself"
            v-model="currentUser.bio"
          />

          <button
            type="button"
            class="bg-accent text-white py-2 px-6 shadow-xl mt-4"
            @click="updateProfile"
          >
            Save
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import InputGroup from '../Forms/InputGroup.vue';
import TextAreaGroup from '../Forms/TextAreaGroup.vue';
import { User } from '../../types';
import { namespace } from 'vuex-class';
import { getModule } from 'vuex-module-decorators';
import updateProfileSchema from '@/schemas/updateProfileSchema';
import userModule from '@/store/modules/user';
const userNameSpace = namespace('user');

@Component({
  components: {
    InputGroup,
    TextAreaGroup,
  },
})
export default class CompleteProfile extends Vue {
  userStore = getModule(userModule, this.$store);
  @userNameSpace.State('currentUser') currentUser!: User;
  $refs!: {
    imageInput: HTMLFormElement;
  };

  errorMessage = '';
  successMessage = '';

  selectedFile = {
    imageName: '',
    photoURL: this.userStore.currentUser?.profilePhotoUrl,
    imageFile: '',
  };

  created(){
    if(!this.currentUser.bio || !this.currentUser.headline){
      this.errorMessage = 'Please complete your profile';
    }
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
        this.selectedFile.photoURL = fr.result as string;
        this.selectedFile.imageFile = files[0];
      });
    } else {
      this.selectedFile.imageName = '';
      this.selectedFile.imageFile = '';
      this.selectedFile.photoURL = this.currentUser.profilePhotoUrl;
    }
  }

  async updateProfile() {
    this.errorMessage = '';
    // Validate the input fields
    interface UserProfile {
      [key: string]: string | undefined;
    }
    const userProfile: UserProfile = {
      name: this.currentUser.name,
      username: this.currentUser.username,
      headline: this.currentUser.headline,
      bio: this.currentUser.bio,
    };
    try {
      await updateProfileSchema.validate(userProfile, { abortEarly: true });
      const userProfileForm = new FormData();
      Object.keys(userProfile).forEach(key => {
        userProfileForm.append(key, (userProfile[key] as string));
      })
      if(this.selectedFile.imageFile){
        userProfileForm.append('profilePhoto', this.selectedFile.imageFile);
      }

      // upload the data
      const updatedUser = await this.userStore.updateUserProfile(userProfileForm);
      this.successMessage = 'Profile updated successfully!'
    } catch (error) {
      if (error.name === 'ValidationError') {
        this.errorMessage = error.message;
        return;
      }
    }
  }
}
</script>

<style></style>
