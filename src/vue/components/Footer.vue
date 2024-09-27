<template>
  <footer data-testid="footer">
    <div class="container">
      <router-link class="logo-font" :to="{ name: 'home', params: {} }" data-testid="home-link">
        conduit
      </router-link>
      <span class="attribution" data-testid="attribution">
        An interactive learning project from
        <a rel="noopener noreferrer" target="blank" href="https://thinkster.io" data-testid="thinkster-link"
          >Thinkster</a
        >. Code &amp; design licensed under MIT.
      </span>
    </div>
  </footer>
</template>

<script>
export default {
  name: "Footer"
};
</script>
