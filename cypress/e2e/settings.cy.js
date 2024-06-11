/// <reference types='cypress' />
/// <reference types='../support' />
const faker = require('faker');

describe('Settings page', () => {
  let user;
  let newPassword;

  beforeEach(() => {
    cy.task('db:clear');

    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
      return cy.registerUser(user.username, user.email, user.password);
    }).then(() => {
      return cy.signIn(user.email, user.password);
    }).then(() => {
      newPassword = cy.generatePassword();
      cy.log(`Generated password: ${newPassword}`);
    });
  });

  it('should provide an ability to update username', () => {
    const newUsername = 'Halo';

    cy.contains('Settings').click();

    cy.get('input[placeholder="Your username"]').clear().type(newUsername);
    cy.contains('Update Settings').click();
    cy.get('.swal-modal').should('be.visible').contains('Update successful!');
  });

  it('should provide an ability to update bio', () => {
    const newBio = 'New bio is running out';

    cy.contains('Settings').click();

    cy.get('textarea[placeholder="Short bio about you"]').clear().type(newBio);
    cy.contains('Update Settings').click();
    cy.get('.swal-modal').should('be.visible').contains('Update successful!');
  });

  it('should provide an ability to update an email', () => {
    const newEmail = 'Halo111!!!222@gmail.com';

    cy.contains('Settings').click();

    cy.get('input[placeholder="Email"]').clear().type(newEmail);
    cy.contains('Update Settings').click();
    cy.get('.swal-modal').should('be.visible').contains('Update successful!');
  });

  it('should provide an ability to update password', () => {
    const newPassword = 'Asdfg!asdfg1';

      cy.contains('Settings').click();

      cy.get('input[placeholder="Password"]').clear().type(String(newPassword)); 
      cy.contains('Update Settings').click();
      cy.get('.swal-modal').should('be.visible').contains('Update successful!');
    });
  

  it('should provide an ability to log out', () => {
    cy.contains('Settings').click();
    cy.contains('Or click here to logout.').click();
    cy.url().should('include', '');
  });
});