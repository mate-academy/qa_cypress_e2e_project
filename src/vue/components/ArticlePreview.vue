<template>
  <div data-qa="article-preview" class="article-preview">
    <ArticleMeta :article="article" />
    <router-link :to="articleLink" data-qa="article-title-link" class="preview-link" >
      <h1 v-text="article.title" />
      <p v-text="article.description" />
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
