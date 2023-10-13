import PageObject from "../PageObject";

class SettingsPageObject extends PageObject {
  url = '/#/settings'

  get usernameField () {
    return cy.getByDataCy('username-settings-field');
  }

  get updateBtn () {
    return cy.getByDataCy('update-settigns-btn');
  }

  get confirmationPopup () {
    return cy.get('.swal-modal')
  }

  get popupOkBtn () {
    return cy.get('.swal-button--confirm');
  }

  get bioField () {
    return cy.getByDataCy('bio-settings-field');
  }

  get emailField () {
    return cy.getByDataCy('email-settings-field');
  }

  get passwordField () {
    return cy.getByDataCy('password-settings-field');
  }

  get logOutBtn () {
    return cy.getByDataCy('logout-settigns-btn');
  }

  clickOnBtn () {
    this.popupOkBtn.click();
  }

  verifySuccessfulUpdating () {
    this.confirmationPopup.should('contain', 'Update successful!');
    this.clickOnBtn();
  }

  clickUpdateBtn () {
    this.updateBtn.click();
  }

  updateUsername (username) {
    this.usernameField.clear();
    this.usernameField.type(username);
    this.clickUpdateBtn();
  }

  updateBio (bio) {
    this.bioField.type(bio);
    this.clickUpdateBtn();
  }

  updateEmail (email) {
    this.emailField.clear();
    this.emailField.type(email);
    this.clickUpdateBtn();
  }

  updatePassword (password) {
    this.passwordField.type(password);
    this.clickUpdateBtn();
  }

  clickLogoutBtn () {
    this.logOutBtn.click();
  }

  visit () {
    cy.visit(this.url);
  }
}

export default SettingsPageObject;