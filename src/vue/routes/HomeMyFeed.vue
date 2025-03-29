<template>
  <div class="home-my-feed" data-cy="created-articles-list"><ArticleList type="feed" /></div>
</template>

<script>
import ArticleList from "@/components/ArticleList.vue";
export default {
  name: "home-my-feed",
  components: {
    ArticleList
  }
};
</script>
