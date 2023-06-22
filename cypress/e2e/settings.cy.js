/// <reference types="cypress" />
/// <reference types="../support" />

const faker = require("faker");

describe('Settings page', () => {
  beforeEach(() => {
    cy.task('db:clear');
    cy.registerNewUser().then(user => {
      cy.login(user).then(() => user);
    }).as('user');

    cy.visit('#/settings')
  });

  it('should provide an ability to update username', () => {
    const newUsername = faker.internet.userName();
    cy.get('@user').then(user => {
      cy.getByDataCy('username-settings')
        .clear().type(newUsername);
        cy.getByDataCy('update-settings').click();
      cy.contains('.swal-modal', 'Update successful!').should('exist');
    });
  });

  it('should provide an ability to update bio', () => {
    const bio = faker.lorem.sentence();

    cy.get('@user').then(user => {
      cy.getByDataCy('bio-settings').type(bio);
      cy.getByDataCy('update-settings').click();
      cy.contains('.swal-modal', 'Update successful!').should('exist');
    });
  });

  it('should provide an ability to update an email', () => {
      const newEmail = faker.internet.email().toLowerCase();
  
      cy.get('@user').then(user => {
        cy.getByDataCy('email-settings').clear().type(newEmail);
        cy.getByDataCy('update-settings').click();
        cy.contains('.swal-modal', 'Update successful!').should('exist');
      });
  });

  it('should provide an ability to update password', () => {
    const newPassword = 'ChangedPassword1!'

    cy.get('@user').then(user => {
      cy.getByDataCy('password-settings').type(newPassword);
      cy.getByDataCy('update-settings').click();
      cy.contains('.swal-modal', 'Update successful!').should('exist');
    });
  });

  it('should provide an ability to log out', () => {
    cy.getByDataCy('logout-settings').click();
    cy.url('/#/');
    cy.getByDataCy('sign-in-home').should('exist');
  });
  });

