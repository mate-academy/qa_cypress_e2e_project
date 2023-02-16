/// <reference types="cypress" />
/// <reference types="../support" />

describe('Settings page', () => {
  let user;
  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then(generateUser => {
      user = generateUser;
    });
  });

  it('should provide an ability to update username', () => {
    const newUsername = 'username12345';

    cy.login(user.email, user.username, user.password);
    cy.visit('/#/settings');
    cy.getByDataCy('username')
      .type(`{selectall}{backspace}${newUsername}`);
    cy.getByDataCy('update-btn')
      .click();
    cy.get('.swal-title')
      .should('contain', 'Update successful!');
    cy.get('.swal-button')
      .click();
    cy.getByDataCy('username-link')
      .should('contain', newUsername);
  });

  it('should provide an ability to update bio', () => {
    const newBio = 'new bio about user';
    cy.login(user.email, user.username, user.password);
    cy.visit('/#/settings');
    cy.getByDataCy('bio')
    .type(`${newBio}`);
    cy.getByDataCy('update-btn')
      .click();
    cy.get('.swal-title')
      .should('contain', 'Update successful!');
    cy.get('.swal-button')
      .click();
    cy.get('[data-cy="username-link"]')
      .click();
  });

  it('should provide an ability to update an email', () => {
    const newEmail = 'newEmail@mail.com';

    cy.login(user.email, user.username, user.password);
    cy.visit('/#/settings');
    cy.getByDataCy('email')
      .type(`{selectall}{backspace}${newEmail}`);
    cy.getByDataCy('update-btn')
      .click();
    cy.get('.swal-title')
      .should('contain', 'Update successful!');
    cy.get('.swal-button')
      .click();

    cy.clearCookies();

    cy.visit('/#/login');
    cy.getByDataCy('email-sign-in')
      .type(newEmail);
    cy.getByDataCy('password-sign-in')
      .type(user.password);
    cy.getByDataCy('sign-in-btn')
      .click(); //a user is not able to sign in with new email. Error message is appeared "Invalid user credentials."
  });

  it('should provide an ability to update password', () => {
    const newPassword = 'New12345!';

    cy.login(user.email, user.username, user.password);
    cy.visit('/#/settings');
    cy.getByDataCy('password')
      .type(`${newPassword}`);
    cy.getByDataCy('update-btn')
      .click();
    cy.get('.swal-title')
      .should('contain', 'Update successful!');
    cy.get('.swal-button')
      .click();

    cy.clearCookies();

    cy.visit('/#/login');
    cy.getByDataCy('email-sign-in')
      .type(user.email);
    cy.getByDataCy('password-sign-in')
      .type(newPassword);
    cy.getByDataCy('sign-in-btn')
      .click();
  });

  it('should provide an ability to log out', () => {
    cy.login(user.email, user.username, user.password);
    cy.visit('/#/settings');
    cy.getByDataCy('logout-link')
      .click();
    cy.get('.banner')
      .matchImageSnapshot();
  });
});
