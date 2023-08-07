import PageObject from '../PageObject';

class SettingsPageObject extends PageObject {
  url = '/#/settings';

  addNewUsername(username) {
    cy.findByPlaceholder('Your username').clear().type(username);
  }

  addBio(bio) {
    cy.findByPlaceholder('Short bio about you').type(bio);
  }

  addNewEmail(email) {
    cy.findByPlaceholder('Email').clear().type(email);
  }

  addNewPassword(password) {
    cy.findByPlaceholder('Password').clear().type(password);
  }

  assertNewUsername(username) {
    cy.findByPlaceholder('Your username').should('have.value', username);
  }

  assertBio(bio) {
    cy.findByPlaceholder('Short bio about you').should('contain', bio);
  }

  assertNewEmail(email) {
    cy.findByPlaceholder('Email').should('have.value', email);
  }

  clickOnUpdateBtn() {
    cy.contains('.btn', 'Update Settings').click();
  }

  clickOnTheLogoutBtn() {
    cy.contains('.btn', 'Or click here to logout.').click();
  }

  assertSettingsUpdateMsg() {
    cy.get('.swal-modal')
      .should('contain', 'Update successful!');
    cy.get('.swal-button.swal-button--confirm')
      .click();
  }

  clickOnTheOk() {
    cy.get('.swal-button.swal-button--confirm')
      .click();
  }

  assertSuccessfullLogout() {
    cy.get('a')
      .should('contain', 'Sign in')
      .and('contain', 'Sign up');
  }
};

export default SettingsPageObject;
