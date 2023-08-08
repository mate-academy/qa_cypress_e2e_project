import PageObject from '../PageObject';

class SettingsUserPageObject extends PageObject {
  url = '/#/settings';

  editUsername(username) {
    cy.get(':nth-child(3) > .nav-link').click();
    cy.findByPlaceholder('Your username').clear().type('JohnSilver');
    cy.get('form > :nth-child(1) > .btn').click();
  }

  assertSuccesfulEdit() {
    cy.get('.swal-title').should('contain', 'Update successful!');
    cy.get('.swal-button').click();
  }

  editBio() {
    cy.get(':nth-child(3) > .nav-link').click();
    cy.findByPlaceholder('Short bio about you').type('The coollest guy!');
    cy.get('form > :nth-child(1) > .btn').click();
  }

  editEmail(email) {
    cy.get(':nth-child(3) > .nav-link').click();
    cy.findByPlaceholder('Email').clear().type('adamsmasher@mail.com');
    cy.get('form > :nth-child(1) > .btn').click();
  }

  editPassword(password) {
    cy.get(':nth-child(3) > .nav-link').click();
    cy.findByPlaceholder('Password').type('PlazmaSh0k!');
    cy.get('form > :nth-child(1) > .btn').click();
  }

  assertUserIsLogedout() {
    cy.get(':nth-child(2) > .nav-link').should('contain', 'Sign in');
  }

  assertBioUser() {
    cy.get('p').should('contain', 'The coollest guy!');
  }

  logoutUser() {
    cy.get(':nth-child(3) > .nav-link').click();
    cy.get('.text-xs-center').should('contain', 'Your Settings');
    cy.get('.btn-outline-danger').click();
  }
}

export default SettingsUserPageObject;
