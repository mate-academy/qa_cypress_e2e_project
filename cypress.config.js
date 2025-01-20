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
          const fakeName = faker.name.firstName();
          const username = `${fakeName}${randomNumber}`;
          const email = `${fakeName.toLowerCase()}${randomNumber}@mail.com`;
          const password = '12345Qwert!';
          return {
            username,
            email,
            password
          };
        },
        generateArticle() {
          const tags = Array.from({ length: 3 }, () => faker.lorem.word());
          return {
            title: faker.lorem.word(),
            description: faker.lorem.words(),
            body: faker.lorem.words(),
            tagList: tags
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
