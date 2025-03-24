import PageObject from '../PageObject';

class SettingsPageObject extends PageObject {
  url = '/#/settings';

  get urlField() {
    return cy.getByDataQa('url');
  }

  get usernameField() {
    return cy.getByDataQa('username');
  }

  get bioField() {
    return cy.getByDataQa('bio');
  }

  get emailField() {
    return cy.getByDataQa('email');
  }

  get passwordField() {
    return cy.getByDataQa('password');
  }

  get updateBtn() {
    return cy.getByDataQa('update');
  }

  get logoutBtn() {
    return cy.getByDataQa('logout');
  }

  get swalModal() {
    return cy.get('.swal-modal');
  }

  typeUrl(url) {
    this.urlField.type(url, { force: true });
  }

  typeUsername(username) {
    this.usernameField.type(username, { force: true });
  }

  typeBio(bio) {
    this.bioField.type(bio, { force: true });
  }

  typeEmail(email) {
    this.emailField.type(email);
  }

  typePassword(pass) {
    this.passwordField.type(pass, { force: true });
  }

  clickUpdateBtn() {
    this.updateBtn.click();
  }

  clickLogoutBtn() {
    this.logoutBtn.click();
  }

  assertSuccessMessageVisible() {
    this.swalModal.should('be.visible');
  }

  assertSuccessMessageContains(message) {
    this.swalModal.should('contain', message);
  }
}

export default SettingsPageObject;
