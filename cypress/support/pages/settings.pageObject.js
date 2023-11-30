import PageObject from '../PageObject';

class SettingsPageObject extends PageObject {
  url = '#/settings';

  get usernameField() {
    return cy.getByDataQa('username-field');
  }

  get userBioField() {
    return cy.getByDataQa('user-bio-field');
  }

  get emailField() {
    return cy.getByDataQa('email-field');
  }

  get newPasswordField() {
    return cy.getByDataQa('new-password-field');
  }

  get updateSettingsBtn() {
    return cy.getByDataQa('update-settings-btn');
  }

  get logoutBtn() {
    return cy.getByDataQa('logout-btn');
  }

  checkUserBanner(username) {
    this.bannerUser.should('contain', username);
  }

  typeUsername(username) {
    this.usernameField.type('{selectAll}' + username);
  }
  
  typeBio(bio) {
    this.userBioField.type('{selectAll}' + bio);
  }

  typeEmail(email) {
    this.emailField.type('{selectAll}' + email);
  }

  typePassword(password) {
    this.newPasswordField.type(password);
  }

  clickUpdateSettingsBtn() {
    this.updateSettingsBtn.click();
  }

  clickLogoutBtn() {
    this.logoutBtn.click();
  }

  assertEmailField(email) {
    this.emailField
      .should('have.value', email);
  }
}

export default SettingsPageObject;
