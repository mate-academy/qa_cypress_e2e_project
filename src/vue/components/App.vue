<template>
  <div id="app" data-qa="app-container">
    <Header data-qa="app-header" />
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <Footer data-qa="app-footer" />
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
export default {
  name: "App",
  components: {
    Header,
    Footer
  }
};
</script>

<style></style>
