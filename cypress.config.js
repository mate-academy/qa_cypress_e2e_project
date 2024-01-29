const { defineConfig } = require('cypress');
const faker = require('faker');
const { clear } = require('./server/db');
const { seed } = require('./server/db');
module.exports = defineConfig({
  e2e: {
    viewportHeight: 900,
    viewportWidth: 1300,
    baseUrl: 'http://localhost:1667/#/',
    setupNodeEvents(on, config) {
      on('task', {
        generateUser() {
          const randomNumber = Math.ceil(Math.random() * 1000);
          return {
            username: faker.name.firstName() + `${randomNumber}`,
            email: faker.name.firstName() + `${randomNumber}` + '@mail.com',
            password: '12345Qwert!',
            newEmail: 'newem' + `${randomNumber}` + '@gmail.com',
            newUsername: faker.name.firstName().toLowerCase(),
            newPassword: 'Qwerty123!',
            invalidEmail: 'test' + `${randomNumber}` + 'mail.com',
            invalidPassword: '01234'
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
    }
  }
});
