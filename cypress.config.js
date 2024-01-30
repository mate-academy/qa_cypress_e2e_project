const { defineConfig } = require('cypress');
const faker = require('faker');
const { clear } = require('./server/db');
const { seed } = require('./server/db');
const {
  addMatchImageSnapshotPlugin
} = require('cypress-image-snapshot/plugin');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:1667/#/',
    setupNodeEvents(on, config) {
      on('task', {
        generateUser() {
          const randomNumber = Math.ceil(Math.random(1000) * 1000);
          const userName = faker.name.firstName() + `${randomNumber}`;
          const newUsername = 'new' + faker.name.firstName() + `${randomNumber}`;
          return {
            username: userName.toLowerCase(),
            email: userName.toLowerCase() + '@mail.com',
            password: '12345Qwert!',
            newUsername: newUsername.toLowerCase(),
            newEmail: newUsername.toLowerCase() + '@mail.com',
            wrongEmail: newUsername.toLowerCase() + 'mail.com',
            bio: faker.lorem.words(),
            newPassword: 'Qwert!12345',
            fakePassword: '12345qwert',
            wrongPassword: '1234qwer'
          };
        },
        generateArticle() {
          return {
            title: faker.lorem.word(),
            description: faker.lorem.words(),
            body: faker.lorem.words(),
            tag: faker.lorem.word(),
            newTitle: faker.lorem.word(),
            newDescription: faker.lorem.words(),
            newBody: faker.lorem.words(),
            newTag: faker.lorem.word()
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
