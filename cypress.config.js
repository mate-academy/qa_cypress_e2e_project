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
    setupNodeEvents(on, config) {
      on('task', {
        generateUser() {
          const randomNumber = Math.ceil(Math.random(1000) * 1000);
          const userName = faker.name.firstName() + `${randomNumber}`;
          return {
            username: userName.toLowerCase(),
            email: faker.internet.email().toLowerCase(),
            password: faker.internet.password(),
            wrongEmail: 'wrongemail12345@yahoo.com',
            invalidEmail: 'superemaiagmail.com',
            shortPassword: 'P@ss1',
            wrongPassword: 'WrongPassword!'
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
        generateData() {
          const randomNumbers = Math.ceil(Math.random(1000) * 1000);
          const userNames = faker.name.firstName() + `${randomNumbers}`;
          return {
            newUserName: userNames.toLowerCase(),
            bio: faker.lorem.words(),
            newPassword: faker.internet.password(),
            newEmail: faker.internet.email().toLowerCase()
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
