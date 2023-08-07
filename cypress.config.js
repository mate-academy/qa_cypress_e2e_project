const { defineConfig } = require('cypress');
const faker = require('faker');
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
            username: faker.name.firstName() + `${randomNumber}`,
            email: 'test' + `${randomNumber}` + '@mail.com',
            password: '12345Qwert!'
          };
        },
        generateUser2() {
          const randomNumber = Math.ceil(Math.random() * 1000);
          return {
            username: faker.name.firstName() + `${randomNumber}`,
            email: 'user2name' + `${randomNumber}` + '@qa.com',
            password: '12345Qwert!'
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
        },
        'registerUser1'(email, username, password) {
          const randomNumber = Math.ceil(Math.random() * 1000);
          return {
            username: username + `${randomNumber}`,
            email: email + `${randomNumber}` + '@qa.com',
            password: password + 1
          };
        },
        'registerUser2'(email, username, password) {
          const randomNumber = Math.ceil(Math.random() * 1000);
          return {
            username: username + `${randomNumber}`,
            email: email + `${randomNumber}` + '@qa.com',
            password: password + 2
          };
        }
      });
      addMatchImageSnapshotPlugin(on, config);
    }
  }
});
