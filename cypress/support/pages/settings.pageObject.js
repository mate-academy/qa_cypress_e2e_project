import PageObject from '../PageObject';

class SettingsPageObject extends PageObject {
  url = '#/settings';

  get usernameField() {
    return cy.getByDataCy('username-field');
  }

  get userbioField() {
    return cy.getByDataCy('bio-field');
  }

  get useremailField() {
    return cy.getByDataCy('email-field');
  }

  get userpasswordField() {
    return cy.getByDataCy('password-field');
  }

  clickOnModalOk() {
    cy.get('.swal-button').click();
  }

  assertSuccessfulUpdate(message) {
    cy.get('.swal-title').should('contain', message);
  }

  assertUpdatedUsername(username) {
    cy.getByDataCy('username-link').should('contain', username);
  }

  assertSuccessfulLogOut() {
    cy.get('.banner').matchImageSnapshot();
  }
}

export default SettingsPageObject;
