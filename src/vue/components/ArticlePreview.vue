<template>
  <div data-qa="article-block" class="article-preview">
    <ArticleMeta :article="article" />
    <router-link :to="articleLink" class="preview-link">
      <h1 data-qa="title-article" v-text="article.title" />
      <p data-qa="body-article" v-text="article.description" />
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
