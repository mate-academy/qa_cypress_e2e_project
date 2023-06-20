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
          const userName = faker.name.firstName();
          const newUsername = faker.name.firstName() + '_NEW';
          return {
            username: userName + randomNumber,
            newUsername,
            bio: faker.lorem.words(),
            email: userName + randomNumber + '@mail.com',
            newEmail: newUsername + randomNumber + '@new.mail',
            password: '12345Qwert!',
            newPassword: 'NewPasswordVeryLongAhahahah!!1'
          };
        },
        generateArticle() {
          return {
            title: faker.lorem.word(),
            newTitle: 'ThisIsTheNewArticleTitle!',
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
