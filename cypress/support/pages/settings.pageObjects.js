import PageObject from '../PageObject';

class SettingsPageObject extends PageObject {
  url = '/#/settings';

  get bioField() {
    return cy.getByDataCy('settings-bio');
  }

  get usernameField() {
    return cy.getByDataCy('settings-username');
  }

  get emailField() {
    return cy.getByDataCy('settings-email');
  }

  get passwordField() {
    return cy.getByDataCy('settings-password');
  }

  get updateBtn() {
    return cy.getByDataCy('settings-btn');
  }

  clearBio() {
    this.bioField
        .clear();
  }

  clearUsername() {
    this.usernameField
        .clear();
  }

  clearEmail() {
    this.emailField
        .clear();
  }

  clearPassword() {
    this.passwordField
        .clear();
  }

  typeEmail(email) {
    this.emailField
      .type(email);
  }

  typePassword(password) {
    this.passwordField
      .type(password);
  }

  typeBio(bio) {
    this.bioField
      .type(bio);
  }

  typeUsername(username) {
    this.usernameField
      .type(username);
  }

  clickUpdateBtn() {
    this.updateBtn
      .click();
  }

  clickOk() {
    cy.get('[class="swal-button swal-button--confirm"]')
      .click();
  }

  asserUpdateSuccessful() {
    cy.get('[class="swal-title"]')
      .should('contain', 'Update successful!');
  }
}

export default SettingsPageObject;