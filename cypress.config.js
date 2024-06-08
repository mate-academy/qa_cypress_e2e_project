const { defineConfig } = require('cypress');
const { faker } = require('@faker-js/faker');
const { clear } = require('./server/db');
const { seed } = require('./server/db');
const {
  addMatchImageSnapshotPlugin
} = require('cypress-image-snapshot/plugin');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:1667',
    setupNodeEvents(on, config) {
      on('task', {
        generateUser() {
          return {
            username: faker.name.firstName().toLowerCase(),
            email: faker.internet.email().toLowerCase(),
            password: 'Nakcim_11'
          };
        },
        generateWrongUser() {
          return {
            email: faker.internet.email().toLowerCase(),
            wrongemail: faker.name.firstName().toLowerCase(),
            password: 'Nakcim_11'
          };
        },
        editUser() {
          return {
            username: faker.name.firstName().toLowerCase(),
            bio: faker.lorem.words(10),
            email: faker.internet.email().toLowerCase(),
            password: 'Makcim_10'
          };
        },
        generateArticle() {
          return {
            title: faker.lorem.word(),
            description: faker.lorem.words(),
            body: faker.lorem.words(),
            tags: faker.lorem.word()
          };
        },
        generateeditArticle() {
          return {
            title: faker.lorem.word(),
            description: faker.lorem.words(),
            body: faker.lorem.words(),
            tags: faker.lorem.word()
          };
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
    }
  }
});
