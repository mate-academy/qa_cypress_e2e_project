import PageObject from '../PageObject';

class SettingsUserPageObject extends PageObject {
  url = '/#/settings';

  editUsername() {
    cy.get(':nth-child(3) > .nav-link').click();
    cy.findByPlaceholder('Your username').clear();
    cy.findByPlaceholder('Your username').type('Riootttt');
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(5000);
    cy.get('form > :nth-child(1) > .btn').click();
  }

  assertSuccesfulEdit() {
    cy.get('.swal-title').should('contain', 'Update successful!');
    cy.get('.swal-button').click();
  }

  editBio() {
    cy.get(':nth-child(3) > .nav-link').click();
    cy.findByPlaceholder('Short bio about you').type('editBioooooooo');
    cy.get('form > :nth-child(1) > .btn').click();
  }

  editEmail(email) {
    cy.get(':nth-child(3) > .nav-link').click();
    cy.findByPlaceholder('Email').clear().type('Riottt@gmail.com');
    cy.get('form > :nth-child(1) > .btn').click();
  }

  editPassword(password) {
    cy.get(':nth-child(3) > .nav-link').click();
    cy.findByPlaceholder('Password').type('PlazmaSh0k!');
    cy.get('form > :nth-child(1) > .btn').click();
  }
}
export default SettingsUserPageObject;
