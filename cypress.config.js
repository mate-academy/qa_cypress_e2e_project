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
          return {
            username: faker.name.firstName() + 'Bravo' + `${randomNumber}`,
            email: 'test' + `${randomNumber}` + 'bravo' + '@gmail.com',
            password: '12345Qwert!',
            invalidUsername: '!@#$%^&*',
            emailWithoutDot: faker.name.firstName() + '@gmailcom',
            emailWithoutAt: faker.name.firstName() + 'gmail.com',
            bio: faker.lorem.lines(),
            updatePassword: 'Update12345Qwert!',
            updateEmail: 'Update' + 'test' + `${randomNumber}` + 'bravo' + '@gmail.com'
          };
        },
        generateArticle() {
          return {
            title: faker.lorem.word(),
            description: faker.lorem.words(),
            body: faker.lorem.words(),
            tag: faker.lorem.word(),
            editedTitle: 'edited' + faker.lorem.word(),
            editedDescription: 'edited' + faker.lorem.words(),
            editedBody: 'edited' + faker.lorem.words()
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
