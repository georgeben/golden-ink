<template>
  <div class="bg-gray-200 py-24 px-3">
    <div class="bg-white shadow-xl rounded-lg p-3 md:w-3/4 md:mx-auto">
      <h1 class="font-bold text-2xl">{{ story.title }}</h1>
      <div class="author-info flex items-center mb-4">
        <img
          class=" w-8 h-8 object-cover mr-2 rounded-full"
          src="https://i.pinimg.com/originals/03/3f/c5/033fc537c42bfe4e2eb5b6e128a2d083.png"
          alt=""
        />
        <div>
          <p class="text-gray-700 text-base font-medium">
            {{ story.author.name }}
          </p>
          <p class="date text-xs text-gray-600">
            6th June, 2020
          </p>
        </div>
      </div>
      <div class="story-image sha">
        <img
          src="../assets/images/writing.jpeg"
          alt="Story photo"
          class="sm:mx-auto"
        />
      </div>
      <vue-editor
        v-model="story.formattedContent"
        :disabled="true"
        :editorOptions="editorOptions"
        class=""
      >
      </vue-editor>
      <p class="text-sm">Published in {{ story.topic.name }}</p>
      <div class="actions flex items-center mt-2" v-if="!story.private">
        <div class="flex items-center mr-2">
          <input
            type="checkbox"
            class="checkbox"
            id="checkbox"
            v-model="liked"
          />
          <label for="checkbox">
            <svg
              id="heart-svg"
              viewBox="467 392 58 57"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g
                id="Group"
                fill="none"
                fill-rule="evenodd"
                transform="translate(467 392)"
              >
                <path
                  d="M29.144 20.773c-.063-.13-4.227-8.67-11.44-2.59C7.63 28.795 28.94 43.256 29.143 43.394c.204-.138 21.513-14.6 11.44-25.213-7.214-6.08-11.377 2.46-11.44 2.59z"
                  id="heart"
                  fill="#AAB8C2"
                />
                <circle
                  id="main-circ"
                  fill="#E2264D"
                  opacity="0"
                  cx="29.5"
                  cy="29.5"
                  r="1.5"
                />

                <g id="grp7" opacity="0" transform="translate(7 6)">
                  <circle id="oval1" fill="#9CD8C3" cx="2" cy="6" r="2" />
                  <circle id="oval2" fill="#8CE8C3" cx="5" cy="2" r="2" />
                </g>

                <g id="grp6" opacity="0" transform="translate(0 28)">
                  <circle id="oval1" fill="#CC8EF5" cx="2" cy="7" r="2" />
                  <circle id="oval2" fill="#91D2FA" cx="3" cy="2" r="2" />
                </g>

                <g id="grp3" opacity="0" transform="translate(52 28)">
                  <circle id="oval2" fill="#9CD8C3" cx="2" cy="7" r="2" />
                  <circle id="oval1" fill="#8CE8C3" cx="4" cy="2" r="2" />
                </g>

                <g id="grp2" opacity="0" transform="translate(44 6)">
                  <circle id="oval2" fill="#CC8EF5" cx="5" cy="6" r="2" />
                  <circle id="oval1" fill="#CC8EF5" cx="2" cy="2" r="2" />
                </g>

                <g id="grp5" opacity="0" transform="translate(14 50)">
                  <circle id="oval1" fill="#91D2FA" cx="6" cy="5" r="2" />
                  <circle id="oval2" fill="#91D2FA" cx="2" cy="2" r="2" />
                </g>

                <g id="grp4" opacity="0" transform="translate(35 50)">
                  <circle id="oval1" fill="#F48EA7" cx="6" cy="5" r="2" />
                  <circle id="oval2" fill="#F48EA7" cx="2" cy="2" r="2" />
                </g>

                <g id="grp1" opacity="0" transform="translate(24)">
                  <circle id="oval1" fill="#9FC7FA" cx="2.5" cy="3" r="2" />
                  <circle id="oval2" fill="#9FC7FA" cx="7.5" cy="2" r="2" />
                </g>
              </g>
            </svg>
          </label>
          <span>{{ story.likedBy.length }}</span>
        </div>

        <BookmarkButton v-model="bookmarked" />
      </div>
    </div>
    <div
      class="comment-section bg-white shadow-xl rounded-lg mt-6 p-3 md:w-3/4 md:mx-auto"
      v-if="!story.private"
    >
      <h3 class="text-lg font-semibold">Comments</h3>
      <div class="add-comment mb-4">
        <textarea
          class="border border-gray-400 w-full mt-2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          cols="30"
          rows="5"
          placeholder="Add a comment"
          v-model="comment"
        ></textarea>
        <button class="bg-accent text-white px-3 py-1" @click="postComment">
          Add comment
        </button>
      </div>

      <div class="comments">
        <CommentCard
          v-for="comment in comments"
          :key="comment.id"
          :comment="comment"
          @delete="deleteComment"
          @edit="updateComment"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { VueEditor } from 'vue2-editor';
