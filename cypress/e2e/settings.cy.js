/// <reference types='cypress' />
/// <reference types='../support' />
// const faker = require('faker');

describe('Settings page', () => {
  it('should provide an ability to update username', () => {
    cy.createUser().then(() => {
      const user = Cypress.env('user');
      cy.visit('/user/login');
      cy.get('input[type="email"]').type(user.email);
      cy.get('input[type="password"]').type('password123');
      cy.get('button[type="submit"]').click();
      cy.contains('Settings').click();
      // eslint-disable-next-line cypress/unsafe-to-chain-command
      cy.get('input[placeholder="Username"]').clear().type('newusername');
      cy.contains('Update Settings').click();
    });
  });

  it('should provide an ability to update bio', () => {
    cy.createUser().then(() => {
      const user = Cypress.env('user');
      cy.visit('/user/login');
      cy.get('input[type="email"]').type(user.email);
      cy.get('input[type="password"]').type('password123');
      cy.get('button[type="submit"]').click();
      cy.contains('Settings').click();
      // eslint-disable-next-line cypress/unsafe-to-chain-command
      cy.get('textarea[placeholder="Short bio about you"]')
        .clear().type('newbio.');
      cy.contains('Update Settings').click();
    });
  });

  it('should provide an ability to update an email', () => {
    cy.createUser().then(() => {
      const user = Cypress.env('user');
      cy.visit('/user/login');
      cy.get('input[type="email"]').type(user.email);
      cy.get('input[type="password"]').type('password123');
      cy.get('button[type="submit"]').click();
      cy.contains('Settings').click();
      // eslint-disable-next-line cypress/unsafe-to-chain-command
      cy.get('input[placeholder="Email"]')
        .clear().type('newemail@gmail.com');
      cy.contains('Update Settings').click();
    });
  });

  it('should provide an ability to update password', () => {
    cy.createUser().then(() => {
      const user = Cypress.env('user');
      cy.visit('/user/login');
      cy.get('input[type="email"]').type(user.email);
      cy.get('input[type="password"]').type('password123');
      cy.get('button[type="submit"]').click();
      cy.contains('Settings').click();
      // eslint-disable-next-line cypress/unsafe-to-chain-command
      cy.get('input[placeholder="New Password"]')
        .clear().type('newpassword123');
      cy.contains('Update Settings').click();
    });
  });

  it('should provide an ability to log out', () => {
    cy.createUser().then(() => {
      const user = Cypress.env('user');
      cy.visit('/user/login');
      cy.get('input[type="email"]').type(user.email);
      cy.get('input[type="password"]').type('password123');
      cy.get('button[type="submit"]').click();
      cy.contains('Settings').click();
      cy.contains('Or click here to logout.').click();
    });
  });
});
