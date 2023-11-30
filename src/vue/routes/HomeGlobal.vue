<template>
  <div class="home-global"data-cy="global-feed-link"><ArticleList type="all" /></div>
</template>
<script>
import ArticleList from "@/components/ArticleList.vue";
export default {
  name: "home-global",
  components: {
    ArticleList
  }
};
</script>
