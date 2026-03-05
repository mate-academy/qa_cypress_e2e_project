/// <reference types="cypress" />
/// <reference types="../support" />

import { faker } from '@faker-js/faker';
import SignUpPage from '../support/pages/signUp.pageObject.js';
import PageObject from '../support/pages/PageObject.js';

describe('Sign Up Functionality', () => {
  const commonPage = new PageObject();

  beforeEach(() => {
    cy.task('db:clear');
    SignUpPage.visit();
  });

  context('Positive Scenarios', () => {
    it('should allow a user to sign up with valid credentials', () => {
      const username = faker.internet.userName();
      const email = faker.internet.email();
      const password = 'Password123!';

      SignUpPage.fillRegisterForm(username, email, password);
      SignUpPage.submitRegisterForm();

      cy.get('.swal-title').should('contain', 'Welcome!');
      cy.url().should('not.include', '/register');
      commonPage.getProfileLink().should('contain', username);
    });
  });

  context('Negative Scenarios', () => {
    it('should not allow a user to sign up with existing email', () => {
      const existingUsername = faker.internet.userName();
      const existingEmail = faker.internet.email();
      const existingPassword = 'Password123!';

      cy.registerAndLogin(existingEmail, existingPassword, existingUsername);

      SignUpPage.visit();

      const newUsername = faker.internet.userName();
      const newPassword = 'Password456!';

      SignUpPage.fillRegisterForm(newUsername, existingEmail, newPassword);
      SignUpPage.submitRegisterForm();

      cy.get('.swal-title').should('be.visible')
        .and('contain', 'Registration failed');
      cy.url().should('include', '/register');
    });

    it('should not allow a user to sign up with weak password', () => {
      const username = faker.internet.userName();
      const email = faker.internet.email();
      const weakPassword = '123';

      SignUpPage.fillRegisterForm(username, email, weakPassword);
      SignUpPage.submitRegisterForm();

      cy.get('.swal-title').should('be.visible')
        .and('contain', 'Registration failed');
      cy.url().should('include', '/register');
    });

    it('should not allow a user to sign up with empty fields', () => {
      SignUpPage.submitRegisterForm();

      cy.get('.swal-title').should('be.visible')
        .and('contain', 'Registration failed');
      cy.url().should('include', '/register');
    });
  });
});
