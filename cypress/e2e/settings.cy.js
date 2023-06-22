/// <reference types="cypress" />
/// <reference types="../support" />

describe('Settings page', () => {
  let user;

  beforeEach(() => {
    cy.task('db:clear')
    cy.task('generateUser').then(generateUser => {
      user = generateUser;
    });
  });

  it('should provide an ability to update username', () => {
    const newUsername = 'Newtestuser';
    const succUpdateTitle = 'Update successful!';

    cy.login(user.email, user.username, user.password);
    cy.visit('/#/settings');
    cy.getByDataCy('sett-username-field')
      .type(`{selectall}${newUsername}`);
    cy.getByDataCy('update-btn')
      .click();

    cy.get('.swal-title')
      .should('have.text', succUpdateTitle);
    
    cy.get('.swal-button')
      .contains('OK')
      .click();
    
    cy.getByDataCy('username-link')
      .should('contain', newUsername);
  });

  it('should provide an ability to update bio', () => {
    const newBio = 'New Bio text';
    const succUpdateTitle = 'Update successful!';

    cy.login(user.email, user.username, user.password);
    cy.visit('/#/settings');
    cy.getByDataCy('sett-bio-field')
      .type(newBio);
    cy.getByDataCy('update-btn')
      .click();

    cy.get('.swal-title')
      .should('have.text', succUpdateTitle);
  });

  it('should provide an ability to update an email', () => {
    const newEmail = 'newtestuser@qa.team';
    const succUpdateTitle = 'Update successful!';

    cy.login(user.email, user.username, user.password);
    cy.visit('/#/settings');
    cy.getByDataCy('sett-email-field')
      .type(`{selectall}${newEmail}`);
    cy.getByDataCy('update-btn')
      .click();

    cy.get('.swal-title')
      .should('have.text', succUpdateTitle);
  });

  it('should provide an ability to update password', () => {
    const newPassword = 'Qwerty12!';
    const succUpdateTitle = 'Update successful!';

    cy.login(user.email, user.username, user.password);
    cy.visit('/#/settings');
    cy.getByDataCy('sett-password-field')
      .type(newPassword);
    cy.getByDataCy('update-btn')
      .click();

    cy.get('.swal-title')
      .should('have.text', succUpdateTitle);
  });

  it('should provide an ability to log out', () => {
    cy.login(user.email, user.username, user.password);
    cy.visit('/#/settings');
    cy.getByDataCy('logout-btn')
      .click();

    cy.getByDataCy('sign-up-link')
      .should('exist');
    cy.getByDataCy('sign-in-link')
      .should('exist');
  });
});
