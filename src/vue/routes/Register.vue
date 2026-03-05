<template>
  <div class="auth-page" data-qa="register-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center" data-qa="register-heading">Sign up</h1>
          <p class="text-xs-center">
            <router-link :to="{ name: 'login' }" data-qa="login-link">
              Have an account?
            </router-link>
          </p>
          <ul v-if="errors" class="error-messages" data-qa="register-errors">
            <li v-for="(v, k) in errors" :key="k">{{ k }} {{ v | error }}</li>
          </ul>
          <form @submit.prevent="onSubmit(username, email, password)" data-qa="register-form">
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                type="text"
                v-model="username"
                placeholder="Username"
                data-qa="username-input"
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                type="text"
                v-model="email"
                placeholder="Email"
                data-qa="email-input"
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                type="password"
                v-model="password"
                placeholder="Password"
                data-qa="password-input"
              />
            </fieldset>
            <button class="btn btn-lg btn-primary pull-xs-right" data-qa="register-button">
              Sign up
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import swal from "sweetalert";

export default {
  name: "Register",
  data() {
    return {
      username: null,
      email: null,
      password: null
    };
  },
  computed: {
    ...mapGetters([
      "errors",
    ])
  },
  mounted() {
    console.log("Register.vue mounted!");
  },
  methods: {
    async onSubmit(username, email, password) {
      swal({
        text: "Registering... Please wait...",
        buttons: false,
      });

      let response = await this.$store.dispatch("register", { username, email, password });

      if (response === true) {
        swal({
          title: "Welcome!",
          icon: "success",
          timer: 1000,
          buttons: false,
        });
        return this.$router.push({ name: "home" });
      }

      swal({
        title: "Registration failed!",
        text: response.errors.body.join(" "),
        icon: "error"
      });
    }
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      console.log("Resetting register form fields.");
      vm.username = null;
      vm.email = null;
      vm.password = null;
    });
  }
};
</script>
