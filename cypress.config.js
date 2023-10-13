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
        settingsData() {
          return {
            bio: 'New bio information',
            newEmail: 'test@qa.team',
            newPassword: 'Test1234!',
            email: 'riot@qa.team',
            username: 'riot',
          };
        },
        signInData() {
          return {
            notExistEmail: 'test@gmail.com',
            notExistPassword: 'Qatest12',
            passwordRequiredMessage: 'Password field required.',
            emailRequiredMessage: 'Email field required.',
            invalidCredentialsMessage: 'Invalid user credentials.',
          };
        },
        signUpData() {
          return {
            emailWithoutAt: 'testgmail.com',
            emailWithoutDot: 'test@gmailcom',
            existEmail: 'riot@qa.team',
            passwordSevenLenght: 'Test123',
            passwordWithoutCapital: 'test1234',
            passwordWithoutSmall: 'TEST1234',
            passwordWithoutNumber: 'Testqaqa',
            passwordValidMessage: 'Password must be 8 characters long and include 1 number, 1 uppercase letter, and 1 lowercase letter.',
            usernameRequiredMessage: 'Username field required.',
            emailRequiredMessage: 'Email field required.',
            passwordRequiredMessage: 'Password field required.',
            emailValidMessage: 'Email must be a valid email.',
            emailTakenMessage: 'Email already taken.',
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
