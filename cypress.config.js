const { defineConfig } = require("cypress");
const { clear } = require("./server/db");
const { seed } = require("./server/db");
const {
  addMatchImageSnapshotPlugin,
} = require("cypress-image-snapshot/plugin");
const faker = require("faker"); // Upewnij się, że faker jest zainstalowany

module.exports = defineConfig({
  e2e: {
    baseUrl: "http://localhost:1667/",
    setupNodeEvents(on, config) {
      on("task", {
        generateArticle() {
          return {
            title: "Sample Title",
            description: "Sample Description",
            body: "Sample Body Content",
            tag: "SampleTag",
          };
        },
        "db:clear"() {
          clear();
          return null;
        },
        "db:seed"() {
          seed();
          return null;
        },
        generateUser() {
          const user = {
            username: faker.internet.userName(),
            email: faker.internet.email(),
            password: faker.internet.password(),
          };
          return user; // Zwróć wygenerowanego użytkownika
        },
      });
      addMatchImageSnapshotPlugin(on, config);
    },
  },
});
