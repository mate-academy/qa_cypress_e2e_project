import PageObject from '../PageObject';

class SettingsPageObject extends PageObject {
  url = '/#/settings';

  get usernameInput() {
    return cy.get('[data-qa=settings-username-input]');
  }

  get bioTextarea() {
    return cy.get('[data-qa=settings-bio-textarea]');
  }

  get emailInput() {
    return cy.get('[data-qa=settings-email-input]');
  }

  get passwordInput() {
    return cy.get('[data-qa=settings-password-input]');
  }

  get updateSettingsBtn() {
    return cy.get('[data-qa=update-settings-button]');
  }

  get logoutBtn() {
    return cy.get('[data-qa=logout-button]');
  }

  typeUsername(username) {
    this.usernameInput.clear().type(username);
  }

  typeBio(bio) {
    this.bioTextarea.clear().type(bio);
  }

  typeEmail(email) {
    this.emailInput.clear().type(email);
  }

  typePassword(password) {
    this.passwordInput.clear().type(password);
  }

  clickUpdateSettingsBtn() {
    this.updateSettingsBtn.click();
  }

  clickLogoutBtn() {
    this.logoutBtn.click();
  }
}

export default SettingsPageObject;
