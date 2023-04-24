/// <reference types="cypress" />
/// <reference types="../support" />

import { generateData } from "../support/generateData";

describe('Sign Up page', () => {
   beforeEach(() => {
      cy.task('db:clear');
      cy.visit('/');
   });

   const { username, email, password } = generateData();
   const failedRegistration = 'Registration failed!';

   it('should register with valid data', () => {
      const successRegistration = 'Your registration was successful!';

      cy.getByDataQa('signUp-link').click();
      cy.findByPlaceholder('Username').type(username);
      cy.findByPlaceholder('Email').type(email);
      cy.findByPlaceholder('Password').type(password);
      cy.getByDataQa('signUp-btn').click();
      cy.get('.swal-text').should('contain.text', successRegistration);
      cy.contains('OK').click();
      cy.getByDataQa('username-link').should('contain.text', username);
   });

   it('should not register with taken email', () => {
      cy.request('POST', '/users', {
         email,
         username,
         password
      });
      const errorMsg = 'Email already taken.';
      cy.getByDataQa('signUp-link').click();
      cy.findByPlaceholder('Username').type(username);
      cy.findByPlaceholder('Email').type(email);
      cy.findByPlaceholder('Password').type(password);
      cy.getByDataQa('signUp-btn').click();
      cy.get('.swal-title').should('contain.text', failedRegistration);
      cy.get('.swal-text').should('contain.text', errorMsg);
   });

   it('should not register with empty email field', () => {
      const errorMsg = 'Email field required.';
      cy.getByDataQa('signUp-link').click();
      cy.findByPlaceholder('Username').type(username);
      cy.findByPlaceholder('Password').type(password);
      cy.getByDataQa('signUp-btn').click();
      cy.get('.swal-title').should('contain.text', failedRegistration);
      cy.get('.swal-text').should('contain.text', errorMsg);
   });

   it('should not register with empty username field', () => {
      const errorMsg = 'Username field required.';
      cy.getByDataQa('signUp-link').click();
      cy.findByPlaceholder('Email').type(email);
      cy.findByPlaceholder('Password').type(password);
      cy.getByDataQa('signUp-btn').click();
      cy.get('.swal-title').should('contain.text', failedRegistration);
      cy.get('.swal-text').should('contain.text', errorMsg);
   });

   it('should not register with empty password field', () => {
      const errorMsg = 'Password field required.';
      cy.getByDataQa('signUp-link').click();
      cy.findByPlaceholder('Username').type(username);
      cy.findByPlaceholder('Email').type(email);
      cy.getByDataQa('signUp-btn').click();
      cy.get('.swal-title').should('contain.text', failedRegistration);
      cy.get('.swal-text').should('contain.text', errorMsg);
   });
});
