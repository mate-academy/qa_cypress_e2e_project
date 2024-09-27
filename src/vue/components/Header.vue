<template>
  <nav class="navbar navbar-light" data-testid="header">
    <div class="container">
      <router-link class="navbar-brand" :to="{ name: 'home' }" data-testid="home-link">
        conduit
      </router-link>
      <ul v-if="!is_authenticated" class="nav navbar-nav pull-xs-right" data-testid="unauthenticated-nav">
        <li class="nav-item">
          <router-link
            class="nav-link"
            active-class="active"
            exact
            :to="{ name: 'home' }"
            data-testid="home-nav"
          >
            Home
          </router-link>
        </li>
        <li class="nav-item">
          <router-link
            class="nav-link"
            active-class="active"
            exact
            :to="{ name: 'login' }"
            data-testid="login-nav"
          >
            <i class="ion-compose"></i>Sign in
          </router-link>
        </li>
        <li class="nav-item">
          <router-link
            class="nav-link"
            active-class="active"
            exact
            :to="{ name: 'register' }"
            data-testid="register-nav"
          >
            <i class="ion-compose"></i>Sign up
          </router-link>
        </li>
      </ul>
      <ul v-else class="nav navbar-nav pull-xs-right" data-testid="authenticated-nav">
        <li class="nav-item">
          <router-link
            class="nav-link"
            active-class="active"
            exact
            :to="{ name: 'home' }"
            data-testid="home-nav"
          >
            Home
          </router-link>
        </li>
        <li class="nav-item">
          <router-link
            class="nav-link"
            active-class="active"
            :to="{
              name: 'article-edit',
              params: { new: true }
            }"
            data-testid="new-article-nav"
          >
            <i class="ion-compose"></i>&nbsp;New Article
          </router-link>
        </li>
        <li class="nav-item">
          <router-link
            class="nav-link"
            active-class="active"
            exact
            :to="{ name: 'settings' }"
            data-testid="settings-nav"
          >
            <i class="ion-gear-a"></i>&nbsp;Settings
          </router-link>
        </li>
        <li class="nav-item" v-if="user.username">
          <router-link
            data-testid="profile-nav"
            class="nav-link"
            active-class="active"
            exact
            :to="{
              name: 'profile',
              params: { username: user.username }
            }"
          >
            {{ user.username }}
          </router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Header",
  computed: {
    ...mapGetters(["user", "is_authenticated"])
  }
};
</script>
