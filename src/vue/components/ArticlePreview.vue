<template>
  <div class="article-preview" data-testid="article-preview">
    <ArticleMeta :article="article" data-testid="article-meta" />
    <router-link :to="articleLink" class="preview-link" data-testid="article-link">
      <h1 v-text="article.title" data-testid="article-title" />
      <p v-text="article.description" data-testid="article-description" />
      <span data-testid="read-more">Read more...</span>
      <TagList :tags="article.tags" data-testid="tag-list" />
    </router-link>
  </div>
</template>

<script>
import ArticleMeta from "./ArticleMeta.vue";
import TagList from "./TagList.vue";

export default {
  name: "ArticlePreview",
  components: {
    ArticleMeta,
    TagList
  },
  props: {
    article: {
      type: Object,
      required: true
    }
  },
  computed: {
    articleLink() {
      return {
        name: "article",
        params: {
          slug: this.article.slug
        }
      };
    }
  }
};
</script>
