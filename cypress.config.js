const { defineConfig } = require('cypress');
const faker = require('@faker-js/faker');
const { clear } = require('./server/db');
const { seed } = require('./server/db');
const {
  addMatchImageSnapshotPlugin
} = require('cypress-image-snapshot/plugin');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:1667/',
    viewportHeight: 1080,
    viewportWidth: 1920,
    setupNodeEvents(on, config) {
      on('task', {
        generateUser() {
          const randomNumber = Math.ceil(Math.random(1000) * 1000);
          return {
            username: faker.name.firstName() + `${randomNumber}`,
            email: faker.internet.email(),
            password: 'P@ssw0rd'
          };
        },
        generateArticle() {
          return {
            title: faker.lorem.word(),
            description: faker.lorem.words(2),
            body: faker.lorem.words(10),
            tag: faker.lorem.word()
          };
        },
        generateUserInfo() {
          return {
            username: faker.lorem.words(1),
            bio: faker.lorem.words(4),
            email: faker.internet.email(),
            password: faker.internet.password()
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
