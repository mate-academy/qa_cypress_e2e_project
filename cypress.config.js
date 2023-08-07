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
            password: 'Vasylteam1!',
            invalidEmail: 'a' + faker.internet.email(),
            invalidPassword: 'Vasylt1m',
            passwordWithoutCapital: 'vasylteam1',
            passwordWithoutLower: 'VASYLTEAM1',
            passwordWith1char: 'V',
            passwordWith7char: 'Vasylt1',
            passwordWithoutNum: 'Vasylter',
            passwordWith16char: 'Vasylteamteamtea1',
            invalidRegEmail: faker.name.firstName(),
            emailWithoutAt: 'andrey123gmail.com',
            emailWithoutTopLvl: 'andrey123@gmail',
            emailWithoutDomain: 'andrey123@.com'
          };
        },
        generateNewUser() {
          const randomNumber = Math.ceil(Math.random(1000) * 1000);
          return {
            username: faker.name.firstName() + `${randomNumber}`,
            email: faker.internet.email(),
            password: 'PraiseTheSun999!',
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
