import PageObject from '../PageObject';

class SettingsPageObject extends PageObject {
  url = '/#/settings';

  updateUsername(username) {
    cy.findByPlaceholder('Your username').clear().type(username);
  }

  updateBio(bio) {
    cy.findByPlaceholder('Short bio about you').type(bio);
  }

  updateEmail(email) {
    cy.findByPlaceholder('Email').clear().type(email);
  }

  updatePassword(password) {
    cy.findByPlaceholder('Password').type(password);
  }

  clickOnUpdateSettingsBtn() {
    cy.contains('.btn', 'Update Settings').click();
  }

  successfulUpdateMessage() {
    cy.get('.swal-modal').should('contain', 'Update successful!');
    cy.contains('button', 'OK').click();
  }

  clickOnLogOutBtn() {
    cy.contains('.btn', 'Or click here to logout.').click();
  }

  assertLogOut() {
    cy.get('a').should('contain', 'Sign in');
    cy.get('a').should('contain', 'Sign up');
  }
}

export default SettingsPageObject;
