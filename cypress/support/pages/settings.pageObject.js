import PageObject from '../PageObject';

class SettingsPage extends PageObject {
  url = '/#/settings';

  get usernameField() {
    return cy.get('[data-qa="new-your-username"]');
  }

  get userBioField() {
    return cy.get('[data-qa="new-short-bio"]');
  }

  get emailField() {
    return cy.get('[data-qa="new-user-email"]');
  }

  get newPasswordField() {
    return cy.get('[data-qa="new-user-password"]');
  }

  get updateSettingsBtn() {
    return cy.get('[data-qa="new-btn-update"]')
  }

  get settingsLink() {
    return cy.get(':nth-child(3) > .nav-link');
  }

  get logOutBtn() {
    return cy.get('[class="btn btn-outline-danger"]');
  }

  get modalBio() {
    return cy.get('[class="swal-modal"]');
  }

  get modalBtnOk() {
    return cy.get('[class="swal-button swal-button--confirm"]');
  }

  visit() {
    cy.visit(this.url);
  }

  clickOnOkBtn() {
    this.modalBtnOk.click();
  }

  assertUpdatiedBio() {
    this.modalBio
    .should('contain', 'Update successful!');
  }

  assertUpdatiedEmail() {
    this.modalBio
    .should('contain', 'Update successful!');
  }

  assertUpdatiedPassword() {
    this.modalBio
    .should('contain', 'Update successful!');
  }

  assertUpdatiedShortPassword() {
    this.modalBio
    .should('contain', 'Update failed!');
  }

  assertUpdatiedLongPassword() {
    this.modalBio
    .should('contain', 'Update failed!');
  }

  fillUsernameField(username) {
    this.usernameField.type(username);
  }

  clearUsernameField() {
    this.usernameField.clear();
  }

  fillUserBioField(bio) {
    this.userBioField.type(bio);
  }

  fillEmailField(email) {
    this.emailField.type(email);
  }

  clearEmailField() {
    this.emailField.clear();
  }

  fillNewPasswordField(password) {
    this.newPasswordField.type(password);
  }

  clickOnUpdateSettingsBtn() {
    this.updateSettingsBtn.click();
  }

  clickOnSettingsLink() {
    this.settingsLink.click();
  }

  clickOnLogOutBtn() {
    this.logOutBtn.click();
  }

}

export default SettingsPage;
