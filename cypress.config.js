const { defineConfig } = require('cypress');
const { faker } = require('@faker-js/faker');
const { clear } = require('./server/db');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://127.0.0.1:8080/',
    setupNodeEvents(on, config) {
      on('task', {
        generateUser() {
          const suffix = faker.string.alphanumeric(10).toLowerCase();

          return {
            username: `qa_${suffix}`,
            email: `qa_${suffix}@mail.com`,
            password: '12345Qwert!'
          };
        },
        generateArticle() {
          const suffix = faker.string.alphanumeric(8).toLowerCase();

          return {
            title: `article-${suffix}`,
            description: faker.lorem.words(5),
            body: faker.lorem.paragraph(),
            tag: faker.lorem.word()
          };
        },
        'db:clear'() {
          return clear().then(() => null);
        }
      });
      return config;
    }
  }
});