import CommentCard from '@/components/Comments/CommentCard.vue';
import BookmarkButton from '@/components/Widgets/Bookmark.vue';
import { namespace } from 'vuex-class';
import { getModule } from 'vuex-module-decorators';
import userModule from '@/store/modules/user';
import {
  getSingleStory,
  postComment,
  getComments,
  deleteComment,
  updateComment
} from '../api/stories';
import { getUserStory } from '@/api/user-api-service';
import { Story, User, Comment } from '@/types';

const userNamespace = namespace('user');

@Component({
  components: {
    VueEditor,
    CommentCard,
    BookmarkButton,
  },
})
export default class ViewStory extends Vue {
  @userNamespace.State('currentUser') user!: User;
  @userNamespace.State('isLoggedIn') isLoggedIn!: boolean;
  userStore = getModule(userModule, this.$store);
  story: Story | null = null;
  comments: Comment[] = [];
  editorOptions = {
    modules: {
      toolbar: false,
    },
  };
  comment = '';

  async created(): Promise<void> {
    const storySlug: string = this.$route.params.story;
    const storyType = this.$route.query.t;
    // Get the story
    try {
      if (storyType === 'private') {
        // Ensure that the person is logged in
        if (!this.isLoggedIn) {
          this.$router.replace('/signin');
          return;
        }
        const story = await getUserStory(storySlug);
        if (story) {
          this.story = story;
          // Private stories can't have comments
        }
      } else {
        const story = await getSingleStory(storySlug);
        if (story) {
          this.story = story;
          // Get comments
          const comments = await getComments(story.slug);
          this.comments = comments;
        }
      }
    } catch (error) {
      // TODO Handle error
      console.log('Oh no an error', error);
    }
  }

  get liked(): boolean {
    if (!this.user) return false;
    return this.story?.likedBy?.some(
      (user) => user.id === this.user.id,
    ) as boolean;
  }

  set liked(value) {
    if (!this.user) {
      this.$router.push('/signin');
      return;
    }
    if (value) {
      // The user is liking the story
      this.likeStory();
      this.story?.likedBy?.push(this.user);
      return;
    }
    this.unlikeStory();
    this.story?.likedBy?.forEach((user, i) => {
      if (user.id === this.user.id) {
        // Remove the user
        this.story?.likedBy?.splice(i, 1);
        return;
      }
    });
  }

  async likeStory() {
    if (this.story) {
      await this.userStore.likeStory(this.story.slug);
    }
  }

  async unlikeStory() {
    if (this.story) {
      await this.userStore.unlikeStory(this.story.slug);
    }
  }

  get bookmarked(): boolean {
    if (!this.user) return false;
    return this.user.bookmarks?.some(
      (bookmark) => bookmark.id === this.story?.id,
    ) as boolean;
  }

