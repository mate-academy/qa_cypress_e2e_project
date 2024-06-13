const { defineConfig } = require('cypress');
const { faker } = require('@faker-js/faker');
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
            username: faker.name.firstName() + `${randomNumber}`,
            email: 'test' + `${randomNumber}` + '@mail.com',
            password: '12345Qwert!',
            bio: faker.lorem.words(10),
            updatedUsername: faker.name.firstName() + `${randomNumber}`,
            updatedPassword: 'updated12345Qwert!',
            updatedEmail: 'test1' + `${randomNumber}` + '@mail.com'
          };
        },
        generateAnotherUser() {
          const randomNumber = Math.ceil(Math.random(1000) * 1000);
          return {
            username: faker.name.firstName().toLowerCase() + randomNumber,
            bio: faker.lorem.words(10),
            email: faker.internet.email().toLowerCase(),
            password: '12345Abc!'
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
