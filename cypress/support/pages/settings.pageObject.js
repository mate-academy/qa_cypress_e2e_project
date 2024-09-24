import PageObject from "../PageObject";

class SignUpPageObject extends PageObject {
  url = "/#/settings";

  get usernameSettings() {
    return cy.get('[data-qa="settingsUsername"]');
  }

  get emailSettings() {
    return cy.get('[data-qa="settingsEmail"]');
  }

  get passwordSettings() {
    return cy.get('[data-qa="settingsPassword"]');
  }

  get updateSettingsBtn() {
    return cy.getByDataCy('[data-qa="settingsUpdateButton"]');
  }

  get logoutBtn() {
    return cy.getByDataCy('data-qa="logout-button"');
  }

  typeUserName(user) {
    this.usernameSettings.clear().type(username);
  }

  typeBio(bio) {
    this.bioField.clear().type(bio);
  }

  typePassword(password) {
    this.passwordSettings.clear().type(password);
  }

  typeEmail(email) {
    this.emailSettings.clear().type(email);
  }

  clickUpdateBtn() {
    this.updateSettingsBtn.click();
  }

  assertUpdatedBioField(bio) {
    this.bioField.should("have.value", bio);
  }

  clickLogoutBtn() {
    this.logoutBtn.click();
  }

  assertUpdatedEmailField(email) {
    this.emailSettings.should("have.value", email);
  }
}

export default SignUpPageObject;
