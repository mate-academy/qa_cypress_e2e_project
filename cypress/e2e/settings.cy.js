/// <reference types="cypress" />
/// <reference types="../support" />

import { generateData } from "../support/generateData";



describe('Settings page', () => {

   let user

   beforeEach(() => {
      cy.task('db:clear');
      cy.task('generateUser').then(generateUser => {
         user = generateUser;
      });
      cy.login(user)
      cy.visit('/#/settings');
   });

   const successMsg = 'Update successful!';

   it('should provide an ability to update username', () => {
      const { username } = generateData();

      cy.getByDataQa('username-field-settings').type(username);
      cy.getByDataQa('update-btn').click();
      cy.get('.swal-title').should('have.text', successMsg);
      cy.get('.swal-button').click();
      cy.getByDataQa('username-link').should('contain', username);
   });

   it('should provide an ability to update bio', () => {
      const newBio = 'Hello World!';

      cy.getByDataQa('bio-field-settings').type(newBio);
      cy.getByDataQa('update-btn').click();
      cy.get('.swal-title').should('have.text', successMsg);
      cy.get('.swal-button').click();
      cy.getByDataQa('username-link').click();
      cy.get('p').should('have.text', newBio);
   });

   // Bug. After successful message, the previous email returns
   it.skip('should provide an ability to update an email', () => {
      const newEmail = 'newemail@gmail.com';
      cy.getByDataQa('email-field-settings').clear();
      cy.getByDataQa('email-field-settings').type(newEmail);
      cy.getByDataQa('update-btn').click();
      cy.get('.swal-title').should('have.text', successMsg);
      cy.get('.swal-button').click();
      cy.getByDataQa('email-field-settings').should('have.text', newEmail);
   });

   it('should provide an ability to update password', () => {
      const newPasword = 'Conduit123!';

      cy.getByDataQa('password-field-settings').type(newPasword);
      cy.getByDataQa('update-btn').click();
      cy.get('.swal-title').should('have.text', successMsg);
      cy.get('.swal-button').click();

      cy.reload().clearCookies();

      cy.visit('/#/login');
      cy.getByDataQa('email-sign-in').type(user.email);
      cy.getByDataQa('password-sign-in').type(newPasword);
      cy.getByDataQa('sign-in-btn').click();
   });

   it('should provide an ability to log out', () => {
      cy.getByDataQa('logout-btn').click();
      cy.url().should('equal', 'http://localhost:1667/#/')
      cy.getByDataQa('username-link').should('not.exist');
   });
});
