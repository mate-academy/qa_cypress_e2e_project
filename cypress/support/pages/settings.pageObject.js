import PageObject from '../PageObject';

class SettingsPageObject extends PageObject {
  url = '/#/settings';

  get usernameField() {
    return cy.getByDataCy('settings-username');
  }

  get bioField() {
    return cy.getByDataCy('settings-bio');
  }

  get emailField() {
    return cy.getByDataCy('settings-email');
  }

  get passwordField() {
    return cy.getByDataCy('settings-password');
  }

  get submitBtn() {
    return cy.getByDataCy('settings-upd-btn');
  }

  get logoutBtn() {
    return cy.getByDataCy('settings-logout-btn');
  }

  typeUsername(username) {
    return this.usernameField.clear().type(username);
  }

  typeBio(bio) {
    return this.bioField.clear().type(bio);
  }

  typeEmail(email) {
    return this.emailField.clear().type(email);
  }

  typePassword(password) {
    return this.passwordField.clear().type(password);
  }

  clickSubmitBtn() {
    return this.submitBtn.click();
  }

  clickLogoutBtn() {
    return this.logoutBtn.click();
  }

  updateSettings() {
    this.clickSubmitBtn();
    this.assertSwalContainValidTitle('Update successful!');
    this.clickSwalBtn();
  }

  assertEmailFieldContainUpdatedEmail(email) {
    return this.emailField
      .should('have.value', email);
  }
}

export default SettingsPageObject;
