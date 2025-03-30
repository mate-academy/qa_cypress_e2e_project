import PageObject from '../PageObject';

class settingsPageObject extends PageObject {
  url = '#/settings';

  clickSettings() {
    cy.get('[href="#/settings"]')
      .click();
  }

  updateUsername(username) {
    cy.findByPlaceholder('Your username')
      .clear()
      .type(username);
  }

  updateBio(bio) {
    cy.findByPlaceholder('Short bio about you')
      .type(bio);
  }

  updateEmail(email) {
    cy.findByPlaceholder('Email')
      .clear()
      .type(email);
  }

  updatePassword(password) {
    cy.findByPlaceholder('Password')
      .type(password);
  }

  clickSubmitBtn() {
    cy.contains('.btn', 'Update Settings')
      .click();
  }

  clickOkBtn() {
    cy.contains('button', 'OK')
      .click();
  }

  assertSuccessfulUpdate() {
    cy.get('.swal-title')
      .should('contain', 'Update successful!');
  }

  clickLogout() {
    cy.contains('button', 'Or click here to logout.')
      .click();
  };

  assertLogout() {
    cy.get('a')
      .should('contain', 'Sign in');
    cy.get('a')
      .should('contain', 'Sign up');
  }

  assertUsername(username) {
    cy.findByPlaceholder('Your username')
      .should('have.value', username);
  }

  assertEmail(email) {
    cy.findByPlaceholder('Email')
      .should('have.value', email);
  }

  assertBio(bio) {
    cy.findByPlaceholder('Short bio about you')
      .should('have.value', bio);
  }
};

export default settingsPageObject;
