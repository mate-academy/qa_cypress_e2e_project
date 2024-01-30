import PageObject from '../PageObject';

class SettingsPageObject extends PageObject {
  url = '/#/settings';

  get usernameField() {
    return cy.getByDataCy('username');
  }

  get bioField() {
    return cy.getByDataCy('bio');
  }

  get emailField() {
    return cy.getByDataCy('email');
  }

  get passwordField() {
    return cy.getByDataCy('password');
  }

  get UpdateSettingsBtn() {
    return cy.getByDataCy('updatesettingsbtn');
  }

  get logoutBtn() {
    return cy.getByDataCy('logoutbtn');
  }

  get warnPopup() {
    return cy.get('.swal-modal');
  }

  typeUserName(username) {
    this.usernameField
      .type(username);
  }

  clearUserName() {
    this.usernameField
      .clear();
  }

  typeBio(bio) {
    this.bioField
      .type(bio);
  }

  clearBio() {
    this.bioField
      .clear();
  }

  typeUseremail(email) {
    this.emailField
      .type(email);
  }

  clearUseremail() {
    this.emailField
      .clear();
  }

  typePassword(password) {
    this.passwordField
      .type(password);
  }

  clearPassword() {
    this.passwordField
      .clear();
  }

  clickUpdateSettingsBtn() {
    this.UpdateSettingsBtn
      .click();
  }

  clickLogoutBtn() {
    this.logoutBtn.click();
  }

  get modalOkBtn() {
    return cy.get('.swal-button');
  }

  clickmodalOkBtn() {
    this.modalOkBtn.click();
  }

  validateSuccessPopup() {
    this.warnPopup
      .should('contain', 'Update successful!');
  }

  validateFailPopup() {
    this.warnPopup
      .should('contain', 'Update failed!');
  }

  validateUsernameSaved(name) {
    this.usernameField.should('have.value', name);
  }

  validateBioSaved(bio) {
    this.bioField.should('have.value', bio);
  }

  validateEmailSaved(email) {
    this.emailField.should('have.value', email);
  }
}

export default SettingsPageObject;
