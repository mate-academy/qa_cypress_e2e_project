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
          const randomNumber = Math.ceil(Math.random(1000) * 1000);
          return {
            username: faker.name.firstName() + `${randomNumber}`,
            email: faker.internet.email(),
            password: '12345Qwert!',
            wrongEmail: faker.name.lastName(),
            wrongPassword: randomNumber,
            passwordWithoutCapital: 'qatest1',
            passwordWithoutLower: 'QATEST1',
            passwordWith1char: 'Q',
            passwordWith7char: 'Qatest9',
            passwordWithoutNum: 'Qatests',
            passwordWith16char: 'Qatesterengineer',
            emailWithoutDomain: faker.name.lastName() + '.com',
            emailWithoutTopDomain: faker.name.lastName() + '@'
          };
        },
        generateTestUser() {
          const randomNumber = Math.ceil(Math.random(1000) * 1000);
          return {
            username: faker.name.firstName() + `${randomNumber}`,
            email: faker.internet.email(),
            password: 'Qatest123!',
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
        loginUser() {
          return {
            email: 'qatest098@gmail.com',
            password: 'Qatest123!'
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
