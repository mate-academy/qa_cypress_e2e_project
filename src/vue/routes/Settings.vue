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
                  data-qa="user-image"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control form-control-lg"
                  type="text"
                  v-model="user.username"
                  placeholder="Your username"
                  data-qa="user-username"
                />
              </fieldset>
              <fieldset class="form-group">
                <textarea
                  class="form-control form-control-lg"
                  rows="8"
                  v-model="user.bio"
                  placeholder="Short bio about you"
                  data-qa="user-bio"
                ></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control form-control-lg"
                  type="text"
                  v-model="user.email"
                  placeholder="Email"
                  data-qa="user-email"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control form-control-lg"
                  type="password"
                  v-model="user.password"
                  placeholder="Password"
                  data-qa="user-new-password"
                />
              </fieldset>
              <button class="btn btn-lg btn-primary pull-xs-right" data-qa="update-button">
                Update Settings
              </button>
            </fieldset>
          </form>
          <!-- Line break for logout button -->
          <hr />
          <button @click="logout" class="btn btn-outline-danger" data-qa="logout-button">
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
