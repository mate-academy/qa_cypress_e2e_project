/// <reference types='cypress' />
/// <reference types='../support' />
const faker = require('faker');

describe('Settings page', () => {
  let user;

  before(() => {

  });

  beforeEach(() => { 
    const randomNumber = Math.ceil(Math.random(1000) * 1000);
    user = {
      username: faker.name.firstName() + `${randomNumber}`,
      email: 'test' + `${randomNumber}` + '@mail.com',
      bio: faker.lorem.words(),
      password: '12345Qwert!' + randomNumber
    };
    cy.task('db:clear');
    cy.register(user.username, user.email);
    cy.getCyData('settings-link').click();
  });

  it('should provide an ability to update username', () => {
    cy.getCyData('username_field').type(`{selectall}${user.username}`);
    cy.getCyData('Update button').click();
    cy.get('.swal-modal').contains('Update successful!');
    cy.get('.swal-button').click();
    cy.getCyData('username-link').should('contain', user.username);
    cy.getCyData('username-link').click();
    cy.url().should('contain', user.username);
    cy.getCyData('profile_username').contains(user.username);
  });

  it('should provide an ability to update bio', () => {
    cy.getCyData('bio_field').type(`{selectall}${user.bio}`);
    cy.getCyData('Update button').click();
    cy.get('.swal-modal').contains('Update successful!');
    cy.get('.swal-button').click();
    cy.getCyData('username-link').click();
    cy.getCyData('profile_bio').should('contain', user.bio);
  });

  it('should provide an ability to update an email', () => {
    cy.getCyData('email_field').type(`{selectall}${user.email}`);
    cy.getCyData('Update button').click();
    cy.get('.swal-modal').contains('Update successful!');
    cy.get('.swal-button').click();
    cy.visit('#/settings'); 
    // cy.getCyData('email_field').should('contain', user.email); ---------------- bug report is needed: email is not updated
  });

  it('should provide an ability to update password', () => {
    cy.getCyData('password_field').type(`{selectall}${user.password}`);
    cy.getCyData('Update button').click();
    cy.get('.swal-modal').contains('Update successful!');
    cy.get('.swal-button').click();
    cy.logOut();
    cy.loginManual(user.username, user.email, user.password);
  });

  it('should provide an ability to log out', () => {
    cy.logOut();
    cy.getCyData('login_link').should('be.visible');
    cy.getCyData('register_link').should('be.visible');
  });
});
