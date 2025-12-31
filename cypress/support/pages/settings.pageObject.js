import PageObject from '../PageObject';

class SettingsPageObject extends PageObject {
  url = '/#/settings';

  get emailField() {
    return cy.getByDataQa('email-sign-in');
  }

  get passwordField() {
    return cy.getByDataQa('password-sign-in');
  }

  get signInBtn() {
    return cy.getByDataQa('sign-in-btn');
  }

  get navSettingsBtn() {
    return cy.getByDataQa('nav-settings');
  }

  get userSettingsTitle() {
    return cy.getByDataQa('user-settings-title');
  }

  get userNameField() {
    return cy.getByDataQa('user-username');
  }

  get userBioField() {
    return cy.getByDataQa('user-bio');
  }

  get userEmailField() {
    return cy.getByDataQa('user-email');
  }

  get userPasswordField() {
    return cy.getByDataQa('user-password');
  }

  get userUpdateButton() {
    return cy.getByDataQa('user-btn-update');
  }

  get userLogoutBtn() {
    return cy.getByDataQa('user-btn-logout');
  }

  get updatedMessage() {
    return cy.get('.swal-title');
  }

  get swalButton() {
    return cy.get('.swal-button');
  }

  login(email, password) {
    this.emailField.type(email);
    this.passwordField.type(password);
    this.signInBtn.click();
  }

  updateField(fieldElement, value) {
    fieldElement.clear().type(value);
    this.userUpdateButton.click();
  }
}

export default SettingsPageObject;
