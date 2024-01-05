const { defineConfig } = require('cypress');
const faker = require('faker');
const { clear } = require('./server/db');
const { seed } = require('./server/db');
const {
  addMatchImageSnapshotPlugin
} = require('cypress-image-snapshot/plugin');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:1667',
    failOnStatusCode: false,
    setupNodeEvents(on, config) {
      on('task', {
        generateUser() {
          const randomNumber = Math.ceil(Math.random(10000) * 10000);
          return {
            username: (faker.lorem.word() + randomNumber).toLowerCase(),
            email: faker.lorem.word().toLowerCase() +
            randomNumber + '@ymail.com',
            password: faker.lorem.word() + randomNumber + 'A!',
            bio: faker.lorem.words(),
            otherUsername: (faker.lorem.word() + randomNumber).toLowerCase(),
            otherEmail: faker.lorem.word() + randomNumber + '@ymail.com',
            otherPassword: faker.lorem.word() + randomNumber + 'A!',
            otherBio: faker.lorem.words(),
            invalidEmail: faker.lorem.word() + randomNumber + 'ymail.com',
            invalidPassword: faker.random.word()
          };
        },
        generateArticle() {
          return {
            title: faker.lorem.word(),
            description: faker.lorem.words(),
            body: faker.lorem.words(),
            tag: faker.lorem.word(),
            updateTitle: faker.lorem.words()
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
