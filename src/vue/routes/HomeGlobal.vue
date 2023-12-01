<template>
  <div data-qa="feed-section" class="home-global"><ArticleList type="all" /></div>
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
