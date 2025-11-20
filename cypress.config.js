const { defineConfig } = require('cypress');
const { faker } = require('@faker-js/faker');
const { clear } = require('./server/db');
const { seed } = require('./server/db');
const {
  addMatchImageSnapshotPlugin
} = require('cypress-image-snapshot/plugin');

function generateUsername() {
  let name = faker.internet.userName();
  name = name.replace(/[^a-zA-Z0-9]/g, '');
  if (!/^[a-zA-Z]/.test(name)) {
    name = 'a' + name;
  }
  return name.slice(0, 40);
}

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:1667/',
    setupNodeEvents(on, config) {
      on('task', {
        generateUser() {
          const username = generateUsername();
          const password = faker.internet.password(12, true);

          return {
            username: username.toLowerCase(),
            // email: `test_${Math.floor(Math.random() * 100000)}@mail.com`,
            email: faker.internet.email({
              provider: 'mail.com'
            }).toLowerCase(),
            password,
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
    }
  }
});
