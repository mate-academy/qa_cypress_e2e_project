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

  const randomNumber = Math.ceil(Math.random(1000) * 1000);
  const newUsername = faker.name.firstName() + ${randomNumber};
  const newBio = faker.lorem.sentence();
  const newEmail = 'newtest' + ${randomNumber} + '@gmail.com';
  const newPassword = 'NEW12345Qwert!';

  it('should provide an ability to update username', () => {
    cy.getByDataCy('username-settings').clear().type(newUsername);
    cy.getByDataCy('update-settings-button').click();
    cy.get('.swal-modal')
    .should('contain', 'Update successful!');
    cy.get('.swal-button').click();
    cy.getByDataCy('username-link').should('contain', newUsername);
  });

  it('should provide an ability to update bio', () => {
    cy.getByDataCy('bio-settings').type(newBio);
    cy.getByDataCy('update-settings-button').click();
    cy.get('.swal-modal')
    .should('contain', 'Update successful!');
    cy.get('.swal-button').click();
  });

  it('should provide an ability to update an email', () => {
    cy.getByDataCy('email-settings').clear().type(newEmail);
    cy.getByDataCy('update-settings-button').click();
    cy.get('.swal-modal')
    .should('contain', 'Update successful!');
    cy.get('.swal-button').click();
    cy.reload();
    cy.getByDataCy('email-settings').should('contain', newEmail);
  });

  it('should provide an ability to update password', () => {
    cy.getByDataCy('password-settings').type(newPassword);
    cy.getByDataCy('update-settings-button').click();
    cy.get('.swal-modal')
    .should('contain', 'Update successful!');
  });

  it('should provide an ability to log out', () => {
    cy.getByDataCy('logout-button').click();
    cy.url().should('eq', 'http://localhost:1668/#/');
  });
 });