import PageObject from '../PageObject';

class SettingsPageObject extends PageObject {
  url = '/user/settings';

  get userNameField() {
    return cy.getByDataCy('username-settings');
  }

  get emailField() {
    return cy.getByDataCy('email-settings');
  }

  get passwordField() {
    return cy.getByDataCy('password-settings');
  }

  get bioField() {
    return cy.getByDataCy('bio-settings');
  }

  get updateBtn() {
    return cy.getByDataCy('btn-settings').contains('Update Settings');
  }

  typeUserName(username) {
    this.userNameField.type(username);
  }

  typeEmail(email) {
    this.emailField.type(email);
  }

  typePassword(password) {
    this.passwordField.type(password);
  }

  typeBio(bio) {
    this.bioField.type(bio);
  }

  clickUpdateBtn() {
    this.updateBtn.click();
  }

  clickLogoutBtn() {
    cy.get('[data-cy="btn-logout"]').click();
  }
}

export default SettingsPageObject;
