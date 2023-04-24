const { defineConfig } = require("cypress");
const faker = require("faker");
const { clear } = require("./server/db");
const { seed } = require("./server/db");
const {
  addMatchImageSnapshotPlugin,
} = require('cypress-image-snapshot/plugin');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:1667/',
    setupNodeEvents(on, config) {
      on("task", {
        generateUser() {
          return {
            username: faker.internet.userName(),
            email: 'testuser@example.com',
            password: '12345Qwert!',
          };
        },
        generateArticle() {
          return {
            title: faker.lorem.word(),
            description: faker.lorem.words(),
            body: faker.lorem.words(),
            tag: faker.lorem.word()
          };;
        },
        'db:clear'() {
          clear();

          return null;
        },
        'db:seed'() {
          seed();

          return null;
        }
      });
      addMatchImageSnapshotPlugin(on, config);
    },
  },
});
