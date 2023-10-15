/// <reference types='cypress' />
/// <reference types='../support' />

const faker = require('faker');

describe('Settings page', () => {
  beforeEach(() => {
    cy.task('db:clear');
    cy.visit('/#/register');

    let user;
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
      cy.getByDataCy('register-username-input').type(user.username);
      cy.getByDataCy('register-email-input').type(user.email);
      cy.getByDataCy('register-password-input').type(user.password);
      cy.getByDataCy('signup-button').click();
      cy.get('.swal-button').click();
    });

    cy.getByDataCy('profile-settings').click();
  });

  it('should provide an ability to update username', () => {
    const randomNumber = Math.ceil(Math.random() * 1000);
    const newUsername = `${faker.name.firstName()}${randomNumber}`;
    
    cy.getByDataCy('update-username').clear().type(newUsername);
    cy.getByDataCy('update-settings-button').click();
    
    cy.get('.swal-modal')
      .should('contain', 'Update successful!');
    cy.get('.swal-button').click();
    
    cy.getByDataCy('navbar-username').should('contain', newUsername);
  });

  it('should provide an ability to update bio', () => {
    const newBio = faker.lorem.sentence();
    
    cy.getByDataCy('update-bio').type(newBio);
    cy.getByDataCy('update-settings-button').click();
    
    cy.get('.swal-modal')
      .should('contain', 'Update successful!');
    cy.get('.swal-button').click();
  });

  it('should provide an ability to update an email', () => {
    const randomNumber = Math.ceil(Math.random() * 1000);
    const newEmail = `newtest${randomNumber}@gmail.com`;
    
    cy.getByDataCy('update-email').clear().type(newEmail);
    cy.getByDataCy('update-settings-button').click();
    
    cy.get('.swal-modal')
      .should('contain', 'Update successful!');
    cy.get('.swal-button').click();
    
    cy.reload();
    
    cy.getByDataCy('update-email').should('contain', newEmail); //error in Conduit, email cannot be updated
  });

  it('should provide an ability to update password', () => {
    const newPassword = 'SomeNewPasswordwithNUmb1!';
    
    cy.getByDataCy('update-password').type(newPassword);
    cy.getByDataCy('update-settings-button').click();
    
    cy.get('.swal-modal')
      .should('contain', 'Update successful!');
  });

  it('should provide an ability to log out', () => {
    cy.getByDataCy('logout-btn').click();
    cy.url().should('eq', 'http://localhost:1667/#/');
  });
});
