/// <reference types="cypress" />
// / <reference types="../support" />

describe('Settings page', () => {
  let user;

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then(generatedUser => {
      user = generatedUser;
    });
    cy.login();
    cy.visit('/settings');
  });

  it('should provide an ability to update username', () => {
    cy.getByDataCy('user-field-username').clear()
      .type(user.username);
    cy.getByDataCy('user-update-settings-button')
      .click();

    cy.get('.swal-title')
      .should('have.text', 'Update successful!');
    cy.getByDataCy('username-link')
      .should('contain', user.username);
    
  });

  it('should provide an ability to update bio', () => {
    cy.getByDataCy('user-field-bio').clear()
      .type('newBioTheUser');
    cy.getByDataCy('user-update-settings-button')
      .click();

    cy.get('.swal-title')
      .should('have.text', 'Update successful!');  
  });

  it('should provide an ability to update an email', () => {
    cy.getByDataCy('user-field-email').clear()
      .type(user.email);
    cy.getByDataCy('user-update-settings-button')
      .click();

    cy.get('.swal-title')
      .should('have.text', 'Update successful!'); 

  });

  it('should provide an ability to update password', () => {
    let newPassword = 'Test12345!';

    cy.getByDataCy('user-field-password').clear()
      .type(newPassword);
    cy.getByDataCy('user-update-settings-button')
      .click();
    cy.get('.swal-title')
      .should('have.text', 'Update successful!'); 

    cy.reload()
    .clearCookies();

    cy.visit('/login');

    cy.getByDataCy('email-sign-in')
      .type('riot@qa.team');
    cy.getByDataCy('password-sign-in')
      .type(newPassword);
    cy.getByDataCy('sign-in-btn')
      .click();

    cy.getByDataCy('username-link')
      .should('contain', 'riot');
    cy.url()
      .should('include', '/');
  });

  it('should provide an ability to log out', () => {
    cy.getByDataCy('user-logout-button')
      .click();

    cy.url()
      .should('include', '/');
    cy.getByDataCy('sign-in-link')
      .should('be.visible');
    cy.getCookie('drash_sess')
      .should('have.property', 'value', 'null');
  });
});
