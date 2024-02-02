/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/// <reference types='cypress' />
/// <reference types='../support' />

describe('Settings page', () => {
  let user;
  let newpassword;
  before(() => {
    cy.task('db:clear');
  });

  beforeEach(() => {
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
      cy.register(user.email, user.username, user.password);
    });
  });

  it('should provide an ability to update username', () => {
    cy.visit('/');
    cy.get('[data-cy="headerSignIn-link"]').click();
    cy.get('[data-cy="email-sign-in"]').type(user.email);
    cy.get('[data-cy="password-sign-in"]').type(user.password);
    cy.get('[data-cy="sign-in-btn"]').click();
    cy.get('[data-cy="settings-link"]').click();
    cy.get('[data-cy="settingsUsername-field"]').clear().type('neon111');
    cy.get('[data-cy="settingsUpdate-button"]').click();
    cy.get('.swal-modal').should('exist');
    cy.get('.swal-modal')
      .should('contain', 'Update successful!');
    cy.get('.swal-button').should('have.text', 'OK');
    cy.get('.swal-button').click();
    cy.get('[data-cy="username-link"]').should('contain', 'neon111');
  });

  it('should provide an ability to update bio', () => {
    cy.visit('/');
    cy.get('[data-cy="headerSignIn-link"]').click();
    cy.get('[data-cy="email-sign-in"]').type(user.email);
    cy.get('[data-cy="password-sign-in"]').type(user.password);
    cy.get('[data-cy="sign-in-btn"]').click();
    cy.get('[data-cy="settings-link"]').click();
    cy.get('[data-cy="settingsBio-field"]').clear().type('challenge');
    cy.get('[data-cy="settingsUpdate-button"]').click();
    cy.get('.swal-modal').should('exist');
    cy.get('.swal-modal')
      .should('contain', 'Update successful!');
    cy.get('.swal-button').should('have.text', 'OK');
    cy.get('.swal-button').click();
    cy.get('[data-cy="username-link"]').click();
    cy.get('[data-cy="userBio"]')
      .should('contain', 'challenge');
  });

  it('should provide an ability to update an email', () => {
    const newemail = 'neon555@neon.com';
    cy.visit('/');
    cy.get('[data-cy="headerSignIn-link"]').click();
    cy.get('[data-cy="email-sign-in"]').type(user.email);
    cy.get('[data-cy="password-sign-in"]').type(user.password);
    cy.get('[data-cy="sign-in-btn"]').click();
    cy.get('[data-cy="settings-link"]').click();
    cy.get('[data-cy="settingsEmail-field"]').clear().type(newemail);
    cy.get('[data-cy="settingsUpdate-button"]').click();
    cy.get('.swal-modal').should('exist');
    cy.get('.swal-modal')
      .should('contain', 'Update successful!');
    cy.get('.swal-button').should('have.text', 'OK');
    cy.get('.swal-button').click();
    cy.get('[data-cy="settingsEmail-field"]')
      .should('contain', newemail);
  });

  it('should provide an ability to update password', () => {
    cy.visit('/');
    cy.get('[data-cy="headerSignIn-link"]').click();
    cy.get('[data-cy="email-sign-in"]').type(user.email);
    cy.get('[data-cy="password-sign-in"]').type(user.password);
    cy.get('[data-cy="sign-in-btn"]').click();
    cy.get('[data-cy="settings-link"]').click();
    cy.get('[data-cy="settingsPassword-field"]').clear().type(user.newpassword);
    cy.get('[data-cy="settingsUpdate-button"]').click();
    cy.get('.swal-modal').should('exist');
    cy.get('.swal-modal')
      .should('contain', 'Update successful!');
    cy.get('.swal-button').should('have.text', 'OK');
    cy.get('.swal-button').click();
    cy.clearAllCookies();
    cy.login(user.email, user.username, user.newpassword);
    cy.visit('/#/settings');
    cy.reload();
    cy.get('[data-cy="username-link"]')
      .should('contain', user.username);
  });

  it('should provide an ability to log out', () => {
    cy.visit('/');
    cy.get('[data-cy="headerSignIn-link"]').click();
    cy.get('[data-cy="email-sign-in"]').type(user.email);
    cy.get('[data-cy="password-sign-in"]').type(user.password);
    cy.get('[data-cy="sign-in-btn"]').click();
    cy.get('[data-cy="settings-link"]').click();
    cy.get('[data-cy="username-link"]').should('contain', user.username);
    cy.get('[data-cy="settingsLogOut-button"]').click();
    cy.get('[data-cy="headerSignIn-link"]').should('be.visible');
  });
});
