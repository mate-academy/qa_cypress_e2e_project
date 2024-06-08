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
            username: faker.person.firstName().toLowerCase() + randomNumber,
            email: faker.internet.email().toLowerCase(),
            password: 'K123456$k',
            bio: faker.lorem.words(10)
          };
        },
        generateAnotherUser() {
          const randomNumber = Math.ceil(Math.random(1000) * 1000);
          return {
            username: faker.person.firstName().toLowerCase() + randomNumber,
            email: faker.internet.email().toLowerCase(),
            password: 'K123456$k'
          };
        },
        generateArticle() {
          return {
            title: faker.lorem.word(4),
            description: faker.lorem.words(),
            body: faker.lorem.words(25),
            tag: faker.lorem.word(1)
          };
        },
        generateArticleNew() {
          return {
            title_new: faker.lorem.word(4),
            description_new: faker.lorem.words(),
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
