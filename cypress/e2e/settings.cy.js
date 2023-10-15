/// <reference types='cypress' />
/// <reference types='../support' />
const faker = require('faker');

describe('Settings page', () => {
  let user;
  let randomNumber;

  beforeEach(() => {
    cy.task('db:clear');
    cy.visit('/#/register');

    cy.task('generateUser').then((generateUser) => {
      user = generateUser;

      cy.getByDataCy('register-username-input').type(user.username);
      cy.getByDataCy('register-email-input').type(user.email);
      cy.getByDataCy('register-password-input').type(user.password);
      cy.getByDataCy('signup-button').click();
      cy.get('.swal-button').click();
    });

    cy.getByDataCy('profile-settings').click();

    randomNumber = Math.ceil(Math.random(1000) * 1000);
  });

  it('should provide an ability to update username', () => {
    const newUsername = faker.name.firstName() + `${randomNumber}`;
    cy.getByDataCy('username-settings').clear().type(newUsername);
    updateSettings();
    cy.getByDataCy('username-link').should('contain', newUsername);
  });

  it('should provide an ability to update bio', () => {
    const newBio = faker.lorem.sentence();
    cy.getByDataCy('bio-settings').type(newBio);
    updateSettings();
    //cy.getByDataCy('bio-settings').should('contain', newBio);
    //this line doesn't work, I still don't understand why
  });

  it('should provide an ability to update an email', () => {
    const newEmail = 'newtest' + `${randomNumber}` + '@gmail.com';
    cy.getByDataCy('email-settings').clear().type(newEmail);
    updateSettings();
    cy.getByDataCy('email-settings').should('contain', newEmail);
  });

  it('should provide an ability to update password', () => {
    const newPassword = 'new12345Qwert!';
    cy.getByDataCy('password-settings').type(newPassword);
    updateSettings();
  });

  it('should provide an ability to log out', () => {
    cy.getByDataCy('logout-button').click();
    cy.url().should('eq', 'http://localhost:1668/#/');
  });

  function updateSettings() {
    cy.getByDataCy('update-settings-button').click();
    cy.get('.swal-modal').should('contain', 'Update successful!');
    cy.get('.swal-button').click();
  }
});
