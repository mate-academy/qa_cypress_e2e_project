<template>
  <div data-testid="comment-editor">
    <ListErrors :errors="errors" data-testid="list-errors" />
    <form class="card comment-form" @submit.prevent="onSubmit(slug, comment)" data-testid="comment-form">
      <div class="card-block">
        <textarea
          class="form-control"
          v-model="comment"
          placeholder="Write a comment..."
          rows="3"
          data-testid="comment-textarea"
        >
        </textarea>
      </div>
      <div class="card-footer">
        <img :src="userImage" class="comment-author-img" data-testid="user-image" />
        <button class="btn btn-sm btn-primary" data-testid="post-comment-btn">Post Comment</button>
      </div>
    </form>
  </div>
</template>

<script>
import ListErrors from "@/components/ListErrors.vue";
export default {
  name: "CommentEditor",
  components: { ListErrors },
  props: {
    slug: { type: String, required: true },
    content: { type: String, required: false },
    userImage: { type: String, required: false }
  },
  data() {
    return {
      comment: this.content || null,
      errors: {}
    };
  },
  methods: {
    onSubmit(slug, comment) {
      console.log("Dispatching event: createArticleComment")
      this.$store
        .dispatch("createArticleComment", { slug, comment })
        .then(() => {
          this.comment = null;
          this.errors = {};
        })
        .catch(({ response }) => {
          this.errors = response.data.errors;
        });
    }
  }
};
</script>
