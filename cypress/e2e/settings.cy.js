/// <reference types="cypress" />
/// <reference types="../support" />

const faker = require("faker");

describe('Settings page', () => {
  beforeEach(() => {
    cy.registerNewUser().then(user => {
      cy.login(user).then(() => user);
    }).as('user');

    cy.visit('#/settings')
  });

  it(`The Setting page contains filled Username field`, () => {
    cy.get('@user').then(user => {
      cy.findByPlaceholder('Your username')
        .should('have.value', user.username);
    });
  });

  it(`The Setting page contains filled Email field`, () => {
    cy.get('@user').then(user => {
      cy.findByPlaceholder('Email')
        .should('have.value', user.email);
    });
  });

  it('Should provide an ability to update username', () => {
    const newUsername = faker.internet.userName();

    cy.get('@user').then(user => {
      cy.findByPlaceholder('Your username')
        .clear().type(newUsername);
      cy.contains('button', 'Update Settings').click();
      cy.contains('.swal-modal', 'Update successful!').should('exist');
    });
  });

  it('Should provide an ability to update bio', () => {
    const bio = faker.lorem.sentence();

    cy.get('@user').then(user => {
      cy.findByPlaceholder('Short bio about you').type(bio);
      cy.contains('button', 'Update Settings').click();
      cy.contains('.swal-modal', 'Update successful!').should('exist');
    });
  });

  it('Should provide an ability to update an email', () => {
    const newEmail = faker.internet.email().toLowerCase();

    cy.get('@user').then(user => {
      cy.findByPlaceholder('Email').clear().type(newEmail);
      cy.contains('button', 'Update Settings').click();
      cy.contains('.swal-modal', 'Update successful!').should('exist');
    });
  });

  it('Should provide an ability to update password', () => {
    const newPassword = 'testPassword01'

    cy.get('@user').then(user => {
      cy.findByPlaceholder('Password').type(newPassword);
      cy.contains('button', 'Update Settings').click();
      cy.contains('.swal-modal', 'Update successful!').should('exist');
    });
  });

  it('Should provide an ability to log out', () => {
    cy.contains('button', 'Or click here to logout').click();
    cy.url('/#/');
    cy.contains('a', 'Sign in').should('exist');
  });
});
