<template>
  <div class="article-preview" data-qa="article-preview">
    <ArticleMeta :article="article" />
    <router-link :to="articleLink" class="preview-link" data-qa="article-preview-link">
      <h1 v-text="article.title" data-qa="article-preview-title" />
      <p v-text="article.description" data-qa="article-preview-description" />
      <span data-qa="article-preview-read-more">Read more...</span>
      <TagList :tags="article.tags" data-qa="article-preview-tag-list" />
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
