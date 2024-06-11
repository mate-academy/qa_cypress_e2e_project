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

Cypress.Commands.add('register', (email = 'riot@qa.team', username = 'riot', password = '12345Qwert!') => {
  return cy.request({
    method: 'POST',
    url: '/users',
    body: {
      email,
      username,
      password
    },
    failOnStatusCode: false
  }).then(response => {
    if (response.status === 200 && response.body.user && response.body.user.username === username) {
      return true; 
    } else {
      throw new Error(`Registration failed with status: ${response.status}`);
    }
  });
});


Cypress.Commands.add('generateUsername', (length) => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  let result = '';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
});

Cypress.Commands.add('generateEamil', (length) => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
});

Cypress.Commands.add('generatePassword', () => {
  const uppercaseLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lowercaseLetters = 'abcdefghijklmnopqrstuvwxyz';
  const numbers = '0123456789';

  const firstCharacter = uppercaseLetters.charAt(Math.floor(Math.random() * uppercaseLetters.length));

  const remainingCharacters = Cypress._.random(10000000, 99999999).toString(); 
  const remainingCharactersShuffled = Cypress._.shuffle(remainingCharacters.split('')).join(''); 
  const password = `${firstCharacter}${lowercaseLetters.charAt(Math.floor(Math.random() * lowercaseLetters.length))}${numbers.charAt(Math.floor(Math.random() * numbers.length))}${remainingCharactersShuffled}`;

  return password;
});

Cypress.Commands.add('generateEmail', (length) => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
});

Cypress.Commands.add('signIn', (email, password) => {
  cy.visit('http://localhost:1667/#/login');
  cy.get('[data-cy="email-sign-in"]').type(email, { force: true });
  cy.get('input[placeholder="Password"]').type(password, { force: true });
  cy.get('[data-cy="sign-in-btn"]').click({ force: true });

 
  /*cy.get('.swal-button').contains('OK').click({ force: true });*/
});

Cypress.Commands.add('registerUser', (username, email, password) => {
  cy.visit('http://localhost:1667/#/register');
  cy.get('input[placeholder="Username"]').type(username);
  cy.get('input[placeholder="Email"]').type(email);
  cy.get('input[placeholder="Password"]').type(password);
  cy.get('button.btn-primary').contains('Sign up').click();

  
  cy.get('.swal-button').contains('OK').click({ force: true });

  cy.url().should('include', '/');
});

Cypress.on('uncaught:exception', (err, runnable) => {
  if (err.message.includes('Avoided redundant navigation to current location')) {
    return false;
  }
  return true;
});

Cypress.Commands.add('createArticle', (title, description, body, tag) => {
  cy.request({
    method: 'POST',
    url: '/articles',
    body: {
      article: {
        title,
        description,
        body,
        tagList: [tag]
      }
    },
    failOnStatusCode: false
  });
});