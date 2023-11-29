/// <reference types='cypress' />
/// <reference types='../support' />
const faker = require("faker");

describe('Settings page', () => {
  let user; 

  beforeEach(() => {
    cy.task('db:clear')
    cy.task('generateUser').then(generateUser => {
      user = generateUser;
       });
  });

  it('should provide an ability to update username', () => {
    const newUsername = faker.name.firstName().toLowerCase();
    const sucUpdateTitle = 'Update successful!';

    cy.login(user.email, user.username, user.password);
    cy.visit('/#/settings');
    cy.getByDataCy('username-field')
      .type(newUsername);
    cy.getByDataCy('update-btn')
      .click();

    cy.get('.swal-title')
      .should('have.text', sucUpdateTitle);

    cy.get('.swal-button')
      .contains('OK')
      .click();

    cy.getByDataCy('username-link')
      .should('contain', newUsername);



});

  it('should provide an ability to update bio', () => {
    const newBio = faker.lorem.words();
    const sucUpdateTitle = 'Update successful!';
    cy.login(user.email, user.username, user.password);
    cy.visit('/#/settings');
    cy.getByDataCy('bio-field')
      .type(newBio);
    cy.getByDataCy('update-btn')
      .click();

    cy.get('.swal-title')
      .should('have.text', sucUpdateTitle);
  });

  it('should provide an ability to update an email', () => {
    const randomNumber = Math.ceil(Math.random(1000) * 1000);
    const newEmail = faker.name.firstName() + `${randomNumber}` + '@mail.com'.toLowerCase();
    const sucUpdateTitle = 'Update successful!';
    

    cy.login(user.email, user.username, user.password);
    cy.visit('/#/settings');
    cy.getByDataCy('email-field')
      .clear()
      .type(newEmail);
    cy.getByDataCy('update-btn')
      .click();

    cy.get('.swal-title')
      .should('have.text', sucUpdateTitle);
  });

  it('should provide an ability to update password', () => {
    const newPassword = '123!Qwerty';
    const sucUpdateTitle = 'Update successful!';

    cy.login(user.email, user.username, user.password);
    cy.visit('/#/settings');
    cy.getByDataCy('password-field')
      .type(newPassword);
    cy.getByDataCy('update-btn')
      .click();

    cy.get('.swal-title')
      .should('have.text', sucUpdateTitle);
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
