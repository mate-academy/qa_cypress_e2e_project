const { defineConfig } = require('cypress');
const faker = require('faker');
const { clear } = require('./server/db');
const { seed } = require('./server/db');
const {
  addMatchImageSnapshotPlugin
} = require('cypress-image-snapshot/plugin');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:1667',
    viewportWidth: 1300,
    viewportHeight: 900,
    setupNodeEvents(on, config) {
      on('task', {
        generateUser() {
          const randomNumber = Math.ceil(Math.random(1000) * 1000);
          return {
            username: faker.name.firstName() + `${randomNumber}`,
            email: 'test' + `${randomNumber}` + '@gmail.com',
            password: '12345Qwert!',

            newUserName: faker.name.firstName() + `${randomNumber}`,
            newBio: faker.lorem.lines(),
            newEmail: 'updatedtest' + `${randomNumber}` + '@gmail.com',
            newPassword: 'nataNata123!',
            invalidEmail: 'natanata' + `${randomNumber}` + '@',
            invalidPassword: faker.random.word()
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
