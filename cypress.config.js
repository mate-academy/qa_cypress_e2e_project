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
          const randomNumber = Math.ceil(Math.random(1000) * 1000);
          return {
            username: faker.person.firstName().toLowerCase() + `${randomNumber}`,
            email: faker.internet.email().toLowerCase(),
            password: '12345Qwert!',
            wrongEmail: 'wrong@ukr.net',
            wrongPassword: 'Qwer!123',
            notValidPassword: '123456',
            notValidEmail: 'broken@email',
            subscriberUsername: `sub228${faker.person.firstName().toLowerCase()}`,
            subscriberEmail: faker.internet.email().toLowerCase()
          };
        },

        generateUpdateData() {
          const userName = faker.person.firstName() + '_update';
          const newEmail = faker.internet.email();
          return {
            username: userName.toLowerCase(),
            bio: faker.lorem.sentence(),
            email: newEmail.toLowerCase(),
            password: 'newPassword1!'
          };
        },

        generateArticle() {
          return {
            title: faker.lorem.word(),
            description: faker.lorem.words(),
            body: faker.lorem.sentences(3),
            tags: faker.lorem.words(),
            editTitle: `new ${faker.lorem.word()}`,
            editDescription: `new ${faker.lorem.words()}`,
            editBody: `new ${faker.lorem.sentences(3)}`,
            editTags: `new ${faker.lorem.words()}`
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
