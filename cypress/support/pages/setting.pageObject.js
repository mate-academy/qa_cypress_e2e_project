import PageObject from '../PageObject';

class SettingsPageObject extends PageObject {
  url = '/settings';

  get usernameField() {
    return cy.getByDataCy('username-field');
  }

  get bioField() {
    return cy.getByDataCy('bio-field');
  }

  get emailField() {
    return cy.getByDataCy('email-field');
  }

  get newPasswordField() {
    return cy.getByDataCy('password-field');
  }

  get updateSettingBtn() {
    return cy.getByDataCy('update-btn');
  }

  get logOutBtn() {
    return cy.getByDataCy('logout-btn');
  }

  clickUpdateSettingBtn() {
    this.updateSettingBtn.click();
  }

  clickLogOutButton() {
    this.logOutBtn.click();
  }

  typeNewUsername(newUsername) {
    this.usernameField.clear();
    this.usernameField.type(newUsername);
  }

  typeNewBio(bio) {
    this.bioField.type(bio);
  }

  typeNewEmail(newEmail) {
    this.emailField.clear();
    this.emailField.type(newEmail);
  }

  assertNewEmail(newEmail) {
    this.emailField
      .should('have.value', newEmail);
  }

  typeNewPassword(newPassword) {
    this.newPasswordField.type(newPassword);
  }

  assertSwalSucces() {
    cy.contains('Update successful!').should('be.visible');
    cy.get('.swal-button--confirm').click();
  }

  login(email, username, password) {
    cy.login(email, username, password);
  }
}

export default SettingsPageObject;
