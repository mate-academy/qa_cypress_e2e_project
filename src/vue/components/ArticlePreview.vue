<template>
  <div class="article-preview" data-qa="articlePreview">
    <ArticleMeta :article="article" />
    <router-link
      :to="articleLink"
      class="preview-link"
      data-qa="articleLinkPreview"
    >
      <h1 v-text="article.title" data-qa="articleTitlePreview" />
      <p v-text="article.description" data-qa="articleDescriptionPreview" />
      <span>Read more...</span>
      <TagList :tags="article.tags" data-qa="articleTagsPreview" />
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
    TagList,
  },
  props: {
    article: {
      type: Object,
      required: true,
    },
  },
  computed: {
    articleLink() {
      return {
        name: "article",
        params: {
          slug: this.article.slug,
        },
      };
    },
  },
};
</script>
