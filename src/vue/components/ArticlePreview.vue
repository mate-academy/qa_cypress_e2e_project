<template>
  <div class="article-preview">
    <ArticleMeta :article="article" />
    <router-link :to="articleLink" data-cy="articleTitle-link" class="preview-link">
      <h1 v-text="article.title" />
      
      <p data-cy="articleDescription-text" v-text="article.description" />
      <span>Read more...</span>
      <TagList :tags="article.tags" />
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
