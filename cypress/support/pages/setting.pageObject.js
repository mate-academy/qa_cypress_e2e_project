import PageObject from '../PageObject';

class SettingPageObject extends PageObject {
  url = '/#/settings';

  get usernameField() {
    return cy.getByDataQa('username-settings');
  }

  typeNewUsername(username) {
    this.usernameField
      .clear()
      .type(username);
  }

  get bioField() {
    return cy.getByDataQa('bio-settings');
  }

  typeNewBio(bio) {
    this.bioField
      .type(bio);
  }

  get emailField() {
    return cy.getByDataQa('email-settings');
  }

  typeNewEmail(email) {
    this.emailField
      .clear()
      .type(email);
  }

  get passwordField() {
    return cy.getByDataQa('password-settings');
  }

  typeNewPassword(password) {
    this.passwordField
      .type(password);
  }

  get updateSettingBtn() {
    return cy.getByDataQa('update-settings-btn');
  }

  clickUpdateSetting() {
    this.updateSettingBtn
      .click();
  }

  get logOutBtn() {
    return cy.getByDataQa('log-out-btn');
  }

  clickLogOut() {
    this.logOutBtn
      .click();
  }

  checkUpdateSetting() {
    cy.get('.swal-modal')
      .should('exist')
      .and('contain', 'Update successful!');
  }
}

export default SettingPageObject;
