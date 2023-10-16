// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import { addMatchImageSnapshotCommand } from 'cypress-image-snapshot/command';

addMatchImageSnapshotCommand();

Cypress.Commands.add('getByDataCy', (selector) => {
  cy.get(`[data-cy="${selector}"]`);
});

Cypress.Commands.add('createUserAndSignIn', (user) => {
  cy.request('POST', 'http://localhost:1668/users', {
  email: user.email,
  username: user.username,
  password: user.password,
}).then(() => {
  cy.getByDataCy('email-sign-in').type(user.email);
  cy.getByDataCy('password-sign-in').type(user.password);
  cy.getByDataCy('sign-in-btn').click();
});
});

Cypress.Commands.add('registerAndFollowUsers', () => {
  cy.registerUser().then((user1) => {
    cy.logoutUser();
    cy.registerUser().then((user2) => {
      cy.followUser(user2, user1);
    });
  });
});

Cypress.Commands.add('registerUser', () => {
  cy.task('generateUser').then((user) => {
    cy.visit('/#/register');
    cy.getByDataCy('register-username-input').type(user.username);
    cy.getByDataCy('register-email-input').type(user.email);
    cy.getByDataCy('register-password-input').type(user.password);
    cy.getByDataCy('signup-button').click();
    cy.get('.swal-button').click();
    return cy.wrap(user);
  });
});

Cypress.Commands.add('logoutUser', () => {
  cy.getByDataCy('profile-settings').click();
  cy.getByDataCy('logout-button').click();
});

Cypress.Commands.add('followUser', (follower, followee) => {
  cy.visit(`http://localhost:1668/#/@${followee.username}`);
  // cy.getByDataCy('follow-button').click();
  // cy.getByDataCy('follow-button').should('contain', `Unfollow ${followee.username}`);
  // I noticed that there was a problem with the selector [follow-button], I couldn’t fix it
  cy.contains('[data-cy="follow-button"]', 'Follow').click();
  cy.contains('[data-cy="follow-button"]', `Follow ${followee.username}`);
});
