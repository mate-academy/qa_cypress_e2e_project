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
            username: faker.name.firstName() + `${randomNumber}`,
            email: 'test' + `${randomNumber}` + '@mail.com',
            password: '12345Qwert!',
            newUsername: faker.name.firstName() + `${randomNumber}`,
            newEmail: 'new'+`${randomNumber}`+'@mail.com',
            newPassword: '!12345Qwert',
            bio: faker.lorem.words()
          };
        },
        generateArticle() {
          return {
            title: faker.lorem.word(),
            description: faker.lorem.words(),
            body: faker.lorem.words(),
            tag: faker.lorem.word(),
            newTitle: 'new' + faker.lorem.word(),
            newDescription: 'new' + faker.lorem.words(),
            newBody: 'new' + faker.lorem.words(),
            newTag: 'new' + faker.lorem.word(),
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
