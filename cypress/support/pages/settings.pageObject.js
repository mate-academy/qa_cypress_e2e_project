import PageObject from '../PageObject';

class SettingsPageObject extends PageObject {
  url = '/#/settings';

  get usernameFieldClear() {
    return cy.getByDataCy('edit-username').clear();
  }

  get emailFieldClear() {
    return cy.getByDataCy('edit-email').clear();
  }

  get passwordField() {
    return cy.getByDataCy('edit-password');
  }

  typeUsername(username) {
    this.usernameFieldClear.type(username);
  }

  typeEmail(email) {
    this.emailFieldClear.type(email);
  }

  typePassword(password) {
    this.passwordField.type(password);
  }

  clickOnButton(dataText) {
    cy.get(`[data-cy="${dataText}"]`).click();
  }
}

export default SettingsPageObject;
