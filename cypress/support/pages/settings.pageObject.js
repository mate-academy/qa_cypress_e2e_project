import PageObject from '../PageObject';

class SettingsPageObject extends PageObject {
  url = '/#/settings';

  get usernameField() {
    return cy.getByDataCy('username-settings-field');
  };

  get updateButton() {
    return cy.getByDataCy('update-button');
  };

  get bioField() {
    return cy.getByDataCy('bio-settings-field');
  };

  get profileBio() {
    return cy.getByDataCy('bio-settings-field');
  };

  get profileLink() {
    return cy.getByDataCy('username-link');
  };

  get emailField() {
    return cy.getByDataCy('email-settings-field');
  };

  get settingsPageLink() {
    return cy.getByDataCy('settings-page');
  };

  get passwordField() {
    return cy.getByDataCy('password-settings-field');
  };

  get logoutButton() {
    return cy.getByDataCy('logout-button');
  };

  clearAndTypeUsername(username) {
    this.usernameField.clear().type(username);
  };

  clickUpdateButton() {
    this.updateButton.click();
  };

  assertUrl(url) {
    cy.url().should('include', `/profile/${url}`);
  };

  assertProfileLink(username) {
    this.profileLink.should('contain.text', username);
  };

  clearAndTypeBio(bio) {
    this.bioField.clear().type(bio);
  };

  clearAndTypeEmail(email) {
    this.emailField.clear().type(email);
  };

  clickSettingsLink() {
    this.settingsPageLink.click();
  };

  assertUpdatedEmail(email) {
    this.emailField.should('have.value', email);
  };

  clearAndTypePassword(password) {
    this.passwordField.clear().type(password);
  };

  clickLogoutButton() {
    this.logoutButton.click();
  };

  assertStartUrl() {
    cy.url().should('eq', 'http://localhost:1667/#/');
  };

  assertTokenIsRemoved() {
    cy.getCookie('auth').should('be.null');
  }
};

export default SettingsPageObject;
