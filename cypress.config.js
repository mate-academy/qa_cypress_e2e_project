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
    viewportWidth: 1280,
    viewportHeight: 720,
    defaultCommandTimeout: 10000,
    requestTimeout: 10000,
    responseTimeout: 60000,
    video: true,
    videoCompression: 32,
    videoUploadOnPasses: false,
    retries: {
      runMode: 1,
      openMode: 0
    },
    screenshotOnRunFailure: true,
    trashAssetsBeforeRuns: true,
    setupNodeEvents(on, config) {
      on('before:browser:launch', (browser = {}, launchOptions) => {
        if (browser.name === 'chrome') {
          launchOptions.args.push('--disable-dev-shm-usage');
          return launchOptions;
        }
        return launchOptions;
      });

      on('task', {
        generateUser() {
          const randomNumber = Math.ceil(Math.random(1000) * 1000);
          return {
            username: faker.person.firstName() + `${randomNumber}`,
            email: faker.internet.email(),
            password: faker.internet.password({ length: 12, memorable: false, pattern: /[A-Z]/, prefix: 'Aa1!' }),
            bio: faker.lorem.sentence()
          };
        },
        generateArticle() {
          return {
            title: faker.lorem.words(3),
            description: faker.lorem.sentence(),
            body: faker.lorem.paragraphs(2, '\n\n'),
            tagList: [faker.lorem.word(), faker.lorem.word()]
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
      return config;
    }
  },
  env: {
    apiUrl: 'http://localhost:1667/api',
    user: {
      email: 'test@example.com',
      password: 'password123',
      username: 'testuser'
    },
    snapshotOnly: true
  }
});
