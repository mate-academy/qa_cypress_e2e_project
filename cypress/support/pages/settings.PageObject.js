import PageObject from '../PageObject';

class SettingsPageObject extends PageObject {
  url = '#/settings';

  get usernameField() {
    return cy.getByDataQa('username-settings');
  }

  get bioField() {
    return cy.getByDataQa('bio-settings');
  }

  get emailField() {
    return cy.getByDataQa('email-settings');
  }

  get passwordField() {
    return cy.getByDataQa('password-settings');
  }

  get updateSettingsBtn() {
    return cy.getByDataQa('update-btn-settings');
  }

  get logoutBtn() {
    return cy.getByDataQa('logout-btn-settings');
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
