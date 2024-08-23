import PageObject from '../PageObject';

class UserInformationPageObject extends PageObject {
  url = '#/settings/';

  get usernameField () {
    return cy.getByDataQa('username-settings-field');
  }

  get emailField () {
    return cy.getByDataQa('email-settings-field');
  }

  get bioField () {
    return cy.getByDataQa('bio-settings-field');
  }

  get newPasswordField () {
    return cy.getByDataQa('password-settings-field');
  }

  get logoutBtn() {
    return cy.getByDataQa('logout-btn');
  }

  typeUsername(username) {
    this.usernameField.clear();
    this.usernameField.type(username, { force: true });
  }

  typeEmail(email) {
    this.emailField.clear();
    this.emailField.type(email, { force: true });
  }

  typeBio(bio) {
    this.bioField.clear();
    this.bioField.type(bio, { force: true });
  }

  typeNewPassword(newPassword) {
    this.newPasswordField.clear();
    this.newPasswordField.type(newPassword, { force: true });
  }

  clickOnUpdateSettingsBtn() {
    cy.getByDataQa('update-settings-btn');
  }

  clickOnLogoutBtn() {
    this.logoutBtn.click();
  }

  verifyUsername(expectedUsername) {
    this.usernameField.should('have.value', expectedUsername);
  }

  verifyEmail(expectedEmail) {
    this.emailField.should('have.value', expectedEmail);
  }

  verifyBio(expectedBio) {
    this.bioField.should('have.value', expectedBio);
  }
}

export default UserInformationPageObject;
