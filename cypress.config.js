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
    viewportHeight: 1200,
    viewportWeight: 1920,
    setupNodeEvents(on, config) {
      on('task', {
        generateUser() {
          const randomNumber = Math.ceil(Math.random(1000) * 1000);
          return {
            username: faker.name.firstName() + `${randomNumber}`,
            email: faker.internet.email(),
            password: 'AnnaMahda1!',
            invalidEmail: 'a' + faker.internet.email(),
            invalidPassword: 'Annamh1m',
            passwordWithoutCapital: 'annamahda1',
            passwordWithoutLower: 'ANNAMAHDA1',
            passwordWith1char: 'A',
            passwordWith7char: 'Annamh1',
            passwordWithoutNum: 'Annamhda',
            passwordWith16char: 'Annamahdateamqa1',
            invalidRegEmail: faker.name.firstName(),
            emailWithoutAt: 'anna1234gmail.com',
            emailWithoutTopLvl: 'anna1234@gmail',
            emailWithoutDomain: 'anna1234@.com'
          };
        },
        generateNewUser() {
          const randomNumber = Math.ceil(Math.random(1000) * 1000);
          return {
            username: faker.name.firstName() + `${randomNumber}`,
            email: faker.internet.email(),
            password: 'Annamahda123s!',
            bio: faker.lorem.words()
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
