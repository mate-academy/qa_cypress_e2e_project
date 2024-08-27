const { defineConfig } = require('cypress');
// const faker = require('@faker-js/faker');
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
            username: 'test' + `${randomNumber}`,
            email: 'test' + `${randomNumber}` + '@gmail.com',
            password: '12345Qwert!'
          };
        },
        generateUser2() {
          const randomNumber = Math.ceil(Math.random() * 1000);
          return {
            username: 'anotherUser' + `${randomNumber}`,
            email: 'anotherUser' + `${randomNumber}` + '@gmail.com',
            password: '12345Qwert!'
          };
        },
        generateArticle() {
          const randomNumber = Math.ceil(Math.random() * 1000);
          return {
            title: 'test' + `${randomNumber}`,
            description: 'test' + `${randomNumber}`,
            body: 'test' + `${randomNumber}`,
            tag: 'test' + `${randomNumber}`
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
