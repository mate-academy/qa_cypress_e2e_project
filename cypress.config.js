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
          const fullName = faker.person.fullName();
          return {
            username: `${fullName}${randomNumber}`,
            email: `test${randomNumber}@mail.com`,
            password: '12345Qwert!',
            username1: `1${fullName}${randomNumber}`,
            email1: `test${randomNumber}@gmail.com`,
            password1: '12345Qwert!',
            bio: faker.lorem.sentence(),
            invalidEmail: `test${randomNumber}mail.com`,
            message: 'Registration failed',
            alert: 'Login failed'
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
