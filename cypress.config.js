const { defineConfig } = require('cypress');
const { faker } = require('@faker-js/faker');
const { clear } = require('./server/db');

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

          const userName = `${faker.name
            .firstName()
            .replace(/[^\w]+/g, '')
            .toLowerCase()}${randomNumber}`;

          return {
            username: userName,
            email: `${userName}@mail.com`,
            password: '12345Qwert!'
          };
        },
        generateArticle() {
          return {
            title: faker.lorem.words(),
            description: faker.lorem.words(),
            body: faker.lorem.paragraph(),
            tags: faker.lorem.words({ min: 2, max: 10 }).split(' ')
          };
        },
        'db:clear'() {
          clear();

          return null;
        }
      });
      addMatchImageSnapshotPlugin(on, config);
    }
  }
});
