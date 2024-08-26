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
          const randomNumber = Math.ceil(Math.random() * 1000);
          return {
            username: faker.person.firstName() + randomNumber,
            email: faker.internet.email().toLowerCase(),
            password: '12345Qwert!',
            usernameNew: faker.person.firstName() + randomNumber,
            emailNew: faker.internet.email().toLowerCase(),
            passwordNew: `12345Qwert!${randomNumber}`
          };
        },
        generateArticle() {
          return {
            title: faker.lorem.word(),
            description: faker.lorem.words(),
            body: faker.lorem.words(),
            tag: faker.lorem.word(),
            titleNew: faker.lorem.word(),
            descriptionNew: faker.lorem.words(),
            bodyNew: faker.lorem.words()
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
