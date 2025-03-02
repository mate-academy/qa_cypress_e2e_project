import PageObject from '../PageObject';

class SettingsPageObject extends PageObject {
  url = '/settings';

  get usernameField() {
    return cy.getByDataCy('settings-username-field');
  }

  editUsername(username) {
    this.usernameField.clear().type(username);
  }

  get bioField() {
    return cy.getByDataCy('settings-bio-field');
  }

  editBio(bio) {
    this.bioField.clear().type(bio);
  }

  get emailField() {
    return cy.getByDataCy('settings-email-field');
  }

  editEmail(email) {
    this.emailField.clear().type(email);
  }

  get passwordField() {
    return cy.getByDataCy('settings-password-field');
  }

  editPassword(password) {
    this.passwordField.clear().type(password);
  }

  get submitBtn() {
    return cy.getByDataCy('settings-submit-btn');
  }

  submitEdit() {
    this.submitBtn.click();
  }

  get logoutBtn() {
    return cy.getByDataCy('settings-logout-btn');
  }

  logoutUser() {
    this.logoutBtn.click();
  }

  verifyProfilePage(username = 'riot') {
    return cy.url().should('contain', `/profile/${username}`);
  }

  verifyLogout(username = 'riot') {
    return cy.url().should('not.contain', `/profile/${username}`);
  }
}

export default SettingsPageObject;
