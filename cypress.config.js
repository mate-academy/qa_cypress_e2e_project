const { defineConfig } = require('cypress');
const faker = require('faker');
const { clear } = require('./server/db');
const { seed } = require('./server/db');
const {
  addMatchImageSnapshotPlugin
} = require('cypress-image-snapshot/plugin');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:1667/#',
    setupNodeEvents(on, config) {
      on('task', {
        generateUser() {
          const randomNumber = Math.ceil(Math.random(10000) * 10000);
          return {
            username: (faker.lorem.word() + randomNumber).toLowerCase(),
            email: faker.lorem.word() + randomNumber + '@gmail.com',
            password: faker.lorem.word() + randomNumber,
            bio: faker.lorem.words(),
            anotherUsername: (faker.lorem.word() + randomNumber).toLowerCase(),
            anotherEmail: faker.lorem.word() + randomNumber + '@gmail.com',
            anotherPassword: faker.lorem.word().toUpperCase() + randomNumber + faker.random.word(),
            failEmail: faker.lorem.word() + randomNumber + 'gmail.com',
            failPassword: faker.random.word()
          };
        },
        generateArticle() {
          return {
            title: faker.lorem.word(),
            description: faker.lorem.words(),
            body: faker.lorem.words(),
            tag: faker.lorem.word(),
            anotherTitle: faker.lorem.word(),
            anotherDescription: faker.lorem.words(),
            anotherBody: faker.lorem.words(),
            anothertag: faker.lorem.word()
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
