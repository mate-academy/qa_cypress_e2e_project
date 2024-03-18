/// <reference types='cypress' />
/// <reference types='../support' />

import SignUpPageObject from '../support/pages/signUp.pageObject';
import faker from 'faker';

const signUpPage = new SignUpPageObject();

describe('Sign Up page', () => {
  before(() => {
    cy.task('db:clear');
  });

  it('should register user with valid credentials', () => {
    const username = faker.internet.userName();
    const email = faker.internet.email();
    const password = faker.internet.password();

    signUpPage.visit();
    signUpPage.typeUsername(username);
    signUpPage.typeEmail(email);
    signUpPage.typePassword(password);
    signUpPage.clickSignUpButton();
    // Add assertions for successful registration
  });

  it('should not register user with existing credentials', () => {
    // Generate user with existing credentials
    cy.task('generateUser').then((user) => {
      signUpPage.visit();
      signUpPage.typeUsername(user.username);
      signUpPage.typeEmail(user.email);
      signUpPage.typePassword(user.password);
      signUpPage.clickSignUpButton();
      // Add assertions for unsuccessful registration
    });
  });

  it('should not register user with invalid credentials', () => {
    const username = faker.internet.userName();
    const email = faker.internet.email();

    signUpPage.visit();
    signUpPage.typeUsername(username);
    signUpPage.typeEmail(email);
    signUpPage.typePassword('short'); // Use an invalid password
    signUpPage.clickSignUpButton();
    // Add assertions for unsuccessful registration
  });
});
