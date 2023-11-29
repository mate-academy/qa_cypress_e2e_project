<template>
  <div data-qa="global-feed" class="home-global"><ArticleList type="all" /></div>
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
