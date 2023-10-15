import PageObject from '../PageObject';

class SettingsPageObject extends PageObject {
  url = '/#/settings';

  get usernameField() {
    return cy.getByDataQa('settings-username');
  }

  get bioField() {
    return cy.getByDataQa('settings-bio');
  }

  get emailField() {
    return cy.getByDataQa('settings-email');
  }

  get newPasswordField() {
    return cy.getByDataQa('settings-new-pawwsord');
  }

  get updateBtn() {
    return cy.getByDataQa('settings-update-btn');
  }

  get logOutBtn() {
    return cy.getByDataQa('settings-logout-btn');
  }

  changeUserName(username) {
    this.usernameField
      .clear()
      .type(username);
  }

  changeBio(bio) {
    this.bioField
      .type(bio);
  }

  assertBio(bio) {
    this.bioField
      .should('contain', bio);
  }

  changeEmail(email) {
    this.emailField
      .clear()
      .type(email);
  }

  assertEmail(email) {
    this.emailField
      .should('have.value', email);
  }

  changePassword(password) {
    this.newPasswordField
      .type(password);
  }

  clickUpdateBtn() {
    this.updateBtn
      .click();
  }

  clickLogOutBtn() {
    this.logOutBtn
      .click();
  }
}

export default SettingsPageObject;