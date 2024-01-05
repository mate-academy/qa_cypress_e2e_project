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

  get bioTextarea() {
    return cy.getByDataCy('bio');
  }

  get updateSettingsBtn() {
    return cy.getByDataCy('update-btn');
  }

  typeBio(bio) {
    this.bioTextarea.type(bio);
  }

  clickUpdateBtn() {
    this.updateSettingsBtn.click();
  }
}

export default SettingsPageObject;
