const { defineConfig } = require('cypress');
const faker = require('@faker-js/faker');
const { clear } = require('./server/db');
const { seed } = require('./server/db');
const {
  addMatchImageSnapshotPlugin
} = require('cypress-image-snapshot/plugin');

module.exports = defineConfig({
  e2e: {
    viewportHeight: 1080,
    viewportWidth: 1920,
    baseUrl: 'http://localhost:1667',
    setupNodeEvents(on, config) {
      on('task', {
        generateUser() {
          const randomNumber = faker.random.number({ min: 10, max: 99 })
            .toString();
          const username = faker.name.firstName() + randomNumber;
          const email = faker.internet.email();
          const password = `Paswrd${randomNumber}`;
          const bio = faker.lorem.words();

          return {
            username,
            email,
            password,
            bio
          };
        },
        generateArticle() {
          return {
            title: faker.lorem.word(),
            description: faker.lorem.words(),
            body: faker.lorem.words(),
            tag: faker.lorem.word()
          };
        },
        generateTestData() {
          const number = faker.random.number({ min: 10, max: 99 }).toString();
          return {
            invalidUsername: ' 22  ',
            invalidEmail: faker.name.firstName() + 'gmail.com',
            invalidPassword: faker.lorem.word(6).toLowerCase() + number
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
