<template>
  <nav class="navbar navbar-light">
    <div class="container">
      <router-link
        class="navbar-brand"
        :to="{ name: 'home' }"
        data-qa="logo-link"
      >
        conduit
      </router-link>
      <ul v-if="!is_authenticated" class="nav navbar-nav pull-xs-right">
        <li class="nav-item">
          <router-link
            class="nav-link"
            active-class="active"
            exact
            :to="{ name: 'home' }"
            data-qa="home-link"
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
            data-qa="login-link"
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
            data-qa="register-link"
          >
            <i class="ion-compose"></i>Sign up
          </router-link>
        </li>
      </ul>
      <ul v-else class="nav navbar-nav pull-xs-right">
        <li class="nav-item">
          <router-link
            class="nav-link"
            active-class="active"
            exact
            :to="{ name: 'home' }"
            data-qa="home-link"
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
            data-qa="new-article-link"
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
            data-qa="settings-link"
          >
            <i class="ion-gear-a"></i>&nbsp;Settings
          </router-link>
        </li>
        <li class="nav-item" v-if="user.username">
          <router-link
            class="nav-link"
            active-class="active"
            exact
            :to="{
              name: 'profile',
              params: { username: user.username }
            }"
            data-qa="username-link"
          >
            {{ user.username }}
          </router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: 'Header',
  computed: {
    ...mapGetters(['user', 'is_authenticated'])
  }
};
</script>
