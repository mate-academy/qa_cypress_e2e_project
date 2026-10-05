const { defineConfig } = require('cypress');
const { faker } = require('@faker-js/faker');
const { clear } = require('./server/db');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:1667/',
    setupNodeEvents(on) {
      on('task', {
        generateUser() {
          const id = faker.string.uuid().replaceAll('-', '');
          return {
            username: `qa${id}`,
            email: `qa${id}@example.com`,
            password: `Qa1!${faker.string.alphanumeric(12)}`,
            bio: faker.lorem.sentence()
          };
        },
        generateArticle() {
          return {
            title: faker.lorem.words(4),
            description: faker.lorem.sentence(),
            body: faker.lorem.paragraph(),
            tag: faker.lorem.word()
          };
        },
        'db:clear': clear
      });
    }
  }
});
