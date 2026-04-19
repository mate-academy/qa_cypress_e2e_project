const { defineConfig } = require('cypress');
const { faker } = require('@faker-js/faker');
const { clear } = require('./server/db');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:1667',
    setupNodeEvents(on, config) {
      on('task', {
        generateUser() {
          const randomNumber = Math.ceil(Math.random() * 1000);
          const userName = `${faker.person.firstName()
            .replace(/[^\w]+/g, '')
            .toLowerCase()}${randomNumber}`;

          return {
            username: userName,
            email: `${userName}@mail.com`,
            password: '12345Qwert!'
          };
        },
        generateArticle() {
          return {
            title: faker.lorem.words(),
            description: faker.lorem.words(),
            body: faker.lorem.paragraph(),
            tags: faker.lorem.words(
              faker.number.int({ min: 2, max: 5 })
            ).split(' ')
          };
        },
        'db:clear'() {
          return clear();
        }
      });
    }
  }
});