  set bookmarked(value) {
    if (!this.user) {
      this.$router.push('/signin');
      return;
    }
    if (value) {
      this.bookmarkStory();
      if (this.story) {
        this.user.bookmarks?.push(this.story);
      }
      return;
    }
    this.removeStoryFromBookmark();
    this.user.bookmarks?.forEach((bookmark, i) => {
      if (bookmark.id === this.story?.id) {
        this.user.bookmarks?.splice(i, 1);
        return;
      }
    });
  }

  async bookmarkStory() {
    if (this.story) {
      await this.userStore.addStoryToBookmarks(this.story.slug);
    }
  }

  async removeStoryFromBookmark() {
    if (this.story) {
      await this.userStore.removeStoryFromBookmarks(this.story.slug);
    }
  }

  async postComment() {
    if(!this.isLoggedIn) {
      return this.$router.push('/signin')
    }
    if (!this.story) return;
    if (!this.comment) return;
    try {
      const comment = await postComment(this.comment, this.story.slug);
      this.comments.unshift(comment);
    } catch (error) {
      console.log('An error occurred while posting a comment', error);
    }
  }

  async deleteComment(commentId: number) {
    try {
      if (!this.story) return;
      await deleteComment(this.story.slug, commentId);
      this.comments = this.comments.filter(
        (comment) => comment.id !== commentId,
      );
    } catch (error) {
      console.log('Error occurred while deleting comment', error);
    }
  }

  async updateComment(data: { commentId: number; content: string }){
    if(!this.story) return;
    try {
      const updatedComment = await  updateComment(this.story.slug, data.commentId, data.content);
      this.comments.forEach((comment) => {
        if(comment.id === updatedComment.id){
          comment.content = updatedComment.content
        }
      })
    } catch (error) {
      console.log('An error occurred while updating comment', error);
    }
  }
}
</script>

<style scoped>
svg#heart-svg {
  cursor: pointer;
  overflow: visible;
  width: 50px;
}

svg #heart {
  transform-origin: center;
  animation: animateHeartOut 0.3s linear forwards;
}

svg #main-circ {
  transform-origin: 29.5px 29.5px;
}

.checkbox {
  display: none;
}

.checkbox:checked + label svg #heart {
  transform: scale(0.2);
  fill: #e2264d;
  animation: animateHeart 0.3s linear forwards 0.25s;
}

.checkbox:checked + label svg #main-circ {
  transition: all 2s;
  animation: animateCircle 0.3s linear forwards;
  opacity: 1;
}

.checkbox:checked + label svg #grp1 {
  opacity: 1;
  transition: 0.1s all 0.3s;
}

.checkbox:checked + label svg #grp1 #oval1 {
  transform: scale(0) translate(0, -30px);
  transform-origin: 0 0 0;
  transition: 0.5s transform 0.3s;
}

.checkbox:checked + label svg #grp1 #oval2 {
  transform: scale(0) translate(10px, -50px);
  transform-origin: 0 0 0;
  transition: 1.5s transform 0.3s;
}

.checkbox:checked + label svg #grp2 {
  opacity: 1;
  transition: 0.1s all 0.3s;
}

.checkbox:checked + label svg #grp2 #oval1 {
  transform: scale(0) translate(30px, -15px);
  transform-origin: 0 0 0;
  transition: 0.5s transform 0.3s;
}

.checkbox:checked + label svg #grp2 #oval2 {
  transform: scale(0) translate(60px, -15px);
  transform-origin: 0 0 0;
  transition: 1.5s transform 0.3s;
}

.checkbox:checked + label svg #grp3 {
  opacity: 1;
  transition: 0.1s all 0.3s;
}

.checkbox:checked + label svg #grp3 #oval1 {
  transform: scale(0) translate(30px, 0px);
  transform-origin: 0 0 0;
  transition: 0.5s transform 0.3s;
}

.checkbox:checked + label svg #grp3 #oval2 {
  transform: scale(0) translate(60px, 10px);
  transform-origin: 0 0 0;
  transition: 1.5s transform 0.3s;
}

.checkbox:checked + label svg #grp4 {
  opacity: 1;
  transition: 0.1s all 0.3s;
}

