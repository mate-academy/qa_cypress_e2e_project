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
          return {
            username: faker.person.firstName() + randomNumber,
            email: faker.internet.email().toLowerCase(),
            password: '12345Qwert!',
            bio: faker.lorem.words(10)
          };
        },
        generateUser2() {
          const randomNumber = Math.ceil(Math.random(1000) * 1000);
          return {
            username: faker.person.firstName() + randomNumber,
            email: faker.internet.email().toLowerCase(),
            password: '12345Qwert!'

          };
        },
        generateArticle() {
          return {
            title: faker.lorem.word(5),
            description: faker.lorem.words(10),
            body: faker.lorem.words(25),
            tag: faker.lorem.word(1)
          };
        },
        generateArticleNew() {
          return {
            title_new: faker.lorem.word(5),
            description_new: faker.lorem.words(10),
            body_new: faker.lorem.words(25),
            tag_new: faker.lorem.word(1)
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
