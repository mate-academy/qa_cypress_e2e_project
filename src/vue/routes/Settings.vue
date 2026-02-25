<template>
  <div class="settings-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Your Settings</h1>
          <form @submit.prevent="updateSettings()">
            <fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control"
                  type="text"
                  v-model="form.image"
                  placeholder="URL of profile picture"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control form-control-lg"
                  type="text"
                  v-model="form.username"
                  placeholder="Your username"
                  data-cy="settings-username"
                />
              </fieldset>
              <fieldset class="form-group">
                <textarea
                  class="form-control form-control-lg"
                  rows="8"
                  v-model="form.bio"
                  placeholder="Short bio about you"
                  data-cy="settings-bio"
                ></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control form-control-lg"
                  type="text"
                  v-model="form.email"
                  placeholder="Email"
                  data-cy="settings-email"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control form-control-lg"
                  type="password"
                  v-model="form.password"
                  placeholder="Password"
                  data-cy="settings-password"
                />
              </fieldset>
              <button class="btn btn-lg btn-primary pull-xs-right" data-cy="settings-upd-btn">
                Update Settings
              </button>
            </fieldset>
          </form>
          <!-- Line break for logout button -->
          <hr />
          <button @click="logout" data-cy="settings-logout-btn" class="btn btn-outline-danger">
            Or click here to logout.
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Settings",
  data() {
    return {
      form: {
        image: "",
        username: "",
        bio: "",
        email: "",
        password: "",
      },
    };
  },
  computed: {
    ...mapGetters([
      "user",
    ])
  },
  mounted() {
    console.log("Settings.vue mounted!");
    this.syncFormFromUser();
  },
  methods: {
    syncFormFromUser() {
      if (!this.user) {
        return;
      }
      this.form = {
        image: this.user.image || "",
        username: this.user.username || "",
        bio: this.user.bio || "",
        email: this.user.email || "",
        password: "",
      };
    },
    updateSettings() {
      const payload = {
        ...this.user,
        ...this.form,
      };
      swal({
          text: "Updating your information... Please wait...",
          timer: 500,
          buttons: false,
        })
        .then(async () => {
          return await this.$store.dispatch("updateUser", payload);
        })
        .then((response) => {
          if (response === true) {
            return swal({
              title: "Update successful!",
              icon: "success"
            });
          }
          let error = "";
          for (let key in response.errors) {
            error += `${response.errors[key]} `;
          }
          swal({
            title: "Update failed!",
            text: error,
            icon: "error"
          });
        });
    },
    logout() {
      this.$store.dispatch("logOut")
        .then(() => {
          this.$router.push({ name: "home" });
        });
    }
  },
  watch: {
    user: {
      handler() {
        this.syncFormFromUser();
      },
      deep: true,
    },
  },
};
</script>
