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
        generateData() {
          const randomNumber = Math.ceil(Math.random() * 100000);
          function generateRandomWord(length) {
            const characters =
              'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
            let randomWord = '';
            for (let i = 0; i < length; i++) {
              const randomIndex = Math.floor(Math.random() * characters.length);
              randomWord += characters[randomIndex];
            }
            return randomWord;
          }
          return {
            username: `YuriiMV${randomNumber}${generateRandomWord(5)}`,
            email: `YuriiMV@${generateRandomWord(5)}.${generateRandomWord(3)}`,
            password: `12345Qwer!${generateRandomWord(10)}`,
            title: `Title${randomNumber}`,
            about: `About ${generateRandomWord(15)}`,
            body: `Body ${generateRandomWord(30)}`,
            bio: `Bio ${generateRandomWord(35)}`,
            tag: `Tag${randomNumber}`
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
