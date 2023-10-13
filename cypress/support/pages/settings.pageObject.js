import PageObject from '../PageObject';

class SettingsPageObject extends PageObject {
  url = '/#/settings';

  get usernameField() {
    return cy.get('[data-qa="username-field"]');
  }

  get userBioField() {
    return cy.get('[data-qa="short-bio-field"]');
  }

  get emailField() {
    return cy.get('[data-qa="email-field"]');
  }

  get newPasswordField() {
    return cy.get('[data-qa="password-field"]');
  }

  get updatesettingsBtn() {
    return cy.get('[data-qa="update-settings-btn"]'); 
  }

  get logOutBtn() {
    return cy.get('[data-qa="logout-btn"]');
  }

  get modalUpdateSuccess() {
    return cy.get('.swal-modal button');
  }

  visitPage() {
    cy.visit(this.url);
  }

  fillUserImageField(imageUrl) {
    this.userImageField
      .type(imageUrl);
  }

  fillUsernameField(username) {
    this.usernameField
      .type(username);
  }

  clearUsernameField() {
    this.usernameField
      .clear();
  }

  fillUserBioField(bio) {
    this.userBioField
      .type(bio);
  }

  fillEmailField(email) {
    this.emailField
      .type(email);
  }

  clearEmailField() {
    this.emailField
      .clear();
  }

  fillNewPasswordField(password) {
    this.newPasswordField
      .type(password);
  }

  clickOnUpdateSettingsBtn() {
    this.updatesettingsBtn
      .click();
  }

  clickOkModal() {
    this.modalUpdateSuccess
      .click();
  }

  clickOnLogOutBtn() {
    this.logOutBtn
      .click();
  }
}

export default SettingsPageObject; 