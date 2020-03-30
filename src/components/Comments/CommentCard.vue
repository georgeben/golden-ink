<template>
  <div class="mb-4">
    <div class="author-info flex items-start my-2">
      <img
        class=" w-8 h-8 object-cover mr-2 rounded-full"
        src="https://i.pinimg.com/originals/03/3f/c5/033fc537c42bfe4e2eb5b6e128a2d083.png"
        alt=""
      />
      <div>
        <p class="text-gray-700 text-base font-medium">
          {{ comment.user.name }}
        </p>
        <p class="text-sm text-gray-600">
          {{ comment.content }}
        </p>

        <div class="actions mt-1 flex items-start">
          <button title="Add to favourites" class="flex items-center mr-4">
            <svg
              class="w-4 h-4 text-gray-600 fill-current mr-2"
              viewBox="0 -28 512.001 512"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M256 455.516c-7.29 0-14.316-2.641-19.793-7.438-20.684-18.086-40.625-35.082-58.219-50.074l-.09-.078c-51.582-43.957-96.125-81.918-127.117-119.313C16.137 236.81 0 197.172 0 153.871c0-42.07 14.426-80.883 40.617-109.293C67.121 15.832 103.488 0 143.031 0c29.555 0 56.621 9.344 80.446 27.77C235.5 37.07 246.398 48.453 256 61.73c9.605-13.277 20.5-24.66 32.527-33.96C312.352 9.344 339.418 0 368.973 0c39.539 0 75.91 15.832 102.414 44.578C497.578 72.988 512 111.801 512 153.871c0 43.3-16.133 82.938-50.777 124.738-30.993 37.399-75.532 75.356-127.106 119.309-17.625 15.016-37.597 32.039-58.328 50.168a30.046 30.046 0 01-19.789 7.43zM143.031 29.992c-31.066 0-59.605 12.399-80.367 34.914-21.07 22.856-32.676 54.45-32.676 88.965 0 36.418 13.535 68.988 43.883 105.606 29.332 35.394 72.961 72.574 123.477 115.625l.093.078c17.66 15.05 37.68 32.113 58.516 50.332 20.961-18.254 41.012-35.344 58.707-50.418 50.512-43.051 94.137-80.223 123.469-115.617 30.344-36.618 43.879-69.188 43.879-105.606 0-34.516-11.606-66.11-32.676-88.965-20.758-22.515-49.3-34.914-80.363-34.914-22.758 0-43.653 7.235-62.102 21.5-16.441 12.719-27.894 28.797-34.61 40.047-3.452 5.785-9.53 9.238-16.261 9.238s-12.809-3.453-16.262-9.238c-6.71-11.25-18.164-27.328-34.61-40.047-18.448-14.265-39.343-21.5-62.097-21.5zm0 0"
              />
            </svg>
            <span class="text-sm text-gray-600">12</span>
          </button>
          <p
            class="text-sm text-gray-600 mr-2 cursor-pointer"
            @click="
              isLoggedIn ? (replyComment = true) : $router.push('/signin')
            "
          >
            Reply
          </p>
          <p class="text-sm text-gray-600 mr-2 cursor-pointer" v-if="modify">
            Edit
          </p>
          <p
            class="text-red-500 text-sm cursor-pointer"
            v-if="modify"
            @click="displayModal = true"
          >
            Delete
          </p>
        </div>
        <div class="sub-comment" v-if="replyComment">
          <textarea
            class="border border-gray-400 w-full mt-2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            cols="30"
            rows="2"
            placeholder="Add a comment"
          ></textarea>
          <div class="actions mt-2">
            <button class="bg-accent text-sm text-white px-3 py-1 mr-2">
              Post reply
            </button>
            <button class="text-sm text-gray-600" @click="replyComment = false">
              Cancel
            </button>
          </div>
        </div>
        <modal :show="displayModal" @close="displayModal = false">
          <h3 class="text-red-500 text-xl font-medium mb-4">Delete comment?</h3>
          <p>
            Are you sure you want to delete this comment?
          </p>

          <div class="mt-6">
            <button
              class="bg-red-500 hover:bg-red-600 text-white py-2 px-4 mr-6"
              @click="deleteComment"
            >
              Delete
            </button>
            <button @click="displayModal = false">
              Cancel
            </button>
          </div>
        </modal>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Modal from '@/components/Widgets/Modal.vue';
import { Component, Vue, Prop } from 'vue-property-decorator';
import { Comment, User } from '../../types';
import { namespace } from 'vuex-class';
const userNamespace = namespace('user');

@Component({
  components: {
    Modal,
  },
})
export default class CommentCard extends Vue {
  @Prop({ required: true }) comment!: Comment;
  @userNamespace.State('currentUser') user!: User;
  @userNamespace.State('isLoggedIn') isLoggedIn!: boolean;
  replyComment = false;
  displayModal = false;

  async deleteComment() {
    if (!this.isLoggedIn) return;
    this.$emit('delete', this.comment.id);
  }

  get modify(): boolean {
    if (!this.isLoggedIn) return false;
    if (this.user && this.user.id === this.comment.user.id) {
      return true;
    }
    return false;
  }
}
</script>

<style></style>
