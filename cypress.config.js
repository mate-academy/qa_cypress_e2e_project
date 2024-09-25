/* eslint-disable no-unreachable */
/* eslint-disable indent */
const { defineConfig } = require('cypress');
const { faker } = require('@faker-js/faker');
const { clear } = require('./server/db');
const { allureCypress } = require('allure-cypress/reporter');
// eslint-disable-next-line import/first
// const { seed } = require('./server/db');
// const {
//   addMatchImageSnapshotPlugin
// } = require('cypress-image-snapshot/plugin');

module.exports = defineConfig({
  video: false,
  e2e: {
    baseUrl: 'http://localhost:1667',
    setupNodeEvents(on, config) {
      allureCypress(on, config);
      // eslint-disable-next-line no-sequences
      return config,
        on('task', {
          generateUser() {
            const randomNumber = Math.ceil(Math.random(1000) * 1000);
            return {
              firstUser: faker.internet.userName() + `${randomNumber}`,
              firstEmail: faker.internet.email(),
              username: faker.internet.userName() + `${randomNumber}`,
              email: faker.internet.email(),
              password: '12345Qwert!',
              updateUsername: faker.internet.userName() + `${randomNumber}`,
              updateEmail: faker.lorem.word() + `${randomNumber}` + '@mail.com',
              bio: faker.lorem.word(),
              updatePassword: 'Password6789$'
            };
          },
          generateArticle() {
            return {
              title: faker.lorem.word(),
              editTitle: faker.lorem.word(),
              description: faker.lorem.words(),
              editDescription: faker.lorem.words(),
              body: faker.lorem.words(),
              editBody: faker.lorem.words()
            };
          },
          async 'db:clear'() {
            await clear();

            return null;
          }
          // 'db:seed'() {
          //   seed();

          //   return null;
          // }
        });
      // addMatchImageSnapshotPlugin(on, config);
    }
  }
});
