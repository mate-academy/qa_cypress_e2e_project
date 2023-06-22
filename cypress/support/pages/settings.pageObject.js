import PageObject from '../PageObject';

class SettingsPageObject extends PageObject {
  url = '#/settings';

  clickOnModalOk() {
    cy.get('.swal-button').click();
  }

  assertSuccessfulUpdate(message) {
    cy.get('.swal-title').should('contain', message);
  }

  assertUpdatedUsername(username) {
    cy.getByDataQa('username-link').should('contain', username);
  }

  assertSuccessfulLogOut() {
    cy.get('.banner').matchImageSnapshot();
  }
}

export default SettingsPageObject;
