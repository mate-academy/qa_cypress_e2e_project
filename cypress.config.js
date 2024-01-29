const { defineConfig } = require('cypress');
const faker = require('faker');
const { clear } = require('./server/db');
const { seed } = require('./server/db');
const {
  addMatchImageSnapshotPlugin
} = require('cypress-image-snapshot/plugin');

module.exports = defineConfig({
  e2e: {
    viewportHeight: 1100,
    viewportWidth: 1320,
    baseUrl: 'http://localhost:1667/',
    setupNodeEvents(on, config) {
      on('task', {
        generateUser() {
          const randomNumber = Math.ceil(Math.random(1000) * 1000);
          const userName = faker.name.firstName() + `${randomNumber}`;
          const usernameDraft = randomNumber + faker.name.lastName();
          return {
            username: userName.toLowerCase(),
            email: 'cool' + `${randomNumber}` + '@mail.com',
            password: 'Cooljob!' + randomNumber,
            invalidEmail: 'cool' + `${randomNumber}` + '@',
            invalidPassword: faker.random.word(),
            newEmail: 'wrong' + `${randomNumber}` + '@mail.com',
            newPassword: 'bad.' + randomNumber,
            updateUsername: usernameDraft.toLowerCase(),
            bio: faker.lorem.words(),
            updatedEmail: faker.internet.email(),
            updatedPassword: randomNumber + 'Newpass!'
          };
        },
        generateArticle() {
          return {
            title: faker.lorem.word(),
            description: faker.lorem.words(),
            body: faker.lorem.words(),
            tag: faker.lorem.word(),
            updatedTitle: faker.name.firstName(),
            updatedDescription: faker.lorem.words(7),
            updatedBody: faker.lorem.words(12)
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
