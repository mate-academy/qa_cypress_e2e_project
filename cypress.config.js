const { defineConfig } = require('cypress');
const faker = require('@faker-js/faker');
const { clear } = require('./server/db');
const { seed } = require('./server/db');
const {
  addMatchImageSnapshotPlugin
} = require('cypress-image-snapshot/plugin');

module.exports = defineConfig({
  video: true,
  e2e: {
    baseUrl: 'http://localhost:1667/',
    setupNodeEvents(on, config) {
      on('task', {
        generateUser() {
          const randomNumber = Math.ceil(Math.random(1000) * 1000);
          return {
            username: faker.name.firstName() + `${randomNumber}`,
            email: 'test' + `${randomNumber}` + '@mail.com',
            password: '12345Qwert!',
            passwordSevenChar: 'P@ssw0r',
            passwordWithoutNumber: 'P@s$word',
            passwordWithoutUpperLetter: 'p@ssw0rd',
            updatedBio: faker.lorem.words(10),
            updatedEmail: faker.internet.email(),
            updatedPassword: faker.internet.password()
          };
        },
        generateSecondUser() {
          const randomNumber = Math.ceil(Math.random(1000) * 1000);
          return {
            username: faker.name.firstName() + `${randomNumber}`,
            email: faker.internet.email(),
            password: faker.internet.password()
          };
        },
        generateArticle() {
          return {
            title: faker.lorem.word(),
            updatedTitle: faker.lorem.words(),
            description: faker.lorem.words(),
            body: faker.lorem.paragraphs(2),
            bodySevenWords: faker.lorem.words(7),
            updatedBodySevenWords: faker.lorem.words(),
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
