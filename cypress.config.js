/// <reference types='@shelex/cypress-allure-plugin' />
const { defineConfig } = require('cypress');
const faker = require('faker');
const { clear } = require('./server/db');
const { seed } = require('./server/db');
const allureWriter = require('@shelex/cypress-allure-plugin/writer');
const {
  addMatchImageSnapshotPlugin
} = require('cypress-image-snapshot/plugin');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:1667/',
    defaultCommandTimeout: 5000,
    viewportHeight: 1080,
    viewportWidth: 1920,
    setupNodeEvents(on, config) {
      on('task', {
        generateUser() {
          return {
            username: faker.name.firstName(),
            email: faker.internet.email().toLowerCase(),
            password: `A!2a${faker.internet.password()}`,
            bio: faker.lorem.words(),
            userImage: 'https://i.imgur.com/S0OPyEk.png'
          };
        },

        generateInvalid() {
          return {
            username: `    `,
            email: `@${faker.internet.email().toLowerCase()}`,
            password: faker.internet.password(7)
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

        async 'db:clear'() {
          await clear();

          return null;
        },

        'db:seed'() {
          seed();

          return null;
        },

        customVariables() {
          return {
            field: {
              username: 'username',
              bio: 'bio',
              email: 'email',
              password: 'password',
              userImageUrl: 'userImageUrl',
              userData: 'userData',
              userImage: 'userImage',
              articleTitle: 'article-title',
              articleDescription: 'article-description',
              articleBody: 'article-body',
              articleTag: 'article-tags',
              articlesList: 'articles-list'
            },
            button: {
              update: 'button-update',
              logout: 'button-logout',
              signUp: 'button-signUp',
              signIn: 'button-signIn',
              publish: 'button-publish',
              editArticle: 'button-articleEdit',
              deleteArticle: 'button-articleDelete',
              follow: 'button-follow',
              unfollow: 'button-unfollow'
            },
            link: {
              haveAnAccount: 'signUp-login',
              needAnAccount: 'signIn-register',
              headerUsername: 'header-username',
              headerSignIn: 'header-signIn',
              headerSignUp: 'header-signUp'
            },
            popup: {
              button: '.swal-button',
              text: '.swal-text'
            },
            url: {
              signIn: '/#/login',
              signUp: '/#/register',
              homePage: '/#/',
              article: '/#/articles/',
              settings: '/#/settings',
              newArticle: '/#/editor',
              user: '/#/@'
            },
            icon: {
              success: '.swal-icon--success',
              fail: '.swal-icon--error'
            }
          };
        },

        websiteText() {
          return {
            signUp: 'Sign up',
            follow: 'Follow',
            unfollow: 'Unfollow',
            userRegistered: 'Your registration was successful!',
            usernameRequired: 'Username field required.',
            emailRequired: 'Email field required.',
            passwordRequired: 'Password field required.',
            invalidEmail: 'Email must be a valid email.',
            invalidPassword: 'Password must be',
            existingUsername: 'Username already taken.',
            existingEmail: 'Email already taken.',
            invalidCredentials: 'Invalid user credentials.',
            noArticles: 'No articles are here... yet.'
          };
        }
      });

      addMatchImageSnapshotPlugin(on, config);

      allureWriter(on, config);
      return config;
    }
  }
});
