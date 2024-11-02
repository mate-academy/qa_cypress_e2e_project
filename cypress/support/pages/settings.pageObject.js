import PageObject from '../PageObject';

class SettingsPageObject extends PageObject {
  url = '#/settings';
  get profileLink() {
    return cy.getByDataCy('username-link');
  }

  get usernameField() {
    return cy.getByDataCy('username-settings');
  }

  get bioField() {
    return cy.getByDataCy('bio-settings');
  }

  get emailField() {
    return cy.getByDataCy('email-settings');
  }

  get passwordField() {
    return cy.getByDataCy('password-settings');
  }

  get submitBtn() {
    return cy.getByDataCy('submit-btn');
  }

  get logoutBtn() {
    return cy.getByDataCy('logout-btn');
  }

  clickProfileLink() {
    this.profileLink.click();
  }

  assertProfilePage(username = 'riot') {
    return cy.url().should('contain', `/profile/${username}`);
  }

  typeUsername(username) {
    this.usernameField.clear().type(username);
  }

  typePassword(password) {
    this.passwordField.type(password);
  }

  typeEmail(email) {
    this.emailField.clear().type(email);
  }

  typeBio(bio) {
    this.bioField.type(bio);
  }

  submitForm() {
    this.submitBtn.click();
  }

  logout() {
    this.logoutBtn.click();
  }
}

export default SettingsPageObject;
