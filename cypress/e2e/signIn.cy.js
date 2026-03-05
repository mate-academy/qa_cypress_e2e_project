/// <reference types="cypress" />
/// <reference types="../../support" />

import { faker } from '@faker-js/faker';
import SignInPage from '../support/pages/signIn.pageObject.js';
import PageObject from '../support/pages/PageObject.js';

describe('Sign In Functionality', () => {
  const commonPage = new PageObject();
  let user;

  beforeEach(() => {
    cy.task('db:clear');
  });

  context('Positive Scenarios', () => {
    beforeEach(() => {
      cy.registerAndLogin().then((loggedInUser) => {
        user = loggedInUser;
      });
      cy.clearCookies();
      SignInPage.visit();
    });

    it('should allow a user to sign in with valid credentials', () => {
      SignInPage.fillLoginForm(user.email, user.password);
      SignInPage.submitLoginForm();

      cy.url().should('not.include', '/login');
      commonPage.getProfileLink().should('contain', user.username);
    });
  });

  context('Negative Scenarios', () => {
    beforeEach(() => {
      SignInPage.visit();
    });

    it('should not allow a user to sign in with invalid credentials', () => {
      const invalidEmail = faker.internet.email();
      const invalidPassword = faker.internet.password();

      SignInPage.fillLoginForm(invalidEmail, invalidPassword);
      SignInPage.submitLoginForm();

      cy.get('.swal-title').should('be.visible')
        .and('contain', 'Login failed');
      cy.url().should('include', '/login');
    });

    it('should not allow a user to sign in with empty credentials', () => {
      SignInPage.submitLoginForm();

      cy.get('.swal-title').should('be.visible')
        .and('contain', 'Login failed');
      cy.url().should('include', '/login');
    });
  });
});
