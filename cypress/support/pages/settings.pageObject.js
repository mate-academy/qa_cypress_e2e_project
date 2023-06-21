import PageObject from '../PageObject';

class SettingsPageObject extends PageObject {
  url = '#/settings';

  get usernameField() {
    return cy.getByDataQA('username-settings');
  }

  typeNewUsername(newUsername) {
    this.usernameField
      .type(`{selectAll}${newUsername}`);
  }

  get bioField() {
    return cy.getByDataQA('bio-settings');
  }

  typeNewBio(newBio) {
    this.bioField
      .type(`{selectAll}${newBio}`);
  }

  get emailField() {
    return cy.getByDataQA('email-settings');
  }

  typeNewEmail(newEmail) {
    this.emailField
      .type(`{selectAll}${newEmail}`);
  }

  get passwordField() {
    return cy.getByDataQA('password-settings');
  }

  typeNewPassword(newPassword) {
    this.passwordField
      .type(`{selectAll}${newPassword}`);
  }

  get updateSettingsBtn() {
    return cy.getByDataQA('update-btn-settings');
  }

  clickUpdateSettingsBtn() {
    this.updateSettingsBtn
      .click();
  }

  get logoutBtn() {
    return cy.getByDataQA('logout-btn-settings');
  }

  clickLogoutBtn() {
    this.logoutBtn
      .click();
  }

  checkMessageThatDataUpdated() {
    cy.get('.swal-title').should('contain', 'Update successful!');
    cy.get('.swal-button').should('contain', 'OK').click();
  }

  checkMessageThatBioUpdated(bio) {
    return cy.getByDataQA('user-bio').should('contain', bio);
  }

  checkSuccessfulLogout() {
    cy.getByDataQA('sign-up-link').should('be.visible');
    cy.getByDataQA('sign-in-link').should('be.visible');
  }
}

export default SettingsPageObject;
