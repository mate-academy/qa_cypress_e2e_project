import PageObject from '../PageObject';

class SettingsPageObject extends PageObject {
  url = '#/settings';

  get usernameField() {
    return cy.getByDataQa('username-settings');
  }

  typeNewUsername(newUsername) {
    this.usernameField
      .type(`{selectAll}${newUsername}`);
  }

  get bioField() {
    return cy.getByDataQa('bio-settings');
  }

  typeNewBio(newBio) {
    this.bioField
      .type(`{selectAll}${newBio}`);
  }

  get emailField() {
    return cy.getByDataQa('email-settings');
  }

  typeNewEmail(newEmail) {
    this.emailField
      .type(`{selectAll}${newEmail}`);
  }

  get passwordField() {
    return cy.getByDataQa('password-settings');
  }

  typeNewPassword(newPassword) {
    this.passwordField
      .type(`{selectAll}${newPassword}`);
  }

  get updateSettingsBtn() {
    return cy.getByDataQa('update-btn-settings');
  }

  clickUpdateSettingsBtn() {
    this.updateSettingsBtn
      .click();
  }

  get logoutBtn() {
    return cy.getByDataQa('logout-btn-settings');
  }

  clickLogoutBtn() {
    this.logoutBtn
      .click();
  }

  assertMessageAboutUpdatingData() {
    cy.get('.swal-title').should('contain', 'Update successful!');
    cy.get('.swal-button').should('contain', 'OK').click();
  }

  assertMessageAboutUpdatingBio(bio) {
    cy.get('.col-xs-12').should('contain', bio);
  }

  assertSuccessfulLogout() {
    cy.getByDataQa('sign-up-link').should('be.visible');
    cy.getByDataQa('sign-in-link').should('be.visible');
  }
}

export default SettingsPageObject;
