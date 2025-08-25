/// <reference types="cypress" />
import SignUpPageObject from '../support/pages/signUp.pageObject';
import { faker } from '@faker-js/faker';

const signUpPage = new SignUpPageObject();

describe('Sign Up page', () => {
  let userData;

  beforeEach(() => {
    cy.task('db:clear');
    signUpPage.visit();

    userData = {
      username: faker.internet.userName(),
      email: faker.internet.email(),
      password: 'Pass12345!'
    };
  });

  it('should register a new user successfully', () => {
    signUpPage.typeUsername(userData.username);
    signUpPage.typeEmail(userData.email);
    signUpPage.typePassword(userData.password);
    signUpPage.clickSignUp();

    signUpPage.assertSignedUp(userData.username);
  });

  it('should show errors for invalid registration', () => {
    signUpPage.typeUsername('TestUser');
    signUpPage.typeEmail('invalid-email');
    signUpPage.typePassword('123');
    signUpPage.clickSignUp();

    signUpPage.assertErrorContains('email must be a valid email');
    signUpPage.assertErrorContains('password is too short');
  });
});
