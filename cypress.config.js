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
          const randomNumber = Math.ceil(Math.random(1000) * 1000);
          const username = faker.person.firstName() + `${randomNumber}`;
          return {
            username,
            email: 'test' + username + '@mail.com',
            password: '12345Qwert!',
            wrongEmail: 'wrong' + username + '@mail.com',
            wrongPassword: '12345Qwerts!'
          };
        },
        generateUpdatedSettings() {
          return {
            newUsername: faker.person.firstName().toLowerCase() + 'test',
            newBio: faker.lorem.sentence(),
            newEmail: faker.internet.email().toLowerCase(),
            newPassword: faker.internet.password({ length: 10, prefix: 'Te!1' })
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