.checkbox:checked + label svg #grp4 #oval1 {
  transform: scale(0) translate(30px, 15px);
  transform-origin: 0 0 0;
  transition: 0.5s transform 0.3s;
}

.checkbox:checked + label svg #grp4 #oval2 {
  transform: scale(0) translate(40px, 50px);
  transform-origin: 0 0 0;
  transition: 1.5s transform 0.3s;
}

.checkbox:checked + label svg #grp5 {
  opacity: 1;
  transition: 0.1s all 0.3s;
}

.checkbox:checked + label svg #grp5 #oval1 {
  transform: scale(0) translate(-10px, 20px);
  transform-origin: 0 0 0;
  transition: 0.5s transform 0.3s;
}

.checkbox:checked + label svg #grp5 #oval2 {
  transform: scale(0) translate(-60px, 30px);
  transform-origin: 0 0 0;
  transition: 1.5s transform 0.3s;
}

.checkbox:checked + label svg #grp6 {
  opacity: 1;
  transition: 0.1s all 0.3s;
}

.checkbox:checked + label svg #grp6 #oval1 {
  transform: scale(0) translate(-30px, 0px);
  transform-origin: 0 0 0;
  transition: 0.5s transform 0.3s;
}

.checkbox:checked + label svg #grp6 #oval2 {
  transform: scale(0) translate(-60px, -5px);
  transform-origin: 0 0 0;
  transition: 1.5s transform 0.3s;
}

.checkbox:checked + label svg #grp7 {
  opacity: 1;
  transition: 0.1s all 0.3s;
}

.checkbox:checked + label svg #grp7 #oval1 {
  transform: scale(0) translate(-30px, -15px);
  transform-origin: 0 0 0;
  transition: 0.5s transform 0.3s;
}

.checkbox:checked + label svg #grp7 #oval2 {
  transform: scale(0) translate(-55px, -30px);
  transform-origin: 0 0 0;
  transition: 1.5s transform 0.3s;
}

.checkbox:checked + label svg #grp2 {
  opacity: 1;
  transition: 0.1s opacity 0.3s;
}

.checkbox:checked + label svg #grp3 {
  opacity: 1;
  transition: 0.1s opacity 0.3s;
}

.checkbox:checked + label svg #grp4 {
  opacity: 1;
  transition: 0.1s opacity 0.3s;
}

.checkbox:checked + label svg #grp5 {
  opacity: 1;
  transition: 0.1s opacity 0.3s;
}

.checkbox:checked + label svg #grp6 {
  opacity: 1;
  transition: 0.1s opacity 0.3s;
}

.checkbox:checked + label svg #grp7 {
  opacity: 1;
  transition: 0.1s opacity 0.3s;
}

@keyframes animateCircle {
  40% {
    transform: scale(10);
    opacity: 1;
    fill: #dd4688;
  }
  55% {
    transform: scale(11);
    opacity: 1;
    fill: #d46abf;
  }
  65% {
    transform: scale(12);
    opacity: 1;
    fill: #cc8ef5;
  }
  75% {
    transform: scale(13);
    opacity: 1;
    fill: transparent;
    stroke: #cc8ef5;
    stroke-width: 0.5;
  }
  85% {
    transform: scale(17);
    opacity: 1;
    fill: transparent;
    stroke: #cc8ef5;
    stroke-width: 0.2;
  }
  95% {
    transform: scale(18);
    opacity: 1;
    fill: transparent;
    stroke: #cc8ef5;
    stroke-width: 0.1;
  }
  100% {
    transform: scale(19);
    opacity: 1;
    fill: transparent;
    stroke: #cc8ef5;
    stroke-width: 0;
  }
}

@keyframes animateHeart {
  0% {
    transform: scale(0.2);
  }
  40% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
}

@keyframes animateHeartOut {
  0% {
    transform: scale(1.4);
  }
  100% {
    transform: scale(1);
  }
}
</style>
