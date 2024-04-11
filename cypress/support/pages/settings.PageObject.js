import PageObject from '../PageObject';

class SettingsPageObject extends PageObject {
  url = '/#/settings';

  updateUsername(username) {
    cy.getByPlaceholder('Your username').clear().type(username);
  }

  updateBio(bio) {
    cy.getByPlaceholder('Short bio about you').type(bio);
  }

  updateEmail(email) {
    cy.getByPlaceholder('Email').clear().type(email);
  }

  updatePassword(password) {
    cy.getByPlaceholder('Password').clear().type(password);
  }

  clickUpdateSettingsBtn() {
    cy.contains('.btn', 'Update Settings').click();
  }

  assertUpdateSuccessful() {
    cy.get('.swal-modal').should('contain', 'Update successful!');
    cy.get('.swal-button').click();
  }

  assertUpdatedUsername(username) {
    cy.get('[data-cy="username-link"]').should('contain', username);
  }

  assertSuccessfullLoginWithNewEmail(email, password, username) {
    cy.contains('.btn', 'Or click here to logout.').click();
    cy.get('[href="#/login"]').click();
    cy.getByPlaceholder('Email').type(email);
    cy.getByPlaceholder('Password').type(password);
    cy.contains('.btn', 'Sign in').click();
    cy.get('[data-cy="username-link"]').should('contain', username);
  }

  assertSuccessfullLoginWithNewPassword(email, password) {
    cy.contains('.btn', 'Or click here to logout.').click();
    cy.get('[href="#/login"]').click();
    cy.getByPlaceholder('Email').type(email);
    cy.getByPlaceholder('Password').type(password);
    cy.contains('.btn', 'Sign in').click();
    cy.url().should('contain', '/#/');
  }

  clickLogoutBtn() {
    cy.contains('.btn', 'Or click here to logout.').click();
  }

  assertSuccessfulLogout() {
    cy.url().should('contain', '/#/');
  }
}
export default SettingsPageObject;
