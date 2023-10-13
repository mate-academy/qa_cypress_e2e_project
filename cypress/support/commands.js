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

import {
  firstTitle,
  firstText,
  secondTitle,
  secondText,
  randomUsername,
  randomPassword,
  randomEmail
} from './../support/testData.js';

Cypress.Commands.add('getByDataCy', (selector) => {
  cy.get(`[data-cy="${selector}"]`);
});
///register
Cypress.Commands.add('register', (email = 'riot@qa.team', username = 'riot', password = '12345Qwert!') => {
  cy.request('POST', '/users', {
    email,
    username,
    password
  });
///article
  Cypress.Commands.add('typeArticleTitle', (text) => {
    cy.get('input[placeholder="Article Title"]').clear().type(text);
  });
  
  
  Cypress.Commands.add('typeArticleContent', (text) => {
    cy.get('textarea[placeholder="Write your article (in markdown)"]').clear().type(text);
  });  

  /// settings

Cypress.Commands.add('updateUsername', (text) => {
  cy.get('a[href="#/settings"]').click();
  cy.get('input.form-control.form-control-lg[placeholder="Your username"]').clear().type(text);
  cy.get('button.btn.btn-lg.btn-primary.pull-xs-right').click();
  cy.get('div.swal-title').should('contain', 'Update successful!');
});  

Cypress.Commands.add('updateBio', (text) => {
  cy.get('a[href="#/settings"]').click();
  cy.get('textarea.form-control.form-control-lg[placeholder="Short bio about you"]').clear().type(text);
  cy.get('button.btn.btn-lg.btn-primary.pull-xs-right').click();
  cy.get('div.swal-title').should('contain', 'Update successful!');
});  

Cypress.Commands.add('updateEmail', (text) => {
  cy.get('a[href="#/settings"]').click();
  cy.get('input.form-control.form-control-lg[placeholder="Email"]').clear().type(text);
  cy.get('button.btn.btn-lg.btn-primary.pull-xs-right').click();
  cy.get('div.swal-title').should('contain', 'Update successful!');
});  

Cypress.Commands.add('updatePassword', (text) => {
  cy.get('a[href="#/settings"]').click();
  cy.get('input.form-control.form-control-lg[placeholder="Password"]').clear().type(text);
  cy.get('button.btn.btn-lg.btn-primary.pull-xs-right').click();
  cy.get('div.swal-title').should('contain', 'Update successful!');
});  

Cypress.Commands.add('logOut', () => {
  cy.get('a[href="#/settings"]').click();
  cy.wait(2000);
  cy.get('.btn.btn-outline-danger').click();
  cy.get('a.nav-link[href="#/register"]').should('exist');
});

/// article
Cypress.Commands.add('createArticle', () => {
    cy.get('a[href="#/editor"]').click();
    cy.get('button.btn.btn-lg.pull-xs-right.btn-primary').as('publishButton');
    cy.typeArticleTitle(firstTitle);
    cy.typeArticleContent(firstText);
    cy.get('@publishButton').should('be.visible').click();
    cy.get('h1').should('contain', firstTitle);
    cy.get('p').should('contain', firstText);
  });  
  
  Cypress.Commands.add('editArticle', () => {
    cy.get('.container > .article-meta > :nth-child(3) > .btn-outline-secondary').as('editButton');
    cy.get('@editButton').click()
    cy.typeArticleTitle(secondTitle);
    cy.typeArticleContent(secondText);
    cy.get('@publishButton').should('be.visible').click();
    cy.get('h1').should('contain', secondTitle);
    cy.get('p').should('contain', secondText);
  });  

Cypress.Commands.add('signUp', () => {
  cy.visit('/#/register');
  cy.get('input[placeholder="Email"]').type(randomEmail);
  cy.get('input[placeholder="Username"]').type(randomUsername);
  cy.get('input[placeholder="Password"]').type(randomPassword);
  cy.get('button.btn-primary').click();
  cy.wait(2000);
  cy.get('.swal-title').should('have.text', 'Welcome!');
});  
});