/// <reference types="cypress" />

import SignUpPageObject from '../support/pages/signUp.pageObject';
import SignInPageObject from '../support/pages/signIn.pageObject';
import { faker } from '@faker-js/faker';

const signUpPage = new SignUpPageObject();
const signInPage = new SignInPageObject();

describe('Sign Up page', () => {
  let user;

  beforeEach(() => {
    cy.task('db:clear');
    user = {
      username: faker.internet.userName(),
      email: faker.internet.email(),
      password: faker.internet.password(8)
    };
  });

  it('should sign up with valid credentials', () => {
    signUpPage.visitPage();
    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail(user.email);
    signUpPage.typePassword(user.password);
    signUpPage.clickSignUpBtn();

    signInPage.typeEmail(user.email);
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();

    cy.contains(user.username).should('be.visible');
  });

  it('should show error for existing email', () => {
    cy.register(user.email, user.username, user.password);

    signUpPage.visitPage();
    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail(user.email);
    signUpPage.typePassword(user.password);
    signUpPage.clickSignUpBtn();

    cy.contains('email has already been taken').should('be.visible');
  });
});
