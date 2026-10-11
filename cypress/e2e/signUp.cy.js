/// <reference types="cypress" />

import SignUpPageObject from '../support/pages/signUp.pageObject';
import HomePageObject from '../support/pages/home.pageObject';

const signUpPage = new SignUpPageObject();
const homePage = new HomePageObject();

describe('Sign Up page', () => {
  beforeEach(() => {
    cy.task('db:clear');
  });

  it('should register a new user', () => {
    cy.task('generateUser').then((user) => {
      signUpPage.visit();
      signUpPage.register(user.username, user.email, user.password);

      homePage.assertHeaderContainUsername(user.username);
    });
  });

  it('should reject a duplicate email address', () => {
    cy.task('generateUser').then((user) => {
      cy.register(user.email, user.username, user.password);

      signUpPage.visit();
      signUpPage.register(
        `${user.username}Duplicate`,
        user.email,
        user.password
      );

      cy.contains('Registration failed!').should('be.visible');
    });
  });
});
