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
                  v-model="user.image"
                  placeholder="URL of profile picture"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control form-control-lg"
                  type="text"
                  v-model="user.username"
                  data-qa="username-settings"
                  placeholder="Your username"
                />
              </fieldset>
              <fieldset class="form-group">
                <textarea
                  class="form-control form-control-lg"
                  rows="8"
                  v-model="user.bio"
                  data-qa="bio-settings"
                  placeholder="Short bio about you"
                ></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control form-control-lg"
                  type="text"
                  v-model="user.email"
                  data-qa="email-settings"
                  placeholder="Email"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control form-control-lg"
                  type="password"
                  v-model="user.password"
                  data-qa="New password-settings"
                  placeholder="Password"
                />
              </fieldset>
              <button data-qa="update button-settings" class="btn btn-lg btn-primary pull-xs-right">
                Update Settings
              </button>
            </fieldset>
          </form>
          <!-- Line break for logout button -->
          <hr />
          <button data-qa="logout-button-settings" @click="logout" class="btn btn-outline-danger">
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
  computed: {
    ...mapGetters([
      "user",
    ])
  },
  mounted() {
    console.log("Settings.vue mounted!");
  },
  methods: {
    updateSettings() {
      swal({
          text: "Updating your information... Please wait...",
          timer: 500,
          buttons: false,
        })
        .then(async () => {
          return await this.$store.dispatch("updateUser", this.user);
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
    mounted() {
      console.log("Settings.vue mounted!");
    },
    logout() {
      this.$store.dispatch("logOut")
        .then(() => {
          this.$router.push({ name: "home" });
        });
    }
  }
};
</script>
