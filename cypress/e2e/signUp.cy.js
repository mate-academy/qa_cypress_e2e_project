/// <reference types='cypress' />
/// <reference types='../support' />

import SignUpPageObject from '../support/pages/signUp.pageObject';
import HomePageObject from '../support/pages/home.pageObject';
import { faker } from '@faker-js/faker';

const signUpPage = new SignUpPageObject();
const homePage = new HomePageObject();

describe('Sign Up Page', () => {
  let user;

  before(() => {
    cy.task('db:clear'); // Ensure a clean database state before tests

    // Create 'anotherUser' if needed for your tests
    cy.request('POST', '/api/users', {
      username: 'anotherUser',
      email: 'anotherUser@example.com',
      password: 'AnotherUserPass123'
    });

    cy.login('testuser', 'TestPassword123'); // Ensure user is logged in
  });

  beforeEach(() => {
    user = {
      username: faker.internet.userName(),
      email: faker.internet.email(),
      password: faker.internet.password({ length: 12, memorable: true })
    };
    signUpPage.visit();
  });

  it('should register a user with valid credentials', () => {
    signUpPage.signUp(user);
    homePage.assertUserLoggedIn(user.username);
  });

  it('should prevent registration with an already taken email', () => {
    // Register the user first
    signUpPage.signUp(user);
    homePage.assertUserLoggedIn(user.username);

    // Log out to return to the sign-up page
    homePage.logout(); // Make sure this method exists and works

    // Attempt to register again with the same email
    signUpPage.signUp(user);
    signUpPage.assertErrorMessage('Email already in use');
  });

  it('should prevent registration with a weak password', () => {
    signUpPage.signUp({
      ...user,
      password: '123'
    });
    signUpPage.assertErrorMessage('Password too short');
  });
});
