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
          return {
            username: faker.name.firstName() + `${randomNumber}`,
            email: 'test' + `${randomNumber}` + '@mail.com',
            password: '12345Qwert!'
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

      on('before:browser:launch', (browser = {}, launchOptions) => {
        // Chrome is used by default for `cypress open`
        // Electron is used for `cypress run` but the command line flags are modified by ELECTRON_EXTRA_LAUNCH_ARGS environment variable
        if (browser.name === 'chrome') {
          // exposes window.gc() function that will manually force garbage collection
          launchOptions.args.push('--js-flags=--expose-gc');
        }

        return launchOptions;
      });
    }
  }
});
