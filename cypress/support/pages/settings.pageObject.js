import PageObject from '../PageObject';

class SettingsPageObject extends PageObject {
  url = '/#/settings';

  enterNewUsername(username) {
    cy.findByPlaceholder('Your username').clear().type(username);
  }

  enterBio(bio) {
    cy.findByPlaceholder('Short bio about you').type(bio);
  }

  enterNewEmail(email) {
    cy.findByPlaceholder('Email').clear().type(email);
  }

  enterNewPassword(password) {
    cy.findByPlaceholder('Password').clear().type(password);
  }

  clickOnUpdateBtn() {
    cy.contains('.btn', 'Update Settings').click();
  }

  clickOnLogoutBtn() {
    cy.contains('.btn', 'Or click here to logout.').click();
  }

  assertNewUsername(username) {
    cy.findByPlaceholder('Your username').should('have.value', username);
  }

  assertBio(bio) {
    cy.get('p').should('contain', bio);
  }

  assertNewEmail(email) {
    cy.findByPlaceholder('Email').should('have.value', email);
  }

  assertUpdatedSettings() {
    cy.get('.swal-modal').should('contain', 'Update successful!');
  }

  assertLogout() {
    cy.get('a').should('contain', 'Sign in').and('contain', 'Sign up');
  }
};

export default SettingsPageObject;
