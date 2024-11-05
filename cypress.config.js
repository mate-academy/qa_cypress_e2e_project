const { defineConfig } = require('cypress');
const { faker } = require('@faker-js/faker');
const {
  addMatchImageSnapshotPlugin
} = require('cypress-image-snapshot/plugin');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://conduit.mate.academy/',
    setupNodeEvents(on, config) {
      on('task', {
        generateUser() {
          const randomNumber = Math.ceil(Math.random(1000) * 1000);
          const userName = 'Coala' + `${randomNumber}`;
          return {
            username: userName.toLowerCase(),
            email: 'test' + `${randomNumber}` + '@mail.com',
            password: '12345Qwert!'
          };
        },
        generateArticle() {
          return {
            title: faker.lorem.words(5),
            description: faker.lorem.sentence(),
            body: faker.lorem.paragraph(),
            tag: faker.lorem.word()
          };
        }
      });
      addMatchImageSnapshotPlugin(on, config);
    }
  }
});
