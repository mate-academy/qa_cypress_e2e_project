import PageObject from '../PageObject';

class SettingsPageObject extends PageObject {
  url = '/#/settings';

  get usernameField() {
    return cy.getByDataCy('username-edit');
  }

  get bioField() {
    return cy.getByDataCy('bio-edit');
  }

  get emailField() {
    return cy.getByDataCy('email-edit');
  }

  get passwordField() {
    return cy.getByDataCy('password-edit');
  }

  get updateBtn() {
    return cy.getByDataCy('submit-edit');
  }

  get logOutBtn() {
    return cy.getByDataCy('log-out-edit');
  }

  get errorTitle() {
    return cy.get('div[class="swal-title"]');
  }

  get errorText() {
    return cy.get('div[class="swal-text"]');
  }

  get errorBtn() {
    return cy.get('button[class="swal-button swal-button--confirm"]');
  }

  clearUsernameField() {
    this.usernameField.clear();
  }

  typeUsernameField(username) {
    this.clearUsernameField();
    this.usernameField.type(username);
  }

  clearBioField() {
    this.bioField.clear();
  }

  typeBioField(bio) {
    this.clearBioField();
    this.bioField.type(bio);
  }

  clearEmailField() {
    this.emailField.clear();
  }

  typeEmailField(email) {
    this.clearEmailField();
    this.emailField.type(email);
  }

  clearPasswordField() {
    this.passwordField.clear();
  }

  typePasswordField(password) {
    this.passwordField.type(password);
  }

  clickUpdateBtn() {
    this.updateBtn.click();
  }

  clickLogOutBtn() {
    this.logOutBtn.click();
  }

  clickErrorBtn() {
    this.errorBtn.click();
  }

  assertErrorTitle(title) {
    this.errorTitle.should('contain', title);
  }

  assertErrorText(text) {
    this.errorText.should('contain', text);
  }
}

export default SettingsPageObject;
