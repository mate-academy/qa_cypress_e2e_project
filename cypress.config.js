const { defineConfig } = require('cypress');
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
          const userName = 'sandra_malin';
          return {
            username: userName.toLowerCase(),
            email: `${userName}${randomNumber}@mail.com`,
            password: '12345Qwert!',
            bio: 'bio'
          };
        },

        generateUser2() {
          const randomNumber = Math.ceil(Math.random(1000) * 1000);
          const userName = 'sandramalin';
          return {
            username: userName.toLowerCase(),
            email: `${userName}${randomNumber}@mail.com`,
            password: '12345Qwert!',
            bio: 'it is a bio'
          };
        },

        generateArticle() {
          return {
            title: 'Hello word!',
            description: 'It is gretting',
            body: 'Hello, friends! What a day today!',
            tag: 'hello'
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
