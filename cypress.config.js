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
          const userName = faker.person.firstName() + `${randomNumber}`;
          return {
            username: userName.toLowerCase(),
            withSpaceName: faker.person.firstName() + ' ' + `${randomNumber}`,
            email: userName + `${randomNumber}` + '@mail.com',
            withotDomainEmail: userName + `${randomNumber}` + 'mail.com',
            withotTextEmail: `${randomNumber}` + '@mail.com',
            password: '12345Qwert!' + `${randomNumber}`,
            smallPassword: '2345Qw!',
            withotNumberPassword: 'Qwertdfg!',
            withotUppercasePassword: '12345wert!' + `${randomNumber}`,
            bio: faker.lorem.word()
          };
        },
        generateArticle() {
          return {
            title: faker.lorem.word(),
            description: faker.lorem.words(),
            body: faker.lorem.words()
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
