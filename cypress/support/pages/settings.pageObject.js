import PageObject from '../PageObject';

class SettingsPageObject extends PageObject {
  url = '/#/settings';

  updateUsername(username) {
    cy.getByDataCy('YourUsername-field').clear().type(username);
  }

  clickUpdateSettingsBtn() {
    cy.contains('.btn', 'Update Settings').click();
  }

  assertSuccessfulWindow() {
    cy.get('.swal-modal').should('contain', 'Update successful!');
    cy.get('.swal-button').click();
  }

  assertUpdatedUsername(username) {
    cy.get('[data-cy="username-link"]').should('contain', username);
  }

  updateBio(bio) {
    cy.getByDataCy('userBio-field').clear().type(bio);
  }

  updateEmail(email) {
    cy.getByDataCy('settingsEmail-field').clear().type(email);
  }

  assertUpdatedEmail(email) {
    cy.getByDataCy('settingsEmail-field').should('contain', email);
  }

  updatePassword(password) {
    cy.getByDataCy('settingsPass-field').clear().type(password);
  }

  assertUpdatedPassword(password) {
    cy.getByDataCy('settingsPass-field').should('contain', password);
  }

  clickLogOutBtn() {
    cy.getByDataCy('logoutBtn').click();
  }

  assertSuccessfulLogout() {
    cy.url().should('contain', '/#/');
  }
}

export default SettingsPageObject;
