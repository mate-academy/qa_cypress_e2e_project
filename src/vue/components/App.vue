<template>
  <div id="app" data-testid="app-container">
    <Header data-testid="header-component" />
    <keep-alive>
      <router-view data-testid="router-view"></router-view>
    </keep-alive>
    <Footer data-testid="footer-component" />
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