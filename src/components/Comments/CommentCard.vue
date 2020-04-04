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
        <p class="text-sm text-gray-600" v-if="!editComment">
          {{ comment.content }}
        </p>
        <form v-if="editComment">
          <textarea
            class="border border-gray-400 w-full mt-2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            cols="30"
            rows="5"
            placeholder="Add a comment"
            v-model="commentText"
          ></textarea>
          <button type="button" class="text-accent" @click="updateComment">
            Save Changes
          </button>
        </form>

        <div class="actions mt-1 flex items-start">
          <div class="flex items-center mr-2">
            <input
              type="checkbox"
              class="checkbox hidden"
              :id="`like-comment-${comment.id}`"
              :checked="likedComment"
              @input="handleLike"
            />
            <label :for="`like-comment-${comment.id}`">
              <svg
                class="w-4 h-4 text-gray-500 fill-current mr-1"
                :class="likedComment ? 'text-red-600' : ''"
                viewBox="0 -28 512.00002 512"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="m471.382812 44.578125c-26.503906-28.746094-62.871093-44.578125-102.410156-44.578125-29.554687 0-56.621094 9.34375-80.449218 27.769531-12.023438 9.300781-22.917969 20.679688-32.523438 33.960938-9.601562-13.277344-20.5-24.660157-32.527344-33.960938-23.824218-18.425781-50.890625-27.769531-80.445312-27.769531-39.539063 0-75.910156 15.832031-102.414063 44.578125-26.1875 28.410156-40.613281 67.222656-40.613281 109.292969 0 43.300781 16.136719 82.9375 50.78125 124.742187 30.992188 37.394531 75.535156 75.355469 127.117188 119.3125 17.613281 15.011719 37.578124 32.027344 58.308593 50.152344 5.476563 4.796875 12.503907 7.4375 19.792969 7.4375 7.285156 0 14.316406-2.640625 19.785156-7.429687 20.730469-18.128907 40.707032-35.152344 58.328125-50.171876 51.574219-43.949218 96.117188-81.90625 127.109375-119.304687 34.644532-41.800781 50.777344-81.4375 50.777344-124.742187 0-42.066407-14.425781-80.878907-40.617188-109.289063zm0 0"
                />
              </svg>
            </label>
            <span class="text-sm text-gray-600">{{
              comment.likedBy.length
            }}</span>
          </div>
          <!-- <p
            class="text-sm text-gray-600 mr-2 cursor-pointer"
            @click="
              isLoggedIn ? (replyComment = true) : $router.push('/signin')
            "
          >
            Reply
          </p> -->
          <p
            class="text-sm text-gray-600 mr-2 cursor-pointer"
            v-if="modify"
            @click="editComment = !editComment"
          >
            {{ editComment ? 'Cancel Edit' : 'Edit' }}
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
  editComment = false;
  commentText = this.comment.content;
  likedComment = false;

  created() {
    if (!this.user) {
      return;
    }
    if (this.comment.likedBy.some((user) => user.id === this.user.id)) {
      return (this.likedComment = true);
    }
  }

  deleteComment() {
    if (!this.isLoggedIn) return;
    this.$emit('delete', this.comment.id);
  }

  updateComment() {
    if(!this.user) return;
    if (!this.commentText) return;
    this.$emit('edit', {
      commentId: this.comment.id,
      content: this.commentText,
    });
    this.editComment = false;
  }

  async handleLike(e: InputEvent) {
    if(!this.user) return this.$router.push('/signin');
     const target = e.target as HTMLInputElement;
    if(target.checked){
      this.likedComment = true;
      this.$emit('like', this.comment.id);
    } else {
      this.likedComment = false;
      this.$emit('unlike', this.comment.id);
    }
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
